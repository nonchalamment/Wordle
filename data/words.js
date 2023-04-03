const words = [
    "aback",
    "abase",
    "abate",
    "abbey",
]

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
  }
  
  export {
    getRandomWord,
  }