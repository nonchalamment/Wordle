/*-------------------------------- Constants --------------------------------*/

import { getRandomWord } from "../data/words.js"
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
"m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const colors = ["aliceBlue", "green", "yellow"]

/*---------------------------- Variables (state) ----------------------------*/

let puzzle, win, word, userInput
let attempt = 0

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
    console.log(word)
    win = 0
    puzzle = []
    attempt = 0
    userInputEl.value = ""
    messageEl.textContent = "Let's play!"
    for (let i = 0; i < 30; i++) {
        squareEls[i].textContent = ""
        squareEls[i].style.backgroundColor = "aliceBlue"
    }
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

function checkIfArraysAreEqual(arr1, arr2) {
    const areEqual = arr1.every(function (elem, idx) {
        return elem === arr2[idx]
    }) && arr1.length === arr2.length
    return areEqual
}

function checkForWin() {
    if (checkIfArraysAreEqual(word, userInput)) {
        win = 1
    }
}

function changeToLetterArray(str) {
    let letterArray = []
    for (let i = 0; i < str.length; i++) {
        letterArray[i] = str.slice(i, i+1)
    }
    return letterArray
}

function updatePuzzle() {
    if (win === 1) {
        // put in all of the fun things that would happen if you win the puzzle!
        messageEl.textContent = "You WIN!"
        updateRowDisplay()
    }
    else if (attempt === 5) {
        messageEl.textContent = "Game over."
        updateRowDisplay()
        attempt++
    }
    else if (attempt === 6) {
        messageEl.textContent = "You are out of tries."
    }
    else {
        messageEl.textContent = "Try again."
        updateRowDisplay()
        attempt++
    }
   
}

function updateRowDisplay() {
    let attemptIdx = attempt * 5
    let normalIdx = 0
    for (let i = attemptIdx; i < attemptIdx + 5; i++) {
        squareEls[i].textContent = userInput[normalIdx].toUpperCase()
        normalIdx++
    }
    console.log(normalIdx)
    updateRowColor()
}


function updateRowColor() {
    let attemptIdx = attempt * 5
    let normalIdx = 0
    if (win === 1) {
        for (let i = attemptIdx; i < attemptIdx + 5; i++) {
            squareEls[i].style.backgroundColor = "green"
        }
    }
    else {
        for (let i = attemptIdx; i < attemptIdx + 5; i++) {
            if (userInput[normalIdx] === word[normalIdx]) {
                squareEls[i].style.backgroundColor = "green"
            }
            else if (word.includes(userInput[normalIdx])) {
                squareEls[i].style.backgroundColor = "yellow"
            }
            else {
                squareEls[i].style.backgroundColor = "lightGray"
            }
            normalIdx++
        }
    }
}

function compareToAnswer(arr) {


}


init()