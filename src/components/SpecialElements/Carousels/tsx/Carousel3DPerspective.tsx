import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

interface PerspectiveItem {
  id: string;
  videoUrl: string;
  title: string;
  subtitle?: string;
}

interface Carousel3DPerspectiveProps {
  items?: PerspectiveItem[];
  defaultActive?: number;
  heading?: string;
  bgColor?: string;
}

const DEFAULT_ITEMS: PerspectiveItem[] = [
  {
    id: "1",
    videoUrl: "https://youtube.com/shorts/wiqAaJcSGHM?si=UGrSnlKFx6BRiC-7",
    title: "Shot 01",
  },
  {
    id: "2",
    videoUrl: "https://youtube.com/shorts/ivUcYzUdedc?si=ZCaSRs00doYa8O9q",
    title: "Shot 02",
  },
  {
    id: "3",
    videoUrl: "https://youtube.com/shorts/Twy8aLgJ6LA?si=6G5A0XkZMw51EvGg",
    title: "Shot 03",
  },
  {
    id: "4",
    videoUrl: "https://youtube.com/shorts/N-9bqy8pt6c?si=iLzU2f7AypQDYizQ",
    title: "Shot 04",
  },
  {
    id: "5",
    videoUrl: "https://youtube.com/shorts/hO8k8cbiRuE?si=gBsuI3njcxvZ1aBD",
    title: "Shot 05",
  },
  {
    id: "6",
    videoUrl: "https://youtube.com/shorts/SZsMd-Od1xo?si=RBMJwH6Iu_Lb3WtO",
    title: "Shot 06",
  },
  {
    id: "7",
    videoUrl: "https://youtube.com/shorts/zd84R5tmvwk?si=Xb3E7onzBqiuMGB8",
    title: "Shot 07",
  },
  {
    id: "8",
    videoUrl: "https://youtube.com/shorts/2IwXsxxuc6I?si=jvYwwiSdU1KTKN6d",
    title: "Shot 08",
  },
  {
    id: "9",
    videoUrl: "https://youtube.com/shorts/hx48p_M4R0M?si=hEnYlaRDGy0rKvak",
    title: "Shot 09",
  },
  {
    id: "10",
    videoUrl: "https://youtube.com/shorts/heLdKDTiGjE?si=7KNW9wJdcq7eN0xI",
    title: "Shot 10",
  },
  {
    id: "11",
    videoUrl: "https://youtube.com/shorts/YDiB21YQmL0?si=_COs04xGcaBN4nSh",
    title: "Shot 11",
  },
];

const getYoutubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  const videoId = match?.[1];

  if (!videoId) return url;

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${videoId}&enablejsapi=1${origin ? `&origin=${encodeURIComponent(origin)}` : ""}`;
};

const getCardTransform = (normDist: number) => {
  if (normDist === 0) {
    return {
      rotateY: 0,
      scale: 1.04,
      x: 0,
      opacity: 1,
      zIndex: 20,
      brightness: 1,
    };
  }

  const sign = normDist > 0 ? 1 : -1;
  const abs = Math.abs(normDist);

  if (abs === 1) {
    return {
      rotateY: -sign * 42,
      scale: 0.84,
      x: sign * 240,
      opacity: 0.9,
      zIndex: 10,
      brightness: 0.82,
    };
  }

  return {
    rotateY: -sign * 55,
    scale: 0.65,
    x: sign * 350,
    opacity: 0,
    zIndex: 0,
    brightness: 0.6,
  };
};

const Carousel3DPerspective: React.FC<Carousel3DPerspectiveProps> = ({
  items = DEFAULT_ITEMS,
  defaultActive = 2,
  heading = "Yt Shots",
  bgColor = "transparent",
}) => {
  const [active, setActive] = useState(defaultActive);
  const [liked, setLiked] = useState(false);
  const total = items.length;

  useEffect(() => {
    if (total <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [total]);

  const goNext = () => setActive((p) => (p + 1) % total);
  const goPrev = () => setActive((p) => (p - 1 + total) % total);

  return (
    <section className="flex flex-col items-center w-full py-24 px-6 select-none" style={{ background: bgColor }}>
      <p className="text-3xl md:text-4xl font-bold mb-10 text-foreground" style={{ letterSpacing: "-0.02em" }}>
        {heading}
      </p>

      <div className="relative flex items-center justify-center w-full" style={{ height: 460, perspective: "1000px", overflow: "visible" }}>
        {items.map((item, i) => {
          const distance = ((i - active + total) % total + total) % total;
          const normDist = distance > total / 2 ? distance - total : distance;

          if (Math.abs(normDist) > 1) return null;

          const t = getCardTransform(normDist);

          return (
            <motion.div
              key={item.id}
              className="absolute overflow-hidden"
              animate={{
                rotateY: t.rotateY,
                scale: t.scale,
                x: t.x,
                opacity: t.opacity,
                filter: `brightness(${t.brightness})`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={() => {
                if (normDist === -1) goPrev();
                if (normDist === 1) goNext();
              }}
              style={{
                width: 300,
                height: 390,
                borderRadius: 20,
                zIndex: t.zIndex,
                cursor: normDist !== 0 ? "pointer" : "default",
                transformStyle: "preserve-3d",
                boxShadow: normDist === 0 ? "0 20px 56px rgba(0,0,0,0.45)" : "0 8px 24px rgba(0,0,0,0.28)",
                background: "hsl(var(--card) / 0.95)",
                border: "1px solid hsl(var(--border))",
                transformOrigin: normDist === 1 ? "left center" : normDist === -1 ? "right center" : "center",
              }}
            >
              <iframe
                key={item.videoUrl}
                src={getYoutubeEmbedUrl(item.videoUrl)}
                title={item.title}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="eager"
              />

              {normDist === 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLiked((v) => !v);
                  }}
                  className="absolute top-3 right-3 flex items-center justify-center rounded-full"
                  style={{
                    width: 30,
                    height: 30,
                    background: "hsl(var(--background) / 0.85)",
                    border: "none",
                    cursor: "pointer",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <Heart size={14} color={liked ? "#ef4444" : "hsl(var(--foreground) / 0.65)"} fill={liked ? "#ef4444" : "none"} />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={goPrev}
          className="flex items-center justify-center rounded-full transition-all hover:bg-secondary"
          style={{
            width: 40,
            height: 40,
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          <ArrowLeft size={17} color="hsl(var(--foreground))" />
        </button>

        <button
          onClick={goNext}
          className="flex items-center justify-center rounded-full transition-all hover:bg-secondary"
          style={{
            width: 40,
            height: 40,
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          <ArrowRight size={17} color="hsl(var(--foreground))" />
        </button>
      </div>
    </section>
  );
};

export default Carousel3DPerspective;
