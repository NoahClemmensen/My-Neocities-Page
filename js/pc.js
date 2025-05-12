let pcToggled = false;
let iframe;

function togglePc(state = null) {
  if (state === null) {
    state = !pcToggled
  }

  if (state) {
    $("#pc").addClass("active");
    pcToggled = true
    if (iframe) {
      iframe.attr("src", "/static.html");
    }
  } else {
    $("#pc").removeClass("active")
    pcToggled = false
  }
}

$(document).ready(function() {
  iframe = $("#screen_iframe");
});
