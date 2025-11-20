// js
function toggleTranslator() {
  const button = $("#translator");
  const alienText = $(".alien-text");
  const humanText = $(".human-text");

  let scrollY = window.scrollY;
  const scrollX = window.scrollX;
  let buttonTop = button.offset().top;
  const relativeY = buttonTop - scrollY;

  if (button.hasClass("active")) {
    alienText.show();
    humanText.hide();
    button.removeClass("active");
  } else {
    alienText.hide();
    humanText.show();
    button.addClass("active");
  }

  window.requestAnimationFrame(function() {
    const newButtonTop = button.offset().top;
    window.scrollTo(scrollX, newButtonTop - relativeY);
  });
}
