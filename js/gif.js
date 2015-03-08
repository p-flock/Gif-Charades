var temp;
var random;
var img;
var answer = "CATS";
var text_before = "IT'S RAINING";
var text_after = "AND DOGS";

// This function is called when the user submits an answer
// 


$(document).ready(function() {
    $("button").click(function() {
        var user_response = document.getElementById("search_tag").value;
        user_response = user_response.toUpperCase();
        if(user_response == answer){
            $('#score').html(function(i, val) { return val*1+1 });
            cleartext();
            clearimage();
            $('#correct').show();
            $( "#correct" ).fadeOut( 5000, function() {
            });
            display_puzzle();
        }
        else{
            document.getElementById("search_tag").value = "";
            clearimage();
            $('#wrong').show();
            $( "#wrong" ).fadeOut( 5000, function() {
            });
            display_image(search_term);
        }
        
    });
});


function cleartext(){
    document.getElementById("search_tag").value = "";
}

function clearimage() {
    document.getElementById("gif-place").removeChild(img);
}


function newQuestion(text){
    $('#question').html(function() { return text });
}


function getRandom() {
    return Math.floor((Math.random() * 25));
}


function display_image(search_term){
    console.log("search_term = " + search_term);
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + search_term + "&api_key=dc6zaTOxFJmzC&limit=25");
        xhr.done(
            function(response) {
            temp = response;
            console.log(temp);
            console.log("success got data", response);
            //var select_gif = response.data[random].images.original;
            show_image(response);
        });
}


function show_image(image_object) {
    
    //console.log(height, width);
    random = getRandom();
    //var width = image_object.data[random].images.original.width;
    //var height = image_object.data[random].images.original.height;
    var source = image_object.data[random].images.original.url;
    //var resized = resize(height, width);

    //height = resized[0];
    //width = resized[1];
    //console.log(height, width);

    img = document.createElement("img");
    img.src = source;
    img.width = 400; //temp.data[random].images.original.width;
    img.height = 400; //temp.data[random].images.original.height;
    img.alt = "Guess the word!";
    document.getElementById("gif-place").appendChild(img);
}

// resize is deprecated bc we chose to have all gifs be the same size for consistency's sake
/*
 *function resize(height, width) {
 *
 *    console.log(height, width);
 *    
 *    var MAX_HEIGHT = 400;
 *    var MAX_WIDTH = 400;
 *
 *    var gcd = get_gcd(height, width);
 *
 *    console.log("gcd = " + gcd);
 *    width = width / gcd;
 *    height = height / gcd;
 *
 *    var width_mult = MAX_WIDTH / width;
 *    var height_mult = MAX_HEIGHT / height;
 *    var multiplier = Math.min(width_mult, height_mult);
 *    console.log("multiplier = " + multiplier);
 *    width = width * multiplier;
 *    height = height * multiplier;
 *    console.log(height, width);
 *    return [height, width];
 *}
 */


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
    "ROSES ARE RED": [0],
    "A BARREL OF MONKEYS":[3],
    "IT'S RAINING CATS AND DOGS":[2],
    "AS STUBBORN AS AN OX":[4],
    "TALLER THAN A TREE":[3],
    "IT TAKES TWO TO TANGO":[4],
    "HAVE YOUR CAKE AND EAT IT TOO":[2]

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
    console.log("sentence is" + words);
    console.log(words[0]);

    
    /*
     *for (index in sentence[1]) {
     *    answers.append(words[index]);
     *}
     */

    // redefines global variable 'answer'
    answer = words[sentence[1][0]];
    var answer_index = sentence[1][0];
    console.log("answer = " + answer);



    //var toDisplay = [];
    text_before = "";
    for(i = 0; i < answer_index; i++) {
        text_before = text_before + words[i] + " ";
    }
    $('#question-before').html(function() { return text_before});
    search_term = words[answer_index];
    display_image(search_term);

    text_after = "";
    for(i = answer_index + 1; i < words.length; i++) {
        text_after = text_after + words[i] + " ";
    }
    $('#question-after').html(function() { return text_after});

    delete sentences[sentence[0]];

    /*
     *for(i = 0; i < words.length; i++) {
     *    if (words[i] == answer) {
     *        console.log("word = " + words[i]);
     *        display_image(words[i]); 
     *    }
     *    else
     *        newQuestion(words[i]);
     *        
     *}
     */
}


