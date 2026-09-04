import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import "./DotGrid.css";

type Dot = {
    cx: number;
    cy: number;
    xOffset: number;
    yOffset: number;
    animating: boolean;
};

export interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    shockRadius?: number;
    shockStrength?: number;
    resistance?: number;
    returnDuration?: number;
    className?: string;
    style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16),
    };
}

const DotGrid: React.FC<DotGridProps> = ({
    dotSize = 5,
    gap = 15,
    baseColor = "#1a1a1a",
    activeColor = "#ffffff",
    proximity = 120,
    shockRadius = 250,
    shockStrength = 5,
    resistance = 750,
    returnDuration = 1.5,
    className = "",
    style,
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const rectRef = useRef({ left: 0, top: 0 });
    const pointerRef = useRef({ x: -9999, y: -9999 });
    const activeAnimCountRef = useRef(0);
    const lastMoveTimeRef = useRef(0);
    const rafIdRef = useRef(0);

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

    const drawFrame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { x: px, y: py } = pointerRef.current;
        const proximitySq = proximity * proximity;

        for (const dot of dotsRef.current) {
            const ox = dot.cx + dot.xOffset;
            const oy = dot.cy + dot.yOffset;

            const dx = dot.cx - px;
            const dy = dot.cy - py;
            const dsq = dx * dx + dy * dy;

            let color = baseColor;

            if (dsq <= proximitySq) {
                const t = 1 - Math.sqrt(dsq) / proximity;
                const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
                const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
                const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
                color = `rgb(${r}, ${g}, ${b})`;
            }

            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(ox, oy, dotSize / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }, [proximity, dotSize, baseColor, baseRgb, activeRgb]);

    const scheduleLoop = useCallback(() => {
        if (rafIdRef.current) return;

        const loop = () => {
            drawFrame();
            const isMoving = performance.now() - lastMoveTimeRef.current < 150;
            if (isMoving || activeAnimCountRef.current > 0) {
                rafIdRef.current = requestAnimationFrame(loop);
            } else {
                rafIdRef.current = 0;
            }
        };

        rafIdRef.current = requestAnimationFrame(loop);
    }, [drawFrame]);

    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const rect = wrap.getBoundingClientRect();
        rectRef.current = { left: rect.left, top: rect.top };
        const { width, height } = rect;
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }

        const cols = Math.floor((width + gap) / (dotSize + gap));
        const rows = Math.floor((height + gap) / (dotSize + gap));
        const cell = dotSize + gap;

        const gridW = cell * cols - gap;
        const gridH = cell * rows - gap;

        const startX = (width - gridW) / 2 + dotSize / 2;
        const startY = (height - gridH) / 2 + dotSize / 2;

        const dots: Dot[] = [];

        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < cols; x += 1) {
                dots.push({
                    cx: startX + x * cell,
                    cy: startY + y * cell,
                    xOffset: 0,
                    yOffset: 0,
                    animating: false,
                });
            }
        }

        dotsRef.current = dots;
        drawFrame();
    }, [dotSize, gap, drawFrame]);

    useEffect(() => {
        buildGrid();

        const ro = new ResizeObserver(buildGrid);
        if (wrapperRef.current) {
            ro.observe(wrapperRef.current);
        }

        return () => ro.disconnect();
    }, [buildGrid]);

    useEffect(() => {
        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            pointerRef.current.x = e.clientX - rectRef.current.left;
            pointerRef.current.y = e.clientY - rectRef.current.top;
            lastMoveTimeRef.current = performance.now();
            scheduleLoop();
        };

        const onLeave = () => {
            pointerRef.current.x = -9999;
            pointerRef.current.y = -9999;
            drawFrame();
        };

        const onClick = (e: MouseEvent) => {
            const cx = e.clientX - rectRef.current.left;
            const cy = e.clientY - rectRef.current.top;

            for (const dot of dotsRef.current) {
                if (dot.animating) continue;

                const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
                if (dist > shockRadius) continue;

                dot.animating = true;
                activeAnimCountRef.current++;

                const falloff = Math.max(0, 1 - dist / shockRadius);
                const pushX = (dot.cx - cx) * shockStrength * falloff;
                const pushY = (dot.cy - cy) * shockStrength * falloff;

                gsap.killTweensOf(dot);

                gsap.to(dot, {
                    xOffset: pushX,
                    yOffset: pushY,
                    duration: 0.2,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(dot, {
                            xOffset: 0,
                            yOffset: 0,
                            duration: returnDuration,
                            ease: "elastic.out(1, 0.75)",
                            onComplete: () => {
                                dot.animating = false;
                                activeAnimCountRef.current = Math.max(0, activeAnimCountRef.current - 1);
                            },
                        });
                    },
                });
            }
            scheduleLoop();
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("click", onClick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("click", onClick);
        };
    }, [shockRadius, shockStrength, resistance, returnDuration, scheduleLoop, drawFrame]);

    return (
        <section className={`dot-grid ${className}`.trim()} style={style}>
            <div ref={wrapperRef} className="dot-grid__wrap">
                <canvas ref={canvasRef} className="dot-grid__canvas" />
            </div>
        </section>
    );
};

export default DotGrid;
