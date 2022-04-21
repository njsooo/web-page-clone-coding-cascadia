export default class ModalSiteMap {
  #isVisible = false;
  #$navItemList;
  #$modalSiteMap;
  #callbackModalClose;
  #$videoWrap;
  #$video;
  #$btnCloseVideo;

  constructor(selector, nav) {
    this.#$modalSiteMap = $(selector);
    this.#$navItemList = this.#$modalSiteMap.find("nav ul li");
    this.#$videoWrap = this.#$modalSiteMap.find(".video-wrap");
    this.#$video = this.#$modalSiteMap.find("video");
    this.#$btnCloseVideo = this.#$modalSiteMap.find(".btn-close-video");

    for (let i = 0; i < this.#$navItemList.length; i++) {
      if (i === this.#$navItemList.length - 1) {
        continue;
      }
      $(this.#$navItemList[i]).on("click", () => {
        this.invisible();
        nav.clickItem(i);
        nav.visible();
      });
    }
    $(this.#$navItemList[this.#$navItemList.length - 1]).on("click", () => {
      this.#$videoWrap.toggleClass("on");
    });
    this.#$btnCloseVideo.on("click", () => {
      this.#$videoWrap.removeClass("on");
    });
  }

  get isVisible() {
    return this.#isVisible;
  }

  setCallbackModalClose(callback) {
    this.#callbackModalClose = callback;
  }

  visible() {
    this.#isVisible = true;
    this.#$modalSiteMap.removeClass("transition");
    this.#$modalSiteMap.addClass("on");
  }

  visibleWithAnimation() {
    this.#isVisible = true;
    this.#$modalSiteMap.addClass("on transition");
  }

  invisible() {
    this.#isVisible = false;
    this.#$videoWrap.removeClass("on");
    this.#$modalSiteMap.removeClass("transition on");
    if (this.#callbackModalClose) {
      this.#callbackModalClose();
    }
  }

  invisibleWithAnimation() {
    this.#isVisible = false;
    this.#$videoWrap.removeClass("on");
    this.#$modalSiteMap.addClass("transition");
    this.#$modalSiteMap.removeClass("on");
    if (this.#callbackModalClose) {
      this.#callbackModalClose();
    }
  }
}
