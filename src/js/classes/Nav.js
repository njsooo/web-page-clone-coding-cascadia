export default class Nav {
  #$nav;
  #$navItemList;
  #articleController;
  #currentNavItemIndex = 0;
  #$slidingUnderline;

  constructor(selector, articleController) {
    this.#$nav = $(selector);
    this.#$navItemList = this.#$nav.find("ul li");
    this.#articleController = articleController;
    this.#$slidingUnderline = this.#$nav.find(".sliding-underline");

    this.#$navItemList.each((index, navItem) => {
      $(navItem).on("click", () => {
        this.#handleClickEvent(index);
      });
    });
    this.updateSlidingUnderline();
  }

  visible() {
    this.#$nav.css({ display: "" });
  }

  invisible() {
    this.#$nav.css({ display: "none" });
  }

  clickPrevItem() {
    if (this.#currentNavItemIndex === 0) {
      return;
    }
    this.#handleClickEvent(this.#currentNavItemIndex - 1);
  }

  clickNextItem() {
    if (this.#currentNavItemIndex === this.#$navItemList.length - 1) {
      return;
    }
    this.#handleClickEvent(this.#currentNavItemIndex + 1);
  }

  clickItem(index) {
    if (index < 0 || index >= this.#$navItemList.length) {
      throw "Invalid index";
    }
    this.#handleClickEvent(index);
  }

  #handleClickEvent(index) {
    if (index === this.#currentNavItemIndex) {
      return;
    }
    if (this.#articleController.scrollToArticle(index)) {
      this.#currentNavItemIndex = index;
      this.update();
    }
  }

  update() {
    this.updateCurrentNavItem();
    this.updateSlidingUnderline();
  }

  updateCurrentNavItem() {
    this.#$navItemList.removeClass("on");
    this.#$navItemList.eq(this.#currentNavItemIndex).addClass("on");
  }

  updateSlidingUnderline() {
    const offsetTop =
      this.#$navItemList.eq(this.#currentNavItemIndex).offset().top -
      this.#$navItemList.eq(0).offset().top;
    this.#$slidingUnderline.css({ display: "block", transform: `translateY(${offsetTop}px)` });
  }
}
