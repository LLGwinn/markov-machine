/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordList = this.words;
    wordList.push(null);
    let chain = {};
    for (let i = 0; i < this.words.length; i++) {
      if (wordList[i] !== null) {
        if (chain[wordList[i]]) {
          chain[wordList[i]].push(wordList[i + 1]);
        }
        else {
          chain[wordList[i]] = [wordList[i + 1]];
        }
      }
    }
    this.wordChains = chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let chainKeys = Object.keys(this.wordChains);
    let randStartIndex = Math.floor(Math.random() * (chainKeys.length));
    let currWord = chainKeys[randStartIndex];
    let textWords = [currWord];
    let randNextIndex = Math.floor(Math.random() * this.wordChains[currWord].length);
    let nextWord = this.wordChains[currWord][randNextIndex];

    do {
      if (nextWord !== null) {
        textWords.push(nextWord);
      }
      currWord = nextWord;
      if (currWord !== null) {
        randNextIndex = Math.floor(Math.random() * this.wordChains[currWord].length);
        nextWord = this.wordChains[currWord][randNextIndex];
      }
    }
    while (nextWord !== null && textWords.length < numWords);
 
    let textArray = [];
    for (let item of textWords) {
      if (item !== null) {
        textArray.push(item);
      };
    }
    let finalText = `${textArray.join(' ')}.`
    return finalText;
  }
}

module.exports = {'MarkovMachine':MarkovMachine}

