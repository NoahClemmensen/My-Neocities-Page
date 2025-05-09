let pcToggled = false;

function togglePc(state = null) {
  if (state === null) {
    state = !pcToggled
  }

  if (state) {
    $("#pc").addClass("active");
    pcToggled = true
  } else {
    $("#pc").removeClass("active")
    pcToggled = false
  }
}

