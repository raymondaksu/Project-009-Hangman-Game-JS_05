const words = ["germany", "norway", "spain", "england", "greece", "italy", "france", "sweden", "denmark", "albania", "austria", "belgium"];

const livesElement = document.querySelector("#remaining_lives");
const wrongLetterElement = document.querySelector("#wrong_letters");
const guessAreaElement = document.querySelector("#guess");
const statusAreaElement = document.querySelector("#status");
const resetBtn = document.querySelector("#reset");
const titleElement =  document.querySelector(".title_area");

const inputElement = document.querySelector("#inp");

//Creating a random word from the list
const randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);

//Setting lives to 5 green balls and display on the page
let lives = ["&#9989", "&#9989", "&#9989", "&#9989", "&#9989"];
livesElement.innerHTML = lives.join(" ");

//Variable for showing the worg letters
const wrong_array = [];

//Creating an answer array composed of underscores, and displaying the initial status on the page
const answer_array = [];
let wordLength = randomWord.length;

for (let i=0; i < wordLength; i++) {
    answer_array.push("_");
};
guessAreaElement.innerHTML = answer_array.join("");

//Trying to show the keyboard.
window.addEventListener("click", function() {
    inputElement.focus();
});

//Getting the value of a pressed key and sending to checkLetter function for processing
// KeyCodes a->65 z->90  
window.addEventListener("keyup", (e) => {
    const letter = e.key;

    if ((e.keyCode < 65) || (e.keyCode > 90) ) {
        alert("Please enter a letter");
    }
    
    titleElement.style.visibility = "hidden";
    checkLetter(letter);
});

//Adding reset button a function to reset the page
resetBtn.addEventListener("click", function() {
    location.reload();
})

function checkLetter(x) {

    if (lives.includes("&#9989") && answer_array.includes("_")) {

        if (answer_array.includes(x) || wrong_array.includes(x)) {
            alert("You entered '" + x + "' before.");

        } else if (randomWord.includes(x)) {
            for (let i=0; i<wordLength; i++) {
                if (randomWord[i] == x) {
                    answer_array[i] = x;
                }
            }
            statusAreaElement.innerText = "Good choice!";
            guessAreaElement.innerText = answer_array.join("");
            
            if (! answer_array.includes("_")) {
                statusAreaElement.innerText = "You did it. Congrats!";
                show_reset_button();
            }

        } else {
            if (x >= "a" && x <= "z") {  
                lives.push("&#10060");
                lives.shift();
                livesElement.innerHTML = lives.join(" ");
                wrong_array.push(x);
                wrongLetterElement.innerHTML = wrong_array.join(" ");
                statusAreaElement.innerText = "Hmm.. not a good try.";
            }

            if (! lives.includes("&#9989")) {
                statusAreaElement.innerText = "Sorry, it was '" + randomWord +  "'\nBetter luck next time";
                show_reset_button();
            }
        }
    }
        
} 

function show_reset_button() {
    resetBtn.style.visibility = "visible";
}

