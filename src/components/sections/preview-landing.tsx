"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { MaxWidthWrapper } from "~/components/max-width-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { previewImages } from "~/config/marketing";

export function PreviewLanding() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div className="pb-6 sm:pb-16">
      <MaxWidthWrapper className="px-0">
        <div className="rounded-xl md:bg-muted/30 md:p-3.5 md:ring-1 md:ring-border md:ring-inset">
          <div className="relative aspect-video overflow-hidden rounded-xl border md:rounded-lg">
            {/* Reading `plugin.current` in render is the documented Embla autoplay pattern. */}
            {/* eslint-disable-next-line react-hooks/refs */}
            <Carousel plugins={[plugin.current]} className="w-full">
              <CarouselContent>
                {previewImages.map((image, index) => (
                  <CarouselItem key={`${image.title}-${index}`}>
                    <Image
                      className="size-full object-contain object-center"
                      src={image.href}
                      alt={image.title}
                      width={2000}
                      height={1000}
                      priority={true}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
