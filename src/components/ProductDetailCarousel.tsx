// import unResizedShirt from "../assets/men_shirt1.jpg";
// import bigResizedShirt from "../assets/men_shirt.jpg";
import smallResizedShirt from "../assets/men_shirt1 (1).jpg";
import smallResizedShirt2 from "../assets/men_shirt2.jpg";
import smallResizedShirt3 from "../assets/men_shirt3.jpg";
import smallResizedShirt4 from "../assets/men_shirt4.jpg";
import smallResizedShirt5 from "../assets/men_shirt5.jpg";
import smallResizedShirt6 from "../assets/men_shirt6.jpg";
import smallResizedShirt7 from "../assets/men_shirt7.jpg";
import smallResizedShirt8 from "../assets/men_shirt8.jpg";

import unResizedShirt1 from "../assets/shirst/men_shirt1.jpg";
import unResizedShirt2 from "../assets/shirst/men_shirt2.jpg";
import unResizedShirt3 from "../assets/shirst/men_shirt3.jpg";
import unResizedShirt4 from "../assets/shirst/men_shirt4.jpg";
import unResizedShirt5 from "../assets/shirst/men_shirt5.jpg";
import unResizedShirt6 from "../assets/shirst/men_shirt6.jpg";
import unResizedShirt7 from "../assets/shirst/men_shirt7.jpg";
import unResizedShirt8 from "../assets/shirst/men_shirt8.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  ThumbsCarousel,
  ThumbsCarouselItem,
} from "./ui/carousel";
import { useMediaQuery } from "@uidotdev/usehooks";
import Fade from "embla-carousel-fade";
import { useCallback, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

const smallImages = [
  smallResizedShirt,
  smallResizedShirt2,
  smallResizedShirt3,
  smallResizedShirt4,
  smallResizedShirt5,
  smallResizedShirt6,
  smallResizedShirt7,
  smallResizedShirt8,
];

const bigImages = [
  unResizedShirt1,
  unResizedShirt2,
  unResizedShirt3,
  unResizedShirt4,
  unResizedShirt5,
  unResizedShirt6,
  unResizedShirt7,
  unResizedShirt8,
];

function ProductDetailCarousel() {
  const isMd = useMediaQuery("only screen and (max-width : 768px)");
  const [api, setApi] = useState<EmblaCarouselType>();
  const [thumbsApi, setThumbsApi] = useState<EmblaCarouselType>();

  const handleThumbClick = useCallback(
    (index: number) => {
      if (api?.scrollTo) {
        api.scrollTo(index);
      }
    },
    [api]
  );
  return (
    <>
      <div className="flex flex-col md:flex-row-reverse gap-2">
        {/* <div className="">
          <img
            src={unResizedShirt}
            alt=""
            className="h-full max-h-[460px] md:max-h-[572.67px] w-full max-w-[393px] md:max-w-[541.85px] object-cover"
          />
        </div> */}
        <Carousel
          options={{ loop: true, containScroll: false, duration: 60 }}
          setApi={setApi}
          plugins={[Fade()]}
        >
          <CarouselContent>
            {bigImages.map((image, index) => (
              <CarouselItem className="w-[]" key={index}>
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="h-full max-h-[460px] md:max-h-[572.67px] w-full max-w-[393px] md:max-w-[541.85px] object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="max-w-[393px] md:max-w-[126.39px] relative isolate group/thumb z-0">
          <ChevronLeft
            className={cn(
              "absolute bg-green-500 top-1/2 rounded-full -translate-y-1/2 left-1 opacity-0 group-hover/thumb:opacity-100 transition-[opacity] select-none z-10 cursor-pointer"
              // !thumbsApi?.canScrollPrev() && "bg-gray-500"
            )}
            onClick={() => thumbsApi?.scrollPrev()}
            size={20}
          />
          <ChevronRight
            className={cn(
              "absolute bg-red-500 top-1/2 right-1 rounded-full -translate-y-1/2 opacity-0 group-hover/thumb:opacity-100 transition-[opacity] select-none z-10 cursor-pointer"
              // !thumbsApi?.canScrollNext() && "bg-gray-500"
            )}
            size={20}
            onClick={() => thumbsApi?.scrollNext()}
          />
          <ThumbsCarousel
            className="flex flex-row md:flex-col gap-2 max-w-[393px] md:max-w-[126.39px] md:max-h-[572.67px]"
            axis={isMd ? "x" : "y"}
            setApi={setThumbsApi}
          >
            {smallImages.map((image, index) => (
              <ThumbsCarouselItem
                key={index}
                className="basis-[21%]"
                onClick={() => handleThumbClick(index)}
                onFocus={() => handleThumbClick(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="max-w-[82.43px] max-h-[82.43px] md:max-w-[126.39px] md:max-h-[126.39px] object-cover select-none"
                />
              </ThumbsCarouselItem>
            ))}
          </ThumbsCarousel>
        </div>
      </div>
    </>
  );
}

export default ProductDetailCarousel;
