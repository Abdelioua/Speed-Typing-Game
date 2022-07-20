//Array of random words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
//Setting hardness level
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
// Default level
let defaultHardnessLvl = "Easy"; //Change level from here
let defaultHardnessSeconds = lvls[defaultHardnessLvl];

//Catch Selectors
let startButton = document.querySelector(".start");
let lvlSpanName = document.querySelector(".message .lvl");
let lvlSpanSeconds = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

//Setting span name and seconds and the chosen word
lvlSpanName.innerHTML = defaultHardnessLvl;
lvlSpanSeconds.innerHTML = defaultHardnessSeconds;
timeLeftSpan.innerHTML = defaultHardnessSeconds;
scoreTotal.innerHTML = words.length;

// Disable Pase event

input.onpaste = () => false;

//Start Game

startButton.onclick = function () {
  startButton.remove();
  input.focus();
  //Generate word function
  getWords();
};

function getWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  //remove word from Array
  // possible different code to remove  words.filter((e) => e[wordIndex]);
  words.splice(wordIndex, 1);
  // show the random word we removed from array
  theWord.innerHTML = randomWord;
  // Empty old words from (upcominwords) box
  upcomingWords.innerHTML = "";
  // now insert upcoming words inside (upcomingwords) box
  for (let i = 0; i < words.length; i++) {
    //create div and text
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call start play function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultHardnessSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      //stop timer condition
      clearInterval(start);
      //compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //empty input feild
        input.value = "";
        scoreGot.innerHTML++;
        //call getword function
        if (words.length > 0) {
          getWords();
        } else {
          //calling winning span
          let span = document.createElement("span");
          span.className = "good";
          let spantxt = document.createTextNode("You Won");
          span.appendChild(spantxt);
          finishMessage.appendChild(span);
          //remove upcoming words box
          upcomingWords.remove();
        }
      } else {
        //calling losing span
        let span = document.createElement("span");
        span.className = "bad";
        let spantxt = document.createTextNode("Game Over");
        span.appendChild(spantxt);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
