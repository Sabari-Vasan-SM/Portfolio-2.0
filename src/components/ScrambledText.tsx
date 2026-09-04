import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import "./ScrambledText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
    radius?: number;
    duration?: number;
    speed?: number;
    scrambleChars?: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
    radius = 100,
    duration = 1.2,
    speed = 0.5,
    scrambleChars = ".:",
    className = "",
    style = {},
    children,
}) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const charsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        if (!rootRef.current) return;

        const target = rootRef.current.querySelector("p");
        if (!target) return;

        const split = SplitText.create(target, {
            type: "chars",
            charsClass: "char",
        });

        charsRef.current = split.chars as HTMLElement[];

        charsRef.current.forEach((charEl) => {
            gsap.set(charEl, {
                display: "inline-block",
                attr: { "data-content": charEl.innerHTML },
            });
        });

        let charCenters: { el: HTMLElement; x: number; y: number }[] = [];
        const measureChars = () => {
            charCenters = charsRef.current.map((charEl) => {
                const { left, top, width, height } = charEl.getBoundingClientRect();
                return { el: charEl, x: left + width / 2, y: top + height / 2 };
            });
        };
        measureChars();
        window.addEventListener("resize", measureChars, { passive: true });

        const handleMove = (e: PointerEvent) => {
            const px = e.clientX;
            const py = e.clientY;
            for (let i = 0; i < charCenters.length; i++) {
                const item = charCenters[i];
                const dx = px - item.x;
                const dy = py - item.y;
                const dist = Math.hypot(dx, dy);

                if (dist < radius) {
                    gsap.to(item.el, {
                        overwrite: true,
                        duration: duration * (1 - dist / radius),
                        scrambleText: {
                            text: item.el.dataset.content || "",
                            chars: scrambleChars,
                            speed,
                        },
                        ease: "none",
                    });
                }
            }
        };

        const el = rootRef.current;
        el.addEventListener("pointermove", handleMove, { passive: true });

        return () => {
            window.removeEventListener("resize", measureChars);
            el.removeEventListener("pointermove", handleMove);
            split.revert();
        };
    }, [radius, duration, speed, scrambleChars]);

    return (
        <div ref={rootRef} className={`text-block ${className}`.trim()} style={style}>
            <p>{children}</p>
        </div>
    );
};

export default ScrambledText;
