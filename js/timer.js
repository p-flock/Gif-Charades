var seconds = 60;                           // Countdown time
var countdown = setInterval(timer, 1000);   // Set timer function to run every second

function timer() {
    seconds = seconds - 1;
    
    if (countdown <= 0) {
        // do something
        return;
    }

    document.getElementById("timer").innerHTML = seconds;
}