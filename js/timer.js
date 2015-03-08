var seconds = 30;                           // Countdown time
var countdown = setInterval(timer, 1000);   // Set timer function to run every second

function timer() {
    seconds = seconds - 1;
    
    if (seconds <= 0) {
        saveScore(val);
        console.log(getScore());
        window.location.replace("./score.html?s=" + val);
    }

    document.getElementById("timer").innerHTML = seconds;
}
