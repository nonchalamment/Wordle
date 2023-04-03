/*-------------------------------- Constants --------------------------------*/

import { getRandomWord } from "../data/words.js"
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
"m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

/*---------------------------- Variables (state) ----------------------------*/

let puzzle, win, word, userInput

/*------------------------ Cached Element References ------------------------*/
const submitBtnEl = document.getElementById("submit")
const resetBtnEl = document.getElementById("reset")
const userInputEl = document.getElementById("userinput")
const messageEl = document.getElementById("gamedisplay")

const squareEls = document.querySelectorAll(".squareletter")

/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', init)
submitBtnEl.addEventListener('click', submit)


/*-------------------------------- Functions --------------------------------*/

function init() {
    word = changeToLetterArray(getRandomWord())
    win = 0
    puzzle = []
    messageEl.textContent = "Let's play!"
}

function submit() {
    userInput = changeToLetterArray(userInputEl.value.toLowerCase())
    userInputEl.value = ""
    if (!checkIfAlphabet(userInput)) {
        messageEl.textContent = "Error. Incorrect input."
    }
    else if (userInput.length != 5) {
        messageEl.textContent = "Five letters only."
    }
    else {
        messageEl.textContent = "Let's play!"
        checkForWin()
        updatePuzzle()
    }

}

// if userinput is equal to word, then game is over

function checkIfAlphabet(wordArray) {
    const hasEveryLetter = wordArray.reduce(function(prev, letter) {
        return prev + alphabet.includes(letter)
    }, 0)
    return hasEveryLetter === wordArray.length
}

function checkForWin() {
    if (userinput === word) {
        win = 1
    }
    else {
        compare()
    }
}

function updatePuzzle() {
    if (win = 0) {
        changeRow()
    }
   
}

function updateCurrentRowStyle() {
    // update text and color
}

function changeRow() {

}

function changeToLetterArray(str) {
    let letterArray = []
    for (let i = 0; i < str.length; i++) {
        letterArray[i] = str.slice(i, i+1)
    }
    return letterArray
}

function compare() {

}

init()