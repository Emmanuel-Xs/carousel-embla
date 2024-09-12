import {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";
import {
  EmblaOptionsType,
  EmblaPluginType,
  EmblaCarouselType,
} from "embla-carousel";
import useEmblaCarousel, { EmblaViewportRefType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CarouselContextType = {
  carouselRef: EmblaViewportRefType;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  axis: "x" | "y";
  scrollTo?: (index: number, jump?: boolean) => void;
  scrollNext?: (jump?: boolean) => void;
  scrollPrev?: (jump?: boolean) => void;
} & HTMLAttributes<HTMLDivElement>;

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

type CarouselProp = {
  axis?: "x" | "y";
  className?: string;
  setApi?: (api: EmblaCarouselType) => void;
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
} & PropsWithChildren;

const Carousel = ({
  axis = "x",
  options,
  plugins = [],
  setApi,
  className,
  children,
  ...props
}: CarouselProp) => {
  const [carouselRef, api] = useEmblaCarousel({ ...options, axis }, [
    Autoplay(),
    ...plugins,
  ]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api || !setApi) return;

    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    onInit(api);
    onSelect(api);

    api.on("reInit", onInit).on("select", onSelect);

    return () => {
      api.off("reInit", onInit).off("select", onSelect);
    };
  }, [api, onInit, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        canScrollNext,
        canScrollPrev,
        selectedIndex,
        scrollSnaps,
        axis,
        scrollTo: api?.scrollTo,
        scrollNext: api?.scrollNext,
        scrollPrev: api?.scrollPrev,
      }}
    >
      <div
        className={cn("", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

const CarouselContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { carouselRef, axis } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn("flex", axis === "x" ? "" : "flex-col", className)}
        {...props}
      />
    </div>
  );
};

const CarouselItem = ({
  className,
  ...props
}: { className: string } & PropsWithChildren) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 flex-[0_0_100%]", className)}
      {...props}
    />
  );
};

const CarouselPrevBtn = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  const { axis, canScrollPrev, scrollPrev } = useCarousel();

  const handlePrevClick = () => {
    if (scrollPrev) {
      scrollPrev();
    }
  };

  return (
    <button
      className={cn(
        "size-8 rounded-full",
        axis === "x" ? "" : "rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={handlePrevClick}
      {...props}
    >
      <>
        <span className="sr-only">Previous Slide</span>
        {!children ? <ArrowLeft className="size-4" /> : children}
      </>
    </button>
  );
};

const CarouselNextBtn = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  const { axis, canScrollNext, scrollNext } = useCarousel();

  const handleNextClick = () => {
    if (scrollNext) {
      scrollNext();
    }
  };

  return (
    <button
      className={cn(
        "size-8 rounded-full",
        axis === "x" ? "" : "rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={handleNextClick}
      {...props}
    >
      <>
        <span className="sr-only">Next Slide</span>
        {!children ? <ArrowRight className="size-4" /> : children}
      </>
    </button>
  );
};

type ThumbsCarouselProp = {
  className?: string;
  axis: "x" | "y";
  setApi?: (api: EmblaCarouselType) => void;
} & PropsWithChildren;

const ThumbsCarousel = ({
  className,
  axis,
  setApi,
  children,
}: ThumbsCarouselProp) => {
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis,
    // loop: true,
    duration: 10,
  });

  useEffect(() => {
    if (!thumbsApi || !setApi) return;

    setApi(thumbsApi);
  }, [thumbsApi, setApi]);

  return (
    <div ref={thumbsRef} className="overflow-hidden">
      <div className={cn(className)}>{children}</div>
    </div>
  );
};

const ThumbsCarouselItem = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { className?: string }) => {
  return (
    <div
      role="button"
      aria-roledescription="thumb slide"
      tabIndex={0}
      className={cn("min-w-0 flex-[0_0_100%]", className)}
      {...props}
    />
  );
};

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevBtn,
  CarouselNextBtn,
  //   CarouselDots,
  ThumbsCarousel,
  ThumbsCarouselItem,
};
