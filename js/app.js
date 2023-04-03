/*-------------------------------- Constants --------------------------------*/

import { getRandomWord } from "../data/words.js"

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
    word = getRandomWord()
    win = 0
    puzzle = []
    messageEl.textContent = "Let's play!"
    console.log(word)
}

function submit() {
    getUserInput()
    updatePuzzle()
}


function getUserInput() {
    userInput = userInputEl.value.toLowerCase()
    userInputEl.value = ""
    if (userInput.length != 5) {
        messageEl.textContent = "Five letters only."
    }
}

function updatePuzzle() {
    checkForWin()
    updateCurrentRow()
}

function checkForWin() {
}

function updateCurrentRow() {
    // update text and color
}



init()