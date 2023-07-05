
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; 
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress",function(){
  started = true;
  nextSequence();
})
function nextSequence(){
  //userClickedPattern = [];
  level++; 
  if(started == true)
    $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
   //console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);  //console.log(gamePattern);

  $("#" + randomChosenColour).fadeIn(200).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); 
}
function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
     //console.log("success");
     if(userClickedPattern.length == gamePattern.length)
       setTimeout(nextSequence(), 1000);
    }
   else{
     //console.log("wrong");
     $("h1").text("Game Over, Press Any Key to Restart");
     $("body").addClass("game-over");
     setTimeout(function(){
      $("body").removeClass("game-over");
     },300);
     var audio = new Audio("sounds/wrong.mp3");
     audio.play();
     startOver();
    }
}

$("button").on("click",(function(){
  var userChosenColour = $(this).attr('id');     
          // alert('you clicked on button #' + userChosenColour); 
  userClickedPattern.push(userChosenColour);
    // console.log(userChosenColour);
    // console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}))

function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}
