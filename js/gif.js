var temp;
var random;
var img;

// This function is called when the user submits an answer
// 
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


function display_image(search_term){
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + search_term + "&api_key=dc6zaTOxFJmzC");
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


/*
 *  THIS IS FOR SPACE 
 *
 */

var sentences = {
    "Roses are red": [0],
    "The cat ate an apple":[1, 4],
    "The dog ate the cat's food":[1, 4, 5]
}

/* selects a random sentence from the remaining possible sentences
 * and returns an array containing both the sentence as a string
 * and the indices of the words that should be converted to gifs
 */ 
function getRandomSentence(possible_sentences) {

    var key = getRandomKey(possible_sentences);
    var value = possible_sentences[key];
    // remove used key so we don't repeat puzzles (TODO)
    return [key, value];
}


function getRandomKey (sentences) {
    var result;
    var count = 0;
    for (var prop in sentences)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}


function display_puzzle () {
    /* gets random sentence
     * iterates through sentence:
     * if word is regular word: put it in body of html
     * if word should be gif:
     *          convert to gif, display in body of html
     *
     * create appropriate text boxes for answers
     * returns answers to puzzle, to be checked by other function
     */
    
    // sentence will be an array containing a string and an array of integers
    var sentence = getRandomSentence(sentences);
    var words = sentence[0].split(" ");

    var answers = [];
    for (index in sentence[1]) {
        answers.append(words[index]);
    }

    var toDisplay = [];
    for(word in words) {
        if (word in answers)
            toDisplay.append(convertToGif(word));
        else
            toDisplay.append(word);
            
    }
}


