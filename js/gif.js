function getGifs() {
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+document.getElementById("search_tag").value+"&api_key=dc6zaTOxFJmzC");
    xhr.done(function(response) { 
        console.log("success got data", response);
        show_image(response.data[getRandom()].images.original.url, "Guess the word!");
    });
}

function getRandom() {
    return Math.floor((Math.random() * 25));
}

function show_image(src, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = 300;
    img.height = 300;
    img.alt = alt;
    document.body.appendChild(img);
}
