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

    const handleMove = (e: PointerEvent) => {
      charsRef.current.forEach((charEl) => {
        const { left, top, width, height } = charEl.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(charEl, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: charEl.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
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
