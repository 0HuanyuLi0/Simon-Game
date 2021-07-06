const btnColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let usrClickPattern = [];
let started = false;
let level = 0;

function nextSequence() {
  usrClickPattern = [];
  const rndChosColor = btnColors[Math.floor(Math.random() * 4)];
  gamePattern.push(rndChosColor);

  playSound(rndChosColor);

  $(`#${rndChosColor}`).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text(`Level ${level}`);
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(curColor) {
  $(`#${curColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${curColor}`).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

function checkAnswer(curLevel) {
  if (gamePattern[curLevel] === usrClickPattern[curLevel]) {
    console.log("Success");
    if (usrClickPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    console.log("Wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over😜,Press Any Key to Restart");
    $(".myButton").text("or Click Me to Restart!!");
    $(".myButton").removeClass("hidden");
    startOver();
  }
}

$(document).keydown(function (e) {
  if (!started) {
    nextSequence();
    started = true;
    $(".myButton").addClass("hidden");
  }
});

$(".myButton").click(function (e) {
  if (!started) {
    nextSequence();
    started = true;
    $(".myButton").addClass("hidden");
  }
});

$(".btn").click(function (e) {
  const usrChosColor = e.target.id;
  usrClickPattern.push(usrChosColor);
  if (started) {
    playSound(usrChosColor);
  }
  animatePress(usrChosColor);
  checkAnswer(usrClickPattern.length - 1);
});
