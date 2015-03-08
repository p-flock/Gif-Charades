var temp;
var random;
$(document).ready(function() {
    $("button").click(function() {
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+document.getElementById("search_tag").value+"&api_key=dc6zaTOxFJmzC");
        xhr.done(
            function(response) {
            temp = response;
            console.log("success got data", response);
            random = getRandom();
            //var select_gif = response.data[random].images.original;
            show_image(response.data[random].images.url, response.data[random].images.height, response.data[random].images.width, "Guess the word!");
        });
    });
});

function getRandom() {
    return Math.floor((Math.random() * 25));
}

function show_image(src, height, width, alt) {
    var resized = resize(height, width);
    height = resized[0];
    width = resized[1];

    var img = document.createElement("img");
    img.src = src;
    img.width = width; //temp.data[random].images.original.width;
    img.height = height; //temp.data[random].images.original.height;
    img.alt = alt;
    document.body.appendChild(img);
}

function resize(height, width) {
    var MAX_HEIGHT = 400;
    var MAX_WIDTH = 400;
    var gcd = function(heigh, width) {
        if ( ! b) {
                return a;
            }

        return gcd(b, a % b);
    };
    width = width / gcd;
    height = height / gcd;
    var width_mult = MAX_WIDTH / width;
    var height_mult = MAX_HEIGHT / height;
    var multiplier = Math.min(width_mult, height_mult);
    width = width * multiplier;
    height = height * multiplier;
    return [height, width];
}
