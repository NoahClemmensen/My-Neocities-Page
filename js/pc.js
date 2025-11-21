let pcToggled = false;

const btnSound = new Audio('../sounds/switching-a-crt-on.mp3');
const btnSound2 = new Audio('../sounds/click.mp3');
const volume = 0.5;
btnSound.load()
btnSound2.load()
btnSound.autoplay = false
btnSound2.autoplay = false
btnSound.loop = false
btnSound2.loop = false
btnSound2.volume = volume;
btnSound.volume = volume;

function muteIframe(iframe) {
  iframe.contents().find("audio, video").each(function(index, element) {
    element.muted = true;
  });
}

function unmuteIframe(iframe) {
  iframe.contents().find("audio, video").each(function(index, element) {
    element.muted = false;
  });
}

function togglePc(state = null) {
  if (state === null) {
    state = !pcToggled
  }

  const iframe = $("#screen_iframe");

  if (state && !pcToggled) {
    $("#pc").addClass("active");
    pcToggled = true
    btnSound.play()
    btnSound2.pause()
    btnSound2.currentTime = 0;
    unmuteIframe(iframe);
  } else if (!state && pcToggled) {
    $("#pc").removeClass("active")
    pcToggled = false
    btnSound2.play()
    btnSound.pause()
    btnSound.currentTime = 0;
    muteIframe(iframe);
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

function openDialog() {
  const dialog = document.getElementById('dialog_container');
  if (dialog) {
    dialog.style.display = 'block';
  }
}
