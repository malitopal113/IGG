declare module "bootstrap/js/dist/carousel" {
  type CarouselOptions = Partial<{
    interval: number | boolean;
    keyboard: boolean;
    ride: boolean | string;
    pause: "hover" | boolean;
    wrap: boolean;
    touch: boolean;
  }>;
  export default class Carousel {
    constructor(element: Element | null, options?: CarouselOptions);
    next(): void;
    prev(): void;
    pause(): void;
    cycle(): void;
    dispose(): void;
    to(index: number): void;
  }
}

/* .js ile import edenler için alias */
declare module "bootstrap/js/dist/carousel.js" {
  export { default } from "bootstrap/js/dist/carousel";
}
