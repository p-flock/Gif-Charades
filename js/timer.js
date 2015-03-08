var seconds = 60;                           // Countdown time
var countdown = setInterval(timer, 1000);   // Set timer function to run every second

function timer() {
    count = count - 1;
    
    if (counter <= 0) {
        // do something
        return;
    }

    document.getElementById("timer").innerHTML = count;
}