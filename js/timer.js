// Countdown time in seconds
var count = 60;

var counter = setInterval(timer, 1000);

function timer() {
    count = count - 1;
    if (counter <= 0) {
        // do something
        return;
    }

    document.getElementById("timer").innerHTML = count;
}


