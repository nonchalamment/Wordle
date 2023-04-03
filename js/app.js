/*-------------------------------- Constants --------------------------------*/

import { getRandomWord } from "../data/words.js"

/*---------------------------- Variables (state) ----------------------------*/

let puzzle, win, word

/*------------------------ Cached Element References ------------------------*/
const submitBtnEl = document.getElementById("submit")
const resetBtnEl = document.getElementById("reset")
const userInputEl = document.getElementById("userinput")

const squareEls = document.querySelectorAll(".squareletter")

/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', init)
submitBtnEl.addEventListener('click', submit)


/*-------------------------------- Functions --------------------------------*/

function init() {
    word = ""
    win = 0
    puzzle = []
    console.log("initializing")
}

function submit() {
    getUserInput()
    updatePuzzle()
    console.log("submit button clicked")
}


function getUserInput() {
    let word = userInputEl.value
    userInputEl.value = ""
}

function updatePuzzle() {
    updateCurrentRow()
    checkForWinner()
}

function checkForWinner() {


}

function updateCurrentRow() {
    updateCurrentRowText()
    updateCurrentRowColor()
}

function updateCurrentRowText() {

}

function updateCurrentRowColor() {


}


init()