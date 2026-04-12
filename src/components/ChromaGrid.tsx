import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";

export interface ChromaItem {
    image: string;
    title: string;
    subtitle: string;
    handle?: string;
    location?: string;
    borderColor?: string;
    gradient?: string;
    url?: string;
    projectData?: any; // Full project object
}

export interface ChromaGridProps {
    items?: ChromaItem[];
    className?: string;
    radius?: number;
    columns?: number;
    rows?: number;
    damping?: number;
    fadeOut?: number;
    ease?: string;
    onCardClick?: (projectData?: any) => void;
}

type SetterFn = (v: number | string) => void;

export const ChromaGrid: React.FC<ChromaGridProps> = ({
    items,
    className = "",
    radius = 300,
    columns = 3,
    rows = 2,
    damping = 0.45,
    fadeOut = 0.6,
    ease = "power3.out",
    onCardClick,
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const isPausedRef = useRef(false);
    const isTouchingRef = useRef(false);
    const isCoarsePointerRef = useRef(false);
    const setX = useRef<SetterFn | null>(null);
    const setY = useRef<SetterFn | null>(null);
    const pos = useRef({ x: 0, y: 0 });

    const demo: ChromaItem[] = [
        {
            image: "https://i.pravatar.cc/300?img=8",
            title: "Alex Rivera",
            subtitle: "Full Stack Developer",
            handle: "@alexrivera",
            borderColor: "#4F46E5",
            gradient: "linear-gradient(145deg, #4F46E5, #000)",
            url: "https://github.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=11",
            title: "Jordan Chen",
            subtitle: "DevOps Engineer",
            handle: "@jordanchen",
            borderColor: "#10B981",
            gradient: "linear-gradient(210deg, #10B981, #000)",
            url: "https://linkedin.com/in/",
        },
        {
            image: "https://i.pravatar.cc/300?img=3",
            title: "Morgan Blake",
            subtitle: "UI/UX Designer",
            handle: "@morganblake",
            borderColor: "#F59E0B",
            gradient: "linear-gradient(165deg, #F59E0B, #000)",
            url: "https://dribbble.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=16",
            title: "Casey Park",
            subtitle: "Data Scientist",
            handle: "@caseypark",
            borderColor: "#EF4444",
            gradient: "linear-gradient(195deg, #EF4444, #000)",
            url: "https://kaggle.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=25",
            title: "Sam Kim",
            subtitle: "Mobile Developer",
            handle: "@thesamkim",
            borderColor: "#8B5CF6",
            gradient: "linear-gradient(225deg, #8B5CF6, #000)",
            url: "https://github.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=60",
            title: "Tyler Rodriguez",
            subtitle: "Cloud Architect",
            handle: "@tylerrod",
            borderColor: "#06B6D4",
            gradient: "linear-gradient(135deg, #06B6D4, #000)",
            url: "https://aws.amazon.com/",
        },
    ];
    const data = items?.length ? items : demo;

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        isCoarsePointerRef.current = window.matchMedia("(hover: none), (pointer: coarse)").matches;
        setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
        setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
        const { width, height } = el.getBoundingClientRect();
        pos.current = { x: width / 2, y: height / 2 };
        setX.current(pos.current.x);
        setY.current(pos.current.y);

        const autoScroll = () => {
            if (!isPausedRef.current && !isCoarsePointerRef.current) {
                const maxScrollLeft = el.scrollWidth - el.clientWidth;
                if (maxScrollLeft > 0) {
                    el.scrollLeft += 0.35;
                    if (el.scrollLeft >= maxScrollLeft - 1) {
                        el.scrollLeft = 0;
                    }
                }
            }

            rafRef.current = window.requestAnimationFrame(autoScroll);
        };

        rafRef.current = window.requestAnimationFrame(autoScroll);

        return () => {
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    const moveTo = (x: number, y: number) => {
        gsap.to(pos.current, {
            x,
            y,
            duration: damping,
            ease,
            onUpdate: () => {
                setX.current?.(pos.current.x);
                setY.current?.(pos.current.y);
            },
            overwrite: true,
        });
    };

    const handleMove = (e: React.PointerEvent) => {
        if (e.pointerType === "touch" || isCoarsePointerRef.current) return;
        const r = rootRef.current!;
        const rect = r.getBoundingClientRect();
        moveTo(e.clientX - rect.left, e.clientY - rect.top);
        gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    };

    const handleLeave = () => {
        gsap.to(fadeRef.current, {
            opacity: 1,
            duration: fadeOut,
            overwrite: true,
        });
        isPausedRef.current = false;
    };

    const handleEnter = () => {
        if (!isTouchingRef.current) {
            isPausedRef.current = true;
        }
    };

    const handleTouchStart = () => {
        isTouchingRef.current = true;
        isPausedRef.current = true;
    };

    const handleTouchEnd = () => {
        isTouchingRef.current = false;
        isPausedRef.current = false;
    };

    const handleCardClick = (projectData?: any) => {
        if (onCardClick) {
            onCardClick(projectData);
        } else if (projectData?.url) {
            window.open(projectData.url, "_blank", "noopener,noreferrer");
        }
    };

    const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
        if (isCoarsePointerRef.current) return;
        const card = e.currentTarget as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <div className={`chroma-shell ${className}`.trim()}>
            <div
                ref={rootRef}
                className="chroma-grid"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={
                    {
                        "--r": `${radius}px`,
                        "--cols": columns,
                        "--rows": rows,
                    } as React.CSSProperties
                }
                onPointerMove={handleMove}
                onPointerLeave={handleLeave}
                onPointerEnter={handleEnter}
            >
                {data.map((c, i) => (
                    <article
                        key={i}
                        className="chroma-card"
                        onMouseMove={handleCardMove}
                        onClick={() => handleCardClick(c.projectData || c)}
                        style={
                            {
                                "--card-border": c.borderColor || "transparent",
                                "--card-gradient": c.gradient,
                                cursor: c.url || c.projectData ? "pointer" : "default",
                            } as React.CSSProperties
                        }
                    >
                        <div className="chroma-img-wrapper">
                            <img src={c.image} alt={c.title} loading="lazy" />
                        </div>
                        <footer className="chroma-info">
                            <h3 className="name">{c.title}</h3>
                            {c.handle && <span className="handle">{c.handle}</span>}
                            <p className="role">{c.subtitle}</p>
                            {c.location && <span className="location">{c.location}</span>}
                        </footer>
                    </article>
                ))}
                <div className="chroma-overlay" />
                <div ref={fadeRef} className="chroma-fade" />
            </div>
        </div>
    );
};

export default ChromaGrid;
