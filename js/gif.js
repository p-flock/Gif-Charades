var temp;
var random;
var img;
$(document).ready(function() {
    $("button").click(function() {
        var user = document.getElementById("search_tag").value;
        user = user.toLowerCase();
        if(user == "roses"){
            $('#score').html(function(i, val) { return val*1+1 });
            clearFields();
            $('#correct').show();
            $( "#correct" ).fadeOut( 5000, function() {
            });
            newQuestion();
        }
        else{
            document.getElementById("search_tag").value = "";
            $('#wrong').show();
            $( "#wrong" ).fadeOut( 5000, function() {
            });
        }
        
    });
});

function clearFields(){
    document.getElementById("search_tag").value = "";
    document.getElementById("gif-place").removeChild(img);
}

function newQuestion(){
    $('#question').html(function() { return "i'm testing" });
}
function getRandom() {
    return Math.floor((Math.random() * 25));
}


function display_image(){
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=roses&api_key=dc6zaTOxFJmzC");
        xhr.done(
            function(response) {
            temp = response;
            console.log("success got data", response);
            random = getRandom();
            //var select_gif = response.data[random].images.original;
            show_image(response.data[random].images.original.url, response.data[random].images.original.height, response.data[random].images.original.width, "Guess the word!");
        });
}

function show_image(src, height, width, alt) {
    console.log(height, width);
    var resized = resize(height, width);
    height = resized[0];
    width = resized[1];
    console.log(height, width);

    img = document.createElement("img");
    img.src = src;
    img.width = width; //temp.data[random].images.original.width;
    img.height = height; //temp.data[random].images.original.height;
    img.alt = alt;
    document.getElementById("gif-place").appendChild(img);
}

function resize(height, width) {

    console.log(height, width);
    
    var MAX_HEIGHT = 400;
    var MAX_WIDTH = 400;

    var gcd = get_gcd(height, width);

    console.log("gcd = " + gcd);
    width = width / gcd;
    height = height / gcd;

    var width_mult = MAX_WIDTH / width;
    var height_mult = MAX_HEIGHT / height;
    var multiplier = Math.min(width_mult, height_mult);
    console.log("multiplier = " + multiplier);
    width = width * multiplier;
    height = height * multiplier;
    console.log(height, width);
    return [height, width];
}

function get_gcd (a, b) {
    if ( ! b) {
        return a;
    }
    return get_gcd(b, a % b);
};

