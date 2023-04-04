/*-------------------------------- Constants --------------------------------*/

import { getRandomWord } from "../data/words.js"
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
"m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const colors = ["aliceBlue", "green", "yellow"]

/*---------------------------- Variables (state) ----------------------------*/

let win, word, userInput
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
    attempt = 0
    userInputEl.value = ""
    messageEl.textContent = "Let's play!"
    for (let i = 0; i < 30; i++) {
        squareEls[i].textContent = ""
        squareEls[i].style.backgroundColor = "white"
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
    let globalIdx = attempt * 5
    let rowIdx = 0
    for (let i = globalIdx; i < globalIdx + 5; i++) {
        squareEls[i].textContent = userInput[rowIdx].toUpperCase()
        rowIdx++
    }
    updateRowColor()
}


function updateRowColor() {
    let globalIdx = attempt * 5
    let rowIdx = 0
    // globalIdx represents the unique ID of each square; rowIdx represents the order of the square
    // within a given row.
    if (win === 1) {
        for (let i = globalIdx; i < globalIdx + 5; i++) {
            squareEls[i].style.backgroundColor = "green"
        }
    }
    // if all letters are correct, there is no need for additional calculation for color.
    else {
        let letterTally = word.reduce(function(prev, letter){
            if(prev[letter]){
              prev[letter] = prev[letter] + 1
            } else {
              prev[letter] = 1
            }
            return prev
            }, {})
        // otherwise, we create a tally of all the letters in the solution to deal with duplicate letters
        // in order to correctly render the greens and the yellows.

        renderIfGreen(globalIdx, rowIdx, letterTally)
        renderIfYellow(globalIdx, rowIdx, letterTally)

        // run Green first to decrease the tally count
        // run Yellow next to work with the remaining tally count
    }
}

function renderIfGreen(largerIdx, smallerIdx, tally) {
    for (let i = largerIdx; i < largerIdx + 5; i++) {
        let currentLetter = userInput[smallerIdx]
        // iterating through 0-4 for each 5-letter input
        if (currentLetter === word[smallerIdx]) {
            squareEls[i].style.backgroundColor = "green"
            tally[`${currentLetter}`] = tally[`${currentLetter}`] - 1
        // if input at an index is the same is the word at the same index, then change background color
        // to green and decrease the tally count of the letter
        }
        smallerIdx++
    }
    smallerIdx = 0
}

function renderIfYellow(largerIdx, smallerIdx, tally) {
    for (let i = largerIdx; i < largerIdx + 5; i++) {
        let currentLetter = userInput[smallerIdx]
        if (word.includes(`${currentLetter}`) && tally[currentLetter] > 0 && currentLetter != word[smallerIdx]) {
            // if the letter is included in the word, but also isn't the right letter, but also
            // if the tally is remaining for that letter
            squareEls[i].style.backgroundColor = "yellow"
            tally[`${currentLetter}`] = tally[`${currentLetter}`] - 1
        }
        else if (currentLetter != word[smallerIdx]) {
            squareEls[i].style.backgroundColor = "lightGray"
        }
        smallerIdx++
    }
}

init()