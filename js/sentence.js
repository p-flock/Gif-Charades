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


