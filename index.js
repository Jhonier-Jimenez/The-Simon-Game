var colours = ["red", "blue", "green", "yellow"];
var pattern = [];
var level = 0;
var score = 0;
var userPattern = [];

$("#play").click(function(event) {

  randomColour();
  $(".help").hide();
  $("#brand").text("Game ends after you complete level 6");
});

//User clicks a button
$(".btn").click(function(event) {
  userPick(event.target.id);
  playGame(userPattern, pattern);

});


function playGame(userPattern, pattern) {

  if (compare(userPattern, pattern)) {
    if (userPattern.length === pattern.length) {
      if (pattern.length == 7) {
        var sound = new Audio("sounds/winner.mp3");
        sound.play();
        $(".score").text("You win!");
        $("#level-title").text("Click the play button to Start Again");

        setTimeout(function(){
          restart();
        }, 3000);

      } else {
        $("#brand").text("Excellent!");
        setTimeout(function() {
          $("#brand").text("");
        }, 1500);

        setTimeout(function() {
          randomColour();
        }, 1000);
      }

    }
  } else {
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press the play button to restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    restart();
  }
}

//Randomly picks a colour, pushes it into the pattern array, and calls the animations() method
function randomColour() {
  pattern.push(colours[Math.floor(Math.random() * 4)]);
  animations(pattern);
  levelAndScoreCount();

}
//pushes the user's pick into the array
function userPick(id) {
  userPattern.push(id);
  userClickAnimations(id);
}

//styles and behavior for the level and score count
function levelAndScoreCount() {
  if (level == 0) {
    $("h2").hide();
    $("#play").hide();
    $("h1").css("margin-top", "38px")

    $("footer").before('<h2 id="level-title" class="score"></h2>');
    $(".score").text("score: " + score);
    $("h1").text("level " + level);
    level++;

  } else {
    $("h1").text("level " + level);
    level++;
    score += 50;
    $(".score").text("score: " + score);

  }
  userPattern = [];
}

//Plays a sound and runs an animation after a random colour is selected
function animations(pattern) {
  var sound = new Audio("sounds/" + pattern[pattern.length - 1] + ".mp3");
  sound.play();

  $("#" + pattern[pattern.length - 1]).animate({
    opacity: 0.2
  });

  setTimeout(function() {
    $("#" + pattern[pattern.length - 1]).animate({
      opacity: 1
    }, 500);
  });
}

//Plays a sound and runs an animation after the user cliks a button
function userClickAnimations(id) {

  var sound = new Audio("sounds/" + id + ".mp3");
  sound.play();

  $("#" + id).addClass("pressed");

  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 250);

}

function compare(a, b) {

  for (var i = 0; i < a.length; i++) {

    if (a[i] == b[i]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

function restart() {

  $("h2").show();
  $("#play").show();
  $(".score").hide();
  level = 0;
  userPattern = [];
  pattern = [];
  score = 0;
  $("#brand").text("The Simon Game");

}
