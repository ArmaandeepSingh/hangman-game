var words = document.getElementById("word_display");
var generatedWords = createRandomString();
const deadGuy = document.querySelectorAll(".deadguy");
const resultDisplay = document.getElementById("result_display");
const newGame = document.querySelector(".new_game");

function createRandomString() {
  const abc = ['lakesidezr','fireplacev','flowerbeds','backyardsq','sunflowerd','butterflym','raindropsw','waterfallp','bookmarkkt','highlightr',];
  return abc[(Math.floor(Math.random() * abc.length))];
}

function initializeCharacters(char) {
  const existingWords = words.innerHTML.split("").filter(word => word !== " ");
  for(let i=0; i<generatedWords.length; i++) {
    if(generatedWords[i] === char) {
      existingWords[i] = char;
    } 
  }
  const newWords = existingWords.join(" ");
  words.innerHTML = newWords;
}

function hangman(i) {
  if(i<=5) {
    deadGuy[i].style.display = "inline-block";
  }
  else {
    resultDisplay.textContent = "GAME OVER";
    generatedWords = createRandomString();
    initializeWords(true);
    resetHangMan();
  }
}

function initializeWords(reset=false) {
  if(reset) {
   words.innerHTML = ""; 
  }
  let word = "_";
  for(let i=0; i<10; i++) {
    words.innerHTML += word + " ";
  }
}

function resetHangMan() {
  const buttons = document.querySelectorAll("button");

  deadGuy.forEach((el) => el.style.display = "none");
  buttons.forEach((button) => button.disabled = false)
}

document.addEventListener("DOMContentLoaded", () => {
  const keyboard = document.getElementById("keybord");
  const characters = [];
  let currentHangCount = 0;
  let i= "a".charCodeAt(0), j= "z".charCodeAt(0);
  initializeWords();
  resetHangMan();
  
  while(i<=j) {
    characters.push(String.fromCharCode(i));
    i++;
  }
  characters.forEach((char) => {
    const button = document.createElement("button");
    button.textContent=`${char.toUpperCase()}`;
    button.addEventListener("click", (e) => {
      const selectedWord = e.target.innerHTML.toLowerCase();
      const charIndex = generatedWords.indexOf(`${selectedWord}`);
      if(charIndex !== -1) {
        initializeCharacters(selectedWord);
      }
      else {
        hangman(currentHangCount);
        currentHangCount++;
      }
      
      e.target.disabled = true;
    })
    keyboard.appendChild(button);
  })

  newGame.addEventListener("click", () => {
    generatedWords = createRandomString();
    initializeWords(true);
    resetHangMan();
    resultDisplay.textContent = "";
  })
})