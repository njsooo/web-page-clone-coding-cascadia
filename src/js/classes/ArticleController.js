import Article from "./Article";

export default class ArticleController {
  #articleList = [];
  #currentArticleIndex = 0;
  #isTransitioning = false;

  constructor(selector) {
    $(selector).each((index, article) => {
      this.#articleList.push(new Article(article));
    });
    this.#articleList[0].startAutoplayIfHasSwiper();
  }

  get isTransitioning() {
    return this.#isTransitioning;
  }

  scrollToArticle(targetArticleIndex) {
    if (this.#isTransitioning) {
      return false;
    }

    this.#isTransitioning = true;
    this.#articleList[this.#currentArticleIndex].stopAutoplayIfHasSwiper();
    this.#currentArticleIndex = targetArticleIndex;

    this.#articleList[this.#currentArticleIndex].visible(() => {
      this.#articleList.forEach((article, i) => {
        if (i !== this.#currentArticleIndex) {
          article.removeAllClass();
          if (i < this.#currentArticleIndex) {
            article.locatePrev();
          }
        }
      });
      this.#isTransitioning = false;
    });
    return true;
  }
}
