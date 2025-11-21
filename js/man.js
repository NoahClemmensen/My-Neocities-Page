const faceExpressions = {
  happy: "ArtDumpWebsite/sprites/man/man_happy.png",
  sad: "ArtDumpWebsite/sprites/man/man_sadge.png",
  angry: "ArtDumpWebsite/sprites/man/man_angy.png",
  idle: "ArtDumpWebsite/sprites/man/man_idle.png",
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
  const speechBubble = $("#speech-bubble");
  const img = $("#man-img");

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

  setInterval(function () {
    setImgSrc(img, faceExpressions.angry);
    speechBubble.html(getRandomResponse(onHungryResponses));
    setTimeout(function () {
      setImgSrc(img, faceExpressions.idle);
      speechBubble.html(""); // Hide speech bubble
    }, 2000)
  }, 30_000)
})
