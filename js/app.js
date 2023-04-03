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
    console.log("reset button clicked")
}

function submit() {
    getUserInput()
    console.log("submit button clicked")
}

function render() {

}

function getUserInput() {
    let word = userInputEl.value
    userInputEl.value = ""
}

function updatePuzzle() {

}

function updateCurrentRow(){

}