var wordslist = [
    ["C", "O", "M", "P", "I", "L", "E", "R"],
    ["W", "E", "B", "S", "I", "T", "E"],
    ["J", "A", "V", "A"],
    ["P", "Y", "T", "H", "O", "N"],
    ["C", "H", "O", "C", "O", "L", "A", "T", "E"],
    ["I", "N", "D", "I", "A"]
]
var guessContent = ["This programming tool compiles code", "THIS IS SOMETHING YOU ACCESS ON THE WEB",
    "THIS IS A PROGRAMMING LANGUAGE", "THIS IS A PROGRAMMING LANGUAGE NAMED AFTER A SNAKE", "THIS IS A TYPE OF SWEET CANDY", "THIS IS THE BEST COUNTRY IN THE WORLD"]
var random = Math.floor((Math.random() * (wordslist.length - 1)));

var selectedWord = wordslist[random];
var hint = guessContent[random];
var ratewort = new Array(selectedWord.length);
var fehler = 0;

for (var i = 0; i < ratewort.length; i++) {
    ratewort[i] = "_ ";
}

function printRatewort() {
    var guess = document.createElement('h6');
    guess.innerText = hint;
    var ratefeld = document.getElementById("ratefeld");
    ratefeld.appendChild(guess);
    for (var i = 0; i < ratewort.length; i++) {
        var guess = document.createElement('h6');
        guess.innerText = hint;
        var pushtab = document.createTextNode(ratewort[i]);
        ratefeld.appendChild(pushtab);
        ratefeld
    }
}

//checks if the the letter provided by the user matches one or more of the letters in the word
var onclickEvented = function () {
    var f = document.formconcerned;
    var b = f.elements["textconcerned"];
    var letterprovided = b.value; // the letter provided by the user
    letterprovided = letterprovided.toUpperCase();
    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letterprovided) {
            ratewort[i] = letterprovided + " ";
            var treffer = true;
        }
        b.value = "";
    }

    //deletes the guessfield and replaces it with the new one
    var ratefeld = document.getElementById("ratefeld");
    ratefeld.innerHTML = "";
    printRatewort();

    // if a guessed letter is not in the word, the letter will be put on the "wrong letters"-list and hangman grows
    if (!treffer) {
        var generateGuess = document.getElementById("generateGuess");
        var pushtab = document.createTextNode(" " + letterprovided);
        generateGuess.appendChild(pushtab);
        fehler++;
        var hangman = document.getElementById("hangman");
        hangman.src = "http://www.writteninpencil.de/Projekte/Hangman/hangman" + fehler + ".png";
    }

    //checks if all letters have been found
    var fertig = true;
    for (var i = 0; i < ratewort.length; i++) {
        if (ratewort[i] === "_ ") {
            fertig = false;
        }
    }
    if (fertig) {
        window.alert("You win!");
    }

    //once you got six wrong letters, you lose
    if (fehler === 6) {
        window.alert("Uh...I guess you're dead now.");
    }
}

function init() {
    printRatewort();
}

window.onload = init;