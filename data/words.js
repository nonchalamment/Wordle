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
    "agate",
    "agree",
    "ahead",
    "album",
    "alien",
    "alike",
    "allow",
    "aloft",
    "alone",
    "aloud",
    "alpha",
    "altar",
    "alter",
    "amber",
    "ample",
    "angry",
]

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
  }
  
  export {
    getRandomWord,
  }