/*-------------------------------- Constants --------------------------------*/

import { getRandomWord } from "../data/words.js"
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
"m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

/*---------------------------- Variables (state) ----------------------------*/

let win, word
let userInput = []
let attempt = 0

/*------------------------ Cached Element References ------------------------*/
const resetBtnEl = document.getElementById("reset")
const messageEl = document.getElementById("gamedisplay")
const keyboardEl = document.querySelector(".keyboard")

const squareEls = document.querySelectorAll(".squareletter")

/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', init)
keyboardEl.addEventListener('click', passKey)

/*-------------------------------- Functions --------------------------------*/

function init() {
    word = changeToLetterArray(getRandomWord())
    win = 0
    attempt = 0
    userInput = []
    messageEl.textContent = "Let's play!"
    for (let i = 0; i < squareEls.length; i++) {
        squareEls[i].textContent = ""
        squareEls[i].style.backgroundColor = "white"
        squareEls[i].style.border = "solid lightGray"
        squareEls[i].style.color = "black"
    }
}

function submit() {
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
        userInput = []
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
        let answer = 
        messageEl.textContent = `Game over. The answer was "${word[0]}${word[1]}${word[2]}${word[3]}${word[4]}."`
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
            squareEls[i].style.backgroundColor = "#7ba768"
            squareEls[i].style.border = "solid #7ba768"
            squareEls[i].style.color = "white"
        }
    }
    // if all letters are correct, there is no need for additional calculation for color.
    else {
        let letterTally = reduceArrayIntoTally(word)
        // otherwise, we create a tally of all the letters in the solution to deal with duplicate letters
        // in order to correctly render the greens and the yellows.

        renderIfGreen(globalIdx, rowIdx, letterTally)
        renderIfYellow(globalIdx, rowIdx, letterTally)

        // run Green first to decrease the tally count
        // run Yellow next to work with the remaining tally count
    }
}

function reduceArrayIntoTally(arr) {
    return arr.reduce(function(prev, letter){
        if(prev[letter]){
          prev[letter] = prev[letter] + 1
        } else {
          prev[letter] = 1
        }
        return prev
        }, {})
}

function renderIfGreen(largerIdx, smallerIdx, tally) {
    for (let i = largerIdx; i < largerIdx + 5; i++) {
        let currentLetter = `${userInput[smallerIdx]}`
        // iterating through 0-4 for each 5-letter input
        if (currentLetter === word[smallerIdx]) {
            squareEls[i].style.backgroundColor = "#7ba768"
            squareEls[i].style.border = "solid #7ba768"
            squareEls[i].style.color = "white"
            tally[currentLetter] = tally[currentLetter] - 1
        // if input at an index is the same is the word at the same index, then change background color
        // to green and decrease the tally count of the letter
        }
        smallerIdx++
    }
    smallerIdx = 0
}

function renderIfYellow(largerIdx, smallerIdx, tally) {
    for (let i = largerIdx; i < largerIdx + 5; i++) {
        let currentLetter = `${userInput[smallerIdx]}`
        if (word.includes(currentLetter) && tally[currentLetter] > 0 && currentLetter != word[smallerIdx]) {
            // if the letter is included in the word, but also isn't the right letter, but also
            // if the tally is remaining for that letter
            squareEls[i].style.backgroundColor = "#c4b560"
            squareEls[i].style.border = "solid #c4b560"
            squareEls[i].style.color = "white"
            tally[currentLetter] = tally[currentLetter] - 1
        }
        else if (currentLetter != word[smallerIdx]) {
            squareEls[i].style.backgroundColor = "#797c7e"
            squareEls[i].style.border = "solid #797c7e"
            squareEls[i].style.color = "white"
        }
        smallerIdx++
    }
}

function passKey(evt) {
    let inputChoice = evt.target.id.toLowerCase()
    if (attempt < 6) {
        if (alphabet.includes(inputChoice)) {
            if (userInput.length < 5) {
                userInput.push(inputChoice)
                renderLetter()
            }
        }
        else if (inputChoice === "keybackspace") {
            userInput.pop()
            clearRenderLetter()
            renderLetter()
        }
        else if (inputChoice === "keysubmit") {
            submit()
        }
    }

}

function renderLetter() {
    let globalIdx = attempt * 5
    let smallerIdx = 0
    for (let i = globalIdx; i < globalIdx + userInput.length; i++) {
        let currentLetter = `${userInput[smallerIdx]}`
         squareEls[i].textContent = currentLetter.toUpperCase()
        smallerIdx++
    }
}

function clearRenderLetter() {
    let globalIdx = attempt * 5
    for (let i = globalIdx; i < globalIdx + 5; i++) {
        squareEls[i].textContent = ''
    }
}

init()