var seconds = 3;                           // Countdown time
var countdown = setInterval(timer, 1000);   // Set timer function to run every second

function timer() {
    seconds = seconds - 1;
    
    if (seconds < 0) {
    	document.getElementById("game").value = "this is a test";
    }

    document.getElementById("timer").innerHTML = seconds;
}