const words = [
    "aback",
    "abase",
    "abate",
    "abbey",
    "above",
    "abyss",
    "acute",
    "admit",
    "adobe",
    "adopt",
    "adore",
    "agape",
    
]

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
  }
  
  export {
    getRandomWord,
  }