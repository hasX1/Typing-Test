const words = [
  "ability",
  "able",
  "about",
  "above",
  "accept",
  "according",
  "account",
  "across",
  "act",
  "action",
  "activity",
  "actually",
  "add",
  "address",
  "administration",
  "admit",
  "adult",
  "affect",
  "after",
  "again",
  "against",
  "age",
  "agency",
  "agent",
  "ago",
  "agree",
  "agreement",
  "ahead",
  "air",
  "all",
  "allow",
  "almost",
  "alone",
  "along",
  "already",
  "also",
  "although",
  "always",
  "American",
  "among",
  "amount",
  "analysis",
  "and",
  "animal",
  "another",
  "answer",
  "any",
  "anyone",
  "anything",
  "appear",
  "apply",
  "approach",
  "area",
  "argue",
  "arm",
  "around",
  "arrive",
  "art",
  "article",
  "artist",
  "as",
  "ask",
  "assume",
  "at",
  "attack",
  "attention",
  "attorney",
  "audience",
  "author",
  "authority",
  "available",
  "avoid",
  "away",
  "baby",
  "back",
  "bad",
  "bag",
  "ball",
  "bank",
  "bar",
  "base",
  "be",
  "beat",
  "beautiful",
  "because",
  "become",
  "bed",
  "before",
  "begin",
  "behavior",
  "behind",
  "believe",
];

const text = document.getElementById("text-container");
const timer = document.getElementById("timer");
const finalScore = document.getElementById("final-score");
const btn = document.getElementById("try-again");

let longText = combineWords(words);
let error = 0;
let totalTyped = "";
let currentCharIndex = 0;
let timerClu = 60;
let timerCheck;
let TypedStarted = false;

function startTimer() {
  if (!TypedStarted) {
    TypedStarted = true;

    timerCheck = setInterval(() => {
      timerClu--;
      timer.textContent = `Time left: ${timerClu}s`;
      if (timerClu <= 0) {
        clearInterval(timerCheck);
        endTask();
      }
    }, 1000);
  }
}

function endTask() {
  timer.textContent = "Time's up!";
  finalScore.textContent = `Final WPM: ${calculateWPM()}`;
  text.style.display = "none";
  btn.style.display = "block";
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function combineWords(words) {
  if (
    !Array.isArray(words) ||
    !words.every((word) => typeof word === "string")
  ) {
    throw new Error("Input must be an array of strings");
  }
  const shuffledWords = shuffle(words);
  return shuffledWords.join(" ");
}

document.addEventListener("keydown", (e) => {
  console.log("Start");

  startTimer();
  if (e.key === "Backspace") {
    if (totalTyped.length > 0) {
      currentCharIndex = Math.max(currentCharIndex - 1, 0);
      totalTyped = totalTyped.slice(0, -1);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totalTyped += e.key;
    currentCharIndex++;
  }

  let textArr = longText.split("");

  error = 0;

  text.innerHTML = ""; // Clear the text container

  for (let i = 0; i < textArr.length; i++) {
    const span = document.createElement("span");
    if (totalTyped.length > i) {
      if (totalTyped[i] === textArr[i]) {
        span.classList.add("correct");
      } else {
        span.classList.add("wrong");
        error++;
      }
    }
    span.textContent = textArr[i];
    text.appendChild(span);

    if (totalTyped.length >= 20) {
      const scroll = (totalTyped.length - 20) * 14;
      console.log(scroll);

      text.scrollLeft = scroll;
    }
  }
});

function calculateWPM() {
  const wordPM = totalTyped.trim().split(/\s+/).length;
  const baseWPM = Math.round((wordPM / 12) * 60);
  const adWpm = Math.max(baseWPM - error, 0);
  return adWpm;
}

function reset() {
  clearInterval(timerCheck);
  timerClu = 60;
  timer.textContent = `Time left: ${timerClu}s`;
  finalScore.textContent = ``;
  text.style.display = "block";
  btn.style.display = "none";

  error = 0;
  totalTyped = "";
  currentCharIndex = 0;
  TypedStarted = false;
  text.scrollLeft = 0;
  longText = combineWords(words);
  init();
}
function init() {
  text.innerText = longText;
  timer.textContent = `Time left: ${timerClu}s`;
}

init();

btn.addEventListener("click", () => {
  reset();
});
