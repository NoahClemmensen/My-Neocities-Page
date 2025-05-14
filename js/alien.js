let lastDirectionRight = Math.random() < 0.5;

const volume = 0.25;
const singing = $("#singing")[0];
singing.load()
singing.autoplay = true
singing.loop = true
singing.volume = volume;

function getRandBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandWaitTime() {
  const min = 1000;
  const max = 15000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNewPos(alien) {
  return Math.floor(Math.random() * (window.innerHeight - alien.height()));
}

function getRandSpeed() {
  const min = 5;
  const max = 15;
  return getRandBetween(min, max);
}

function getRandBounceSpeed() {
  const min = 2;
  const max = 7.5;
  return getRandBetween(min, max);
}

function animateVolume(audio, targetVolume, duration) {
  const startVolume = audio.volume;
  const volumeChange = targetVolume - startVolume;
  const steps = 30; // Number of steps for the animation
  const stepDuration = duration / steps;
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    audio.volume = startVolume + volumeChange * progress;

    if (currentStep >= steps) {
      clearInterval(interval);
      audio.volume = targetVolume; // Ensure exact target volume
    }
  }, stepDuration);
}

function prepareNewTrip(alien) {
  // Hide alien
  alien.removeClass("flyRight");
  alien.removeClass("flyLeft");


  // Set new values
  alien.css({
    display: "none",
    top: getNewPos(alien) + "px",
    "--alien-speed": getRandSpeed() + "s",
    "--alien-bounce-speed": getRandBounceSpeed() + "s",
  });

  // Wait for a random time before starting the next trip
  const waitTime = getRandWaitTime();
  setTimeout(function () {
    if (lastDirectionRight) {
      alien.addClass("flyLeft");
      lastDirectionRight = false;

    } else {
      alien.addClass("flyRight");
      lastDirectionRight = true;
    }
    alien.css({ display: "block" });
    animateVolume(singing, volume, 1000);
  }, waitTime);
}

$(document).ready(function () {
  const alien = $("#alien");
  alien.css({
    top: getNewPos(alien) + "px",
    "--alien-speed": getRandSpeed() + "s",
    "--alien-bounce-speed": getRandBounceSpeed() + "s",
  });

  if (lastDirectionRight) {
    alien.addClass("flyLeft");
    lastDirectionRight = false;
  } else {
    alien.addClass("flyRight");
    lastDirectionRight = true;
  }

  singing.play();

  alien.on("animationend", function (e) {
    animateVolume(singing, 0, 1000);
    prepareNewTrip(alien);
  })
});
