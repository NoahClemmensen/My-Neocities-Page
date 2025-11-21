const faceExpressions = {
  happy: "../sprites/man/man_happy.png",
  sad: "../sprites/man/man_sadge.png",
  angry: "../sprites/man/man_angy.png",
  idle: "../sprites/man/man_idle.png",
}

const onIdleMessages = [
  "Just chilling.",
  "Nice day, huh?",
  "I wonder what's next.",
  "Doing nothing feels good.",
  "Hmm...",
  "I'm just hanging out.",
  "I was promised snacks. Still waiting.",
  "I have exactly 0 thoughts right now.",
  "Plot twist: I'm actually the one watching you.",
  "Loading deep thought... 1%... 2%... never mind.",
  "I could really go for a sandwich made of pure CSS.",
  "New idea: you feed me, I judge your choices.",
  "Sometimes I pretend I'm an AI, too.",
  "This is my idle animation. Be impressed.",
  "I definitely wasn't talking to myself just now.",
  "One of us should do something productive. Not it.",
  "Reminder: I'm the main character here.",
];

const onHungryResponses = [
  "I am so hungry!",
  "I need food now!",
  "Feed me, please!",
  "I can't wait to eat!",
  "I am starving!",
  "Do you hear that? That's my stomach.",
  "My tummy just filed a complaint.",
  "I was told there would be snacks.",
  "If you feed me, I promise not to judge. Much.",
  "I'm not saying I'm dramatic, but I might fade away soon.",
  "My hunger has its own hunger.",
  "Any chance that food teleports? Asking for me.",
  "If you feed me now, we can still be friends.",
  "Is this a fasting simulator or a feeding game?"
];

let foodOrder = [
  'potato-chip',
  'star',
  'bug',
  'sandwich',
  'capri-sun',
];

function setImgSrc(img, src) {
  $(img).attr("src", src);
}

function getRandomResponse(responseArray) {
  const randomIndex = Math.floor(Math.random() * responseArray.length);
  return responseArray[randomIndex];
}

function randomizeArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

$(document).ready(function () {
  const speechBubble = $("#speech-bubble");
  const img = $("#man-img");
  foodOrder = randomizeArray(foodOrder);

  let reacting = false;

  setImgSrc(img, faceExpressions.idle);
  speechBubble.html(""); // Empty means hidden speech bubble

  img.on("click", function () {
    if (foodOrder.length === 0) {
      reacting = true;
      setImgSrc(img, faceExpressions.happy);
      speechBubble.html("I'm full and happy now!");
      setTimeout(function () {
        setImgSrc(img, faceExpressions.idle);
        speechBubble.html(""); // Hide speech bubble
        reacting = false;
      }, 2000);
      return;
    }

    reacting = true;
    setImgSrc(img, faceExpressions.sad);
    speechBubble.html(getRandomResponse(onHungryResponses));
    setTimeout(function () {
      setImgSrc(img, faceExpressions.idle);
      speechBubble.html(""); // Hide speech bubble
      reacting = false;
    }, 3500)
  });

  // Idle behavior every 15 seconds
  setInterval(function () {
    if (reacting) return;

    setImgSrc(img, faceExpressions.idle);
    speechBubble.html(getRandomResponse(onIdleMessages));
    setTimeout(function () {
      if (reacting) return;
      setImgSrc(img, faceExpressions.idle);
      speechBubble.html(""); // Hide speech bubble
      reacting = false;
    }, 3000)
  }, 15_000);

  function eatFood($item) {
    console.log('Man is eating item:', $item);
    if (foodOrder[0]) {
      const expectedFood = foodOrder[0];
      const itemType = $item.data('type');

      if (itemType === expectedFood) {
        // Correct food
        foodOrder.shift(); // Remove the first item from the order
        if (foodOrder.length === 0) {
          reacting = true;
          setImgSrc(img, faceExpressions.happy);
          speechBubble.html("I'm all full now! Thank you!");
          setTimeout(function () {
            setImgSrc(img, faceExpressions.idle);
            speechBubble.html(""); // Hide speech bubble
            reacting = false;
          }, 2000);

          // Spawn confetti lol?
        } else {
          reacting = true;
          setImgSrc(img, faceExpressions.happy);
          speechBubble.html("Yum! Thank you!");
          setTimeout(function () {
            setImgSrc(img, faceExpressions.idle);
            speechBubble.html(""); // Hide speech bubble
            reacting = false;
          }, 2000);
        }
      } else {
        // Incorrect food
        reacting = true;
        setImgSrc(img, faceExpressions.angry);
        speechBubble.html("This is not what I wanted!");
        setTimeout(function () {
          setImgSrc(img, faceExpressions.idle);
          speechBubble.html(""); // Hide speech bubble
          reacting = false;
        }, 2000);
      }
    } else {
      reacting = true;
      setImgSrc(img, faceExpressions.angry);
      speechBubble.html("Enough already. I'm full!");
      setTimeout(function () {
        setImgSrc(img, faceExpressions.idle);
        speechBubble.html(""); // Hide speech bubble
        reacting = false;
      }, 2000)
    }
  }

  // Globalize eatFood function
  window.eatFood = eatFood;
});
