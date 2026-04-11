import { useEffect, useMemo, useState } from "react";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { TextRoll } from "@/components/text-roll";

type AnimatedCarouselProps = {
    title?: string;
    logoCount?: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    logos?: string[] | null;
    containerClassName?: string;
    titleClassName?: string;
    carouselClassName?: string;
    logoClassName?: string;
    itemsPerViewMobile?: number;
    itemsPerViewDesktop?: number;
    spacing?: string;
    padding?: string;
    logoContainerWidth?: string;
    logoContainerHeight?: string;
    logoImageWidth?: string;
    logoImageHeight?: string;
    logoMaxWidth?: string;
    logoMaxHeight?: string;
};

export const AnimatedCarousel = ({
    title = "Trusted by thousands of businesses worldwide",
    logoCount = 15,
    autoPlay = true,
    autoPlayInterval = 1000,
    logos = null,
    containerClassName = "",
    titleClassName = "",
    carouselClassName = "",
    logoClassName = "",
    itemsPerViewMobile = 4,
    itemsPerViewDesktop = 6,
    spacing = "gap-6",
    padding = "py-2",
    logoContainerWidth = "w-28",
    logoContainerHeight = "h-16",
    logoImageWidth = "w-full",
    logoImageHeight = "h-full",
    logoMaxWidth = "",
    logoMaxHeight = "",
}: AnimatedCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)");
        const sync = () => setIsDesktop(media.matches);
        sync();
        media.addEventListener("change", sync);
        return () => media.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
        if (!api || !autoPlay) return;

        const timer = window.setTimeout(() => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent((prev) => prev + 1);
            }
        }, autoPlayInterval);

        return () => window.clearTimeout(timer);
    }, [api, current, autoPlay, autoPlayInterval]);

    const defaultLogos = useMemo(
        () => [
            "https://cdn.simpleicons.org/react",
            "https://cdn.simpleicons.org/typescript",
            "https://cdn.simpleicons.org/javascript",
            "https://cdn.simpleicons.org/nodedotjs",
            "https://cdn.simpleicons.org/express",
            "https://cdn.simpleicons.org/mongodb",
            "https://cdn.simpleicons.org/postgresql",
            "https://cdn.simpleicons.org/supabase",
            "https://cdn.simpleicons.org/docker",
            "https://cdn.simpleicons.org/githubactions",
            "https://cdn.simpleicons.org/amazonwebservices",
            "https://cdn.simpleicons.org/vercel",
            "https://cdn.simpleicons.org/netlify",
            "https://cdn.simpleicons.org/python",
            "https://cdn.simpleicons.org/flutter",
        ],
        [],
    );

    const logoItems = logos ?? defaultLogos.slice(0, logoCount);
    const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight} ${logoMaxWidth} ${logoMaxHeight}`.trim();

    const perView = isDesktop ? itemsPerViewDesktop : itemsPerViewMobile;
    const basis = `${100 / Math.max(perView, 1)}%`;

    return (
        <div className={`w-full ${padding} bg-transparent ${containerClassName}`.trim()}>
            <div className="w-full">
                <div className={`flex flex-col ${spacing}`.trim()}>
                    <h3
                        className={`text-xs md:text-sm tracking-[0.18em] uppercase text-terminal-dim text-left ml-2 ${titleClassName}`.trim()}
                    >
                        <TextRoll>{title}</TextRoll>
                    </h3>

                    <div>
                        <Carousel setApi={setApi} className={`w-full ${carouselClassName}`.trim()}>
                            <CarouselContent>
                                {logoItems.map((logo, index) => (
                                    <CarouselItem
                                        key={`${logo}-${index}`}
                                        className="basis-auto"
                                        style={{
                                            flex: `0 0 ${basis}`,
                                        }}
                                    >
                                        <div
                                            className={`flex rounded-md ${logoContainerWidth} ${logoContainerHeight} mx-auto items-center justify-center p-3 terminal-border bg-card/70 hover:bg-secondary/50 transition-colors ${logoClassName}`.trim()}
                                            style={{
                                                width: "100%",
                                                maxWidth: "112px",
                                            }}
                                        >
                                            <img
                                                src={logo}
                                                alt={`Logo ${index + 1}`}
                                                className={`${logoImageSizeClasses} object-contain opacity-90`.trim()}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Case1 = (props: AnimatedCarouselProps) => {
    return <AnimatedCarousel {...props} />;
};
