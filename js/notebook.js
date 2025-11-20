// js/notebook.js
$(document).ready(function () {
  let page = 0;
  const $leftSelector = $("#selector-left");
  const $rightSelector = $("#selector-right");
  const $pageContainer = $("#page-container");
  const $notebookPages = $("#notebook-pages");

  function clampPage(next) {
    const max = $notebookPages.children('.notebook-container').length - 1;
    if (next < 0) return 0;
    if (next > max) return max;
    return next;
  }

  function goToPage(pageNumber) {
    const newPage = $notebookPages.children('.notebook-container[data-page="' + pageNumber + '"]');
    if (!newPage.length) return;
    page = pageNumber; // update only when valid
    $pageContainer.empty().append(newPage.clone(true, true));

    if (window.initPickupAble) {
      window.initPickupAble();
    }
  }

  $rightSelector.on("click", function () {
    goToPage(clampPage(page + 1));
  });

  $leftSelector.on("click", function () {
    goToPage(clampPage(page - 1));
  });
});
