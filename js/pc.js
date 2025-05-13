let pcToggled = false;

const btnSound = new Audio('/sounds/switching-a-crt-on.mp3');
const btnSound2 = new Audio('/sounds/click.mp3');
const volume = 0.5;
btnSound.load()
btnSound2.load()
btnSound.autoplay = false
btnSound2.autoplay = false
btnSound.loop = false
btnSound2.loop = false
btnSound2.volume = volume;
btnSound.volume = volume;

function togglePc(state = null) {
  if (state === null) {
    state = !pcToggled
  }

  if (state && !pcToggled) {
    $("#pc").addClass("active");
    pcToggled = true
    btnSound.play()
    btnSound2.pause()
    btnSound2.currentTime = 0;
  } else if (!state && pcToggled) {
    $("#pc").removeClass("active")
    pcToggled = false
    btnSound2.play()
    btnSound.pause()
    btnSound.currentTime = 0;
  }
}

$(document).ready(function() {

  if (!localStorage.getItem("dialog_closed")) {
    const dialog = document.getElementById('dialog_container');
    if (dialog) {
      dialog.style.display = 'block';
    }
  }
});


// I put this in here bc I'm lazy
function closeDialog() {
  const dialog = document.getElementById('dialog_container');
  if (dialog) {
    dialog.style.display = 'none';
  }
  localStorage.setItem("dialog_closed", "true");
}
