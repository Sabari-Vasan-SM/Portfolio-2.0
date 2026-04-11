import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Masonry.css";

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex((query) => matchMedia(query).matches)] ?? defaultValue;
  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((query) => matchMedia(query).addEventListener("change", handler));
    return () => queries.forEach((query) => matchMedia(query).removeEventListener("change", handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
};

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height: number;
  title?: string;
  subtitle?: string;
  year?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:700px)", "(min-width:420px)"],
    [4, 3, 2, 2],
    1,
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    preloadImages(items.map((item) => item.img)).then(() => setImagesReady(true));
  }, [items]);

  const gridData = useMemo(() => {
    if (!width) return { grid: [] as GridItem[], totalHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const grid = items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const h = item.height;
      const y = colHeights[col];

      colHeights[col] += h;

      return { ...item, x, y, w: columnWidth, h };
    });

    return {
      grid,
      totalHeight: Math.max(...colHeights, 0),
    };
  }, [columns, items, width]);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"] as const;
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -180 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 180 };
      case "left":
        return { x: -220, y: item.y };
      case "right":
        return { x: window.innerWidth + 220, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 90 };
    }
  };

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    gridData.grid.forEach((item, index) => {
      const selector = `[data-key=\"${item.id}\"]`;

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);

        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: initialPos.x,
            y: initialPos.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(selector, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [gridData.grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    const selector = `[data-key=\"${item.id}\"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = (e.currentTarget as HTMLElement).querySelector(".masonry-color-overlay") as HTMLElement | null;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    const selector = `[data-key=\"${item.id}\"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = (e.currentTarget as HTMLElement).querySelector(".masonry-color-overlay") as HTMLElement | null;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="masonry-list" style={{ height: `${gridData.totalHeight}px` }}>
      {gridData.grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="masonry-item-wrapper"
          onClick={() => {
            if (item.url) {
              window.open(item.url, "_blank", "noopener");
            }
          }}
          onMouseEnter={(e) => handleMouseEnter(e, item)}
          onMouseLeave={(e) => handleMouseLeave(e, item)}
        >
          <div className="masonry-item">
            <div className="masonry-item-image" style={{ backgroundImage: `url(${item.img})` }} />
            <div className="masonry-item-overlay" />
            <div className="masonry-item-content">
              {item.year && <span className="masonry-item-year">{item.year}</span>}
              {item.title && <h3 className="masonry-item-title">{item.title}</h3>}
              {item.subtitle && <p className="masonry-item-subtitle">{item.subtitle}</p>}
            </div>
            {colorShiftOnHover && <div className="masonry-color-overlay" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
