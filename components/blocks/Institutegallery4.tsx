"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";

export interface InstituteItems {
  id: string;
  name: string;
  overview: string;
  slug: string;
  banner: string;
}

export interface InstituteProps {
  name?: string;
  overview?: string;
  items: InstituteItems[];
}

const data = [
  {
    id: "shadcn-ui",
    name: "shadcn/ui: Building a Modern Component Library",
    overview:
      "Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.",
    slug: "https://ui.shadcn.com",
    banner:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS: The Utility-First Revolution",
    overview:
      "Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.",
    slug: "https://tailwindcss.com",
    banner:
      "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "astro",
    name: "Astro: The All-in-One Web Framework",
    overview:
      "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
    slug: "https://astro.build",
    banner:
      "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "react",
    name: "React: Pioneering Component-Based UI",
    overview:
      "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.",
    slug: "https://react.dev",
    banner:
      "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "nextjs",
    name: "Next.js: The React Framework for Production",
    overview:
      "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.",
    slug: "https://nextjs.org",
    banner:
      "",
  },
];

export const InstituteGallery = ({
  name = "The Costrad Mission",
  overview = "Our Mission is to raise and develop generations of transformational leaders, equipped to bring systemic and sustainable change, to every sphere of society.",
  items = data,
}: InstituteProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 ">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4 md:px-8">
            <h2 className="text-3xl sm:text-5xl md:text-4xl  ">
              {name}
            </h2>
            <p className="max-w-3xl text-foreground text-lg">{overview}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
            
              size="icon"
              variant="default"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto text-foreground "
            >
              <ArrowLeft className="size-5" /> 
            </Button>
            <Button
              size="icon"
              variant="default"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto text-foreground"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px] relative rounded-3xl  "
              >
                <Link href={`/institutes/${item.slug}`} className="group rounded-3xl shadow-xs shadow-indigo-100">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden  md:aspect-[5/4] lg:aspect-[16/9]">
                    <Image
                      src={`/${item.banner}`}
                      alt={item.name}
                      fill
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-99 rounded-3xl "
                      sizes="(max-width: 768px) 100vw, 360px"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                      <div className="mb-2 pt-4 md:w-3/4 text-2xl leading-tight font-bebas text-primary
                       uppercase md:mb-3 md:pt-4 lg:pt-4">
                        {item.name}
                      </div>
                      <div className="mb-8 line-clamp-4 invisible font-bold font-foreground leading-5 md:leading-6  md:mb-12 lg:mb-9">
                        {item.overview}
                      </div>
                      <div className="flex items-center text-firefly font-bold text-sm">
                        Read more{" "}
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

