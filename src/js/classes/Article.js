import "swiper/dist/css/swiper.css";
import { Swiper, Pagination, Autoplay, Lazy, EffectFade } from "swiper/dist/js/swiper.esm.js";
Swiper.use([Pagination, Autoplay, Lazy, EffectFade]);

export default class Article {
  #$article;
  #swiper = null;

  constructor(element) {
    this.#$article = $(element);
    const swiperContainer = this.#$article.children(".swiper-container")[0];

    if (swiperContainer == null) {
      return;
    }

    this.#swiper = new Swiper(swiperContainer, {
      slidesPerView: 1,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      speed: 2000,
      loop: false,
      effect: "fade",
      lazy: {
        loadPrevNext: true,
      },
      preloadImages: false,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
    });
    this.#swiper.autoplay.stop();
  }

  startAutoplayIfHasSwiper() {
    if (this.#swiper != null) {
      this.#swiper.autoplay.start();
    }
  }

  stopAutoplayIfHasSwiper() {
    if (this.#swiper != null) {
      this.#swiper.autoplay.stop();
    }
  }

  visible(callback) {
    this.#$article.addClass("animate-move");
    this.#$article.on("transitionend", (e) => {
      if (e.target !== this.#$article[0]) {
        return;
      }
      this.#$article.off("transitionend");
      this.#$article.removeClass("locate-prev animate-move");
      this.#$article.addClass("on");
      this.startAutoplayIfHasSwiper();
      callback();
    });
  }

  removeAllClass() {
    this.#$article.removeClass();
  }

  locatePrev() {
    this.#$article.addClass("locate-prev");
  }
}
