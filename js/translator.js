function toggleTranslator() {
  const button = $("#translator");
  const alienText = $(".alien-text");
  const humanText = $(".human-text");

  if (button.hasClass("active")) {
    alienText.show()
    humanText.hide()
    button.removeClass("active");
  } else {
    alienText.hide()
    humanText.show()
    button.addClass("active");
  }
}
