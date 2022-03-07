const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
  "I'm bunbu samada cocacola. I eat as much as I sleep lah, no exception ah. What is better than a little something to eat?",
];
// store list of words and the word which is being typed
let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

// start
document.getElementById("start").addEventListener("click", () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // put the quote into an array of words
  words = quote.split(" ");
  // reset word index for tracking
  wordIndex = 0;
  // create an array of span elements so we can set a class
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  // convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  //   highlight the first word
  quoteElement.childNodes[0].className = "highlight";
  //   clear prior messages
  messageElement.innerText = "";

  // setup the textbox and clear it
  typedValueElement.value = "";
  //   set focus
  typedValueElement.focus();

  startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", () => {
  //  get the current word
  const currentWord = words[wordIndex];
  //   get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    //   end of sentence / success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `OKBEDE! You finished in ${elapsedTime / 1000} seconds.`;
    // clear the typed word for a new one
    messageElement.innerText = message;
    typedValueElement.value = "";
    typedValueElement.className = "";
    typedValueElement.blur();
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    //   end of word
    //  clear the typedValueElement for the new word
    typedValueElement.value = "";
    typedValueElement.className = "";
    //   move to the next word
    wordIndex++;
    // reset the class name for all the elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    //   currently correct -> highlight next word
    typedValueElement.classname = "";
  } else {
    //   error
    typedValueElement.className = "error";
  }
});

// store scores in local storage

const score = localStorage.setItem("score", JSON.stringify(elapsedTime));

document.addEventListener("DOMContentLoaded", () => {
  const highScore = [];

  if (score < 20) {
    highScore = JSON.parse(score);
    highScore.push(score);
  }
});
