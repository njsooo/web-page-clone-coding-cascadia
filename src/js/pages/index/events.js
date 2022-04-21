import throttle from "lodash/throttle";
import Nav from "@/js/classes/Nav";
import ModalSiteMap from "@/js/classes/ModalSiteMap";
import ArticleController from "@/js/classes/ArticleController";

/* VARIABLES */
const $window = $(window);
const $footer = $("#footer");
const $articleList = $("main > article");
const $btnToggleModalSiteMap = $("header .btn-toggle-modal-site-map");

const articleController = new ArticleController("main > article");
const nav = new Nav("#header nav", articleController);
const modalSiteMap = new ModalSiteMap("#modal-site-map", nav);

let touchStartYPos = null;

/* EVENTS */
$window.on(
  "resize",
  throttle(disableTransitionWhenResize, 100, {
    trailing: false,
  })
);

$window.on(
  "wheel",
  throttle(moveArticleWhenWheel, 100, {
    trailing: false,
  })
);

$window.on("touchstart", saveTouchStartPos);
$window.on("touchmove", moveArticleWhenTouchMove);

modalSiteMap.setCallbackModalClose(callbackModalClose);

$btnToggleModalSiteMap.on("click", () => {
  if (articleController.isTransitioning) {
    return;
  }

  if (modalSiteMap.isVisible) {
    modalSiteMap.invisibleWithAnimation();
    nav.visible();
  } else {
    modalSiteMap.visibleWithAnimation();
    nav.invisible();
    $footer.css({ display: "none" });
    $btnToggleModalSiteMap.addClass("on");
  }
});

/* FUNCTIONS */
function moveArticleWhenWheel(e) {
  if (modalSiteMap.isVisible || articleController.isTransitioning) {
    return;
  }

  if (e.originalEvent.deltaY < 0) {
    nav.clickPrevItem();
  } else {
    nav.clickNextItem();
  }
}

function callbackModalClose() {
  $footer.css({ display: "" });
  $btnToggleModalSiteMap.removeClass("on");
}

function disableTransitionWhenResize() {
  $articleList.addClass("no-transition");
  setTimeout(() => {
    $articleList.removeClass("no-transition");
  }, 100);
}

function getTouches(e) {
  return e.touches || e.originalEvent.touches;
}

function saveTouchStartPos(e) {
  const touchInfo = getTouches(e)[0];
  touchStartYPos = touchInfo.clientY;
}

function moveArticleWhenTouchMove(e) {
  if (touchStartYPos == null) {
    return;
  }

  if (touchStartYPos - e.touches[0].clientY > 0) {
    nav.clickNextItem();
  } else {
    nav.clickPrevItem();
  }
  touchStartYPos = null;
}
