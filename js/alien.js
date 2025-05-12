let lastDirectionRight = Math.random() < 0.5;

function getRandBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandWaitTime() {
  const min = 2000;
  const max = 20000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNewPos(alien) {
  const y = Math.floor(Math.random() * window.innerHeight);
  return y - alien.height();
}

function getRandSpeed() {
  const min = 10;
  const max = 20;
  return getRandBetween(min, max);
}

function getRandBounceSpeed() {
  const min = 2;
  const max = 15;
  return getRandBetween(min, max);
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

  alien.on("animationend", function (e) {
    prepareNewTrip(alien);
  })
});
