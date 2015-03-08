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
            show_image(response.data[random].images.original.url, "Guess the word!");
        });
    });
});

function getRandom() {
    return Math.floor((Math.random() * 25));
}

function show_image(src, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = temp.data[random].images.original.width;
    img.height = temp.data[random].images.original.height;
    img.alt = alt;
    document.body.appendChild(img);
}

function resize(height, width) {
    var gcd = function(heigh, width) {
        if ( ! b) {
                return a;
            }
    
        return gcd(b, a % b);
    };
    width = width / gcd;
    height = height / gcd;


}
