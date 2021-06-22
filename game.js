var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;






$(document).on("touchstart", function (event) {

    if (!started) {
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").on("click", function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});









function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        gameOver();
        startOver();
    }
}


function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}



function gameOver() {

    playSound("wrong");

    $("#level-title").html("Game Over!! Your score is " + (level - 1) + ", Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

}



function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}



function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}



function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
