const faceExpressions = {
  happy: "/sprites/man/man_happy.png",
  sad: "/sprites/man/man_sadge.png",
  angry: "/sprites/man/man_angy.png",
  idle: "/sprites/man/man_idle.png",
}

const onClickedResponses = [
  "I am not happy with this!",
  "This is not what I expected.",
  "I don't like this at all.",
  "This is disappointing.",
]

const onHungryResponses = [
  "I am so hungry!",
  "I need food now!",
  "Feed me, please!",
  "I can't wait to eat!",
  "I am starving!",
];

function setImgSrc(img, src) {
  $(img).attr("src", src);
}

function getRandomResponse(responseArray) {
  const randomIndex = Math.floor(Math.random() * responseArray.length);
  return responseArray[randomIndex];
}

$(document).ready(function () {
  const man = $("#man");
  const speechBubble = $("#speech-bubble");
  const img = $("#man-img");
  const pickups = $(".pickup-able");

  setImgSrc(img, faceExpressions.idle);
  speechBubble.html(""); // Empty means hidden speech bubble

  img.on("click", function () {
    setImgSrc(img, faceExpressions.sad);
    speechBubble.html(getRandomResponse(onClickedResponses));
    setTimeout(function () {
      setImgSrc(img, faceExpressions.idle);
      speechBubble.html(""); // Hide speech bubble
    }, 2000)
  });

  pickups.on("mousedown", function (e) {
    console.log($(this));
    // Drag the item with js
    const item = $(this);
    item.css({
      position: "absolute",
      left: e.pageX - item.width() / 2,
      top: e.pageY - item.height() / 2,
    });
    item.on("mousemove", function (e) {
      item.css({
        left: e.pageX - item.width() / 2,
        top: e.pageY - item.height() / 2,
      });
    });
    item.on("mouseup", function () {
      item.off("mousemove");
      item.css({
        position: "static",
      });
      setImgSrc(img, faceExpressions.happy);
      speechBubble.html("Thank you for the item!");
      setTimeout(function () {
        setImgSrc(img, faceExpressions.idle);
        speechBubble.html(""); // Hide speech bubble
      }, 2000)
    });

  });

  setInterval(function () {
    setImgSrc(img, faceExpressions.angry);
    speechBubble.html(getRandomResponse(onHungryResponses));
    setTimeout(function () {
      setImgSrc(img, faceExpressions.idle);
      speechBubble.html(""); // Hide speech bubble
    }, 2000)
  }, 30_000)
})
