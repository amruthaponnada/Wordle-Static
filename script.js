// required variables
let position = 1;
let word_length = 0;
let ans_array = [];
let answer_filled = "";
let answer_word = "right";
let position_checker;
let keyboard = document.querySelectorAll(".key");
let keyboard_key;
let corrects = 0;
let won = false;
let boardState = [];
let StateLocalStorage = [];
let attempts = 0;
let fill_tile;
// localStorage.clear();

// 1, event listener - valli
// 2, Check answer -valli
// 3, Setting localstorage - xx
// 4, Update localstorage - xx
// 5, Fill board - xx

// STEP 1 - EVENTS LISTENERS (WINDOW KEYDOWN AND FOR KEYBOARD keyboard)
// STEP 2 - CHECK ANSWER
// STEP 3 - FILLBOARDD
// STEP 4 - SETTING LOCALSTORAGE
// STEP 5 - UPDATE LOCALSTORAGE

// to fill the board
function fillBoard() {
  position_checker = position - 5;
  for (let i = 0; i < 5; i++) {
    answer_filled += ans_array[i];
    keyboard.forEach(function (element) {
      if (element.dataset.key == ans_array[i]) {
        keyboard_key = element;
      }
    });
    if (ans_array[i] == answer_word[i]) {
      fill_tile = document.getElementById(`${position_checker}`);
      fill_tile.innerHTML = ans_array[i];
      fill_tile.style.backgroundColor = "#6aaa64";
      keyboard_key.style.backgroundColor = "#6aaa64";
      fill_tile.style.color = "white";
      keyboard_key.style.color = "white";
      corrects++;
    } else if (answer_word.includes(ans_array[i])) {
      fill_tile = document.getElementById(`${position_checker}`);
      fill_tile.innerHTML = ans_array[i];
      fill_tile.style.backgroundColor = "#c9b458";
      keyboard_key.style.backgroundColor = "#c9b458";
      fill_tile.style.color = "#ffffff";
      keyboard_key.style.color = "#ffffff";
    } else {
      fill_tile = document.getElementById(`${position_checker}`);
      fill_tile.innerHTML = ans_array[i];
      fill_tile.style.backgroundColor = "#787c7e";
      fill_tile.style.color = "#ffffff";
      keyboard_key.style.color = "#ffffff";
      keyboard_key.style.backgroundColor = "#787c7e";
    }
    position_checker++;
  }
  answer_filled = "";
  if (corrects == 5) {
    won = true;
    console.log("game over");
  }
  corrects = 0;
}

// setting up local storage
function settingLocalStograge() {
  localStorage.setItem("answer", answer_word);
  if (
    localStorage.getItem("attempts") == null ||
    localStorage.getItem("attempts") == undefined
  )
    localStorage.setItem("attempts", 0);
  StateLocalStorage = JSON.parse(localStorage.getItem("boardState"));

  position = 1;
  if (StateLocalStorage != null && StateLocalStorage != undefined) {
    console.log(StateLocalStorage);
    console.log(StateLocalStorage.length);
    boardState = StateLocalStorage;
    attempts = JSON.parse(localStorage.getItem("attempts"));
    for (let i = 0; i < StateLocalStorage.length; i++) {
      for (let j = 0; j < 5; j++) {
        ans_array[j] = StateLocalStorage[i][j];
      }
      position = position + 5;
      fillBoard();
    }
  }
}

settingLocalStograge();

// updating local storage
function updateLocalStorage() {
  // console.log(boardState);
  localStorage.setItem("boardState", JSON.stringify(boardState));
  // StateLocalStorage = JSON.parse(localStorage.getItem('boardState'));
  console.log(attempts);
  localStorage.setItem("attempts", attempts);
  // console.log(StateLocalStorage);
  // console.log(boardState);
}

// to check if the answer is right
function checkAnswer() {
  position_checker = position - 5;
  for (let i = 0; i < 5; i++) {
    answer_filled += ans_array[i];
    keyboard.forEach(function (element) {
      if (element.dataset.key == ans_array[i]) {
        keyboard_key = element;
      }
    });
    if (ans_array[i] == answer_word[i]) {
      fill_tile = document.getElementById(`${position_checker}`);
      fill_tile.style.backgroundColor = "#6aaa64";
      keyboard_key.style.backgroundColor = "#6aaa64";
      fill_tile.style.color = "#ffffff";
      keyboard_key.style.color = "#ffffff";
      corrects++;
    } else if (answer_word.includes(ans_array[i])) {
      fill_tile = document.getElementById(`${position_checker}`);
      fill_tile.style.backgroundColor = "#c9b458";
      keyboard_key.style.backgroundColor = "#c9b458";
      fill_tile.style.color = "#ffffff";
      keyboard_key.style.color = "#ffffff";
    } else {
      fill_tile = document.getElementById(`${position_checker}`);
      fill_tile.style.backgroundColor = "#787c7e";
      fill_tile.style.color = "white";
      keyboard_key.style.color = "white";
      keyboard_key.style.backgroundColor = "#787c7e";
    }
    position_checker++;
  }
  // console.log(answer_filled);
  // localStorage.setItem("attempts",attempts);
  attempts = JSON.parse(localStorage.getItem("attempts"));
  // console.log(attempts);
  // console.log(boardState);
  console.log(boardState);
  boardState[attempts] = answer_filled;
  console.log(boardState);
  StateLocalStorage = boardState;
  attempts++;
  updateLocalStorage();
  answer_filled = "";

  if (corrects == 5) {
    won = true;
    console.log("game over");
  }
  corrects = 0;
}

// event listener when u press a key in your keyboard
window.addEventListener("keydown", function (e) {
  let l = e.key;
  if (l == "Enter") {
    if (position % 5 == 1) {
      for (let i = position - 5, j = 0; i < position; i++, j++) {
        fill_tile = document.getElementById(`${i}`);
        ans_array[j] = fill_tile.innerHTML;
      }
      checkAnswer();
      word_length = 0;
    }
  } else if (l == "Backspace") {
    // console.log(position);
    if (word_length) {
      position--;
      fill_tile = document.getElementById(`${position}`);
      // console.log(fill_tile);
      fill_tile.innerHTML = "";
      word_length--;
    }
  } else if(l.length == 1 && ((l >= 'a' && l <= 'z') ||(l >= 'A' && l <= 'Z'))){
    if (word_length != 5 && !won) {
      // console.log(l);
      fill_tile = document.getElementById(`${position}`);
      fill_tile.innerHTML = l;
      position++;
      word_length++;
    }
  }
});

// adding evetlistener to the keyboard on the screen
keyboard.forEach(function (element) {
  element.addEventListener("click", function () {
    let l = element.dataset.key;
    if (l == "Enter") {
      if (position % 5 == 1) {
        for (let i = position - 5, j = 0; i < position; i++, j++) {
          fill_tile = document.getElementById(`${i}`);
          ans_array[j] = fill_tile.innerHTML;
        }
        checkAnswer();
        word_length = 0;
      }
    } else if (l == "Backspace") {
      if (word_length) {
        position--;
        fill_tile = document.getElementById(`${position}`);
        //console.log(fill_tile);
        fill_tile.innerHTML = "";
        word_length--;
      }
    } else{
      if (word_length != 5 && !won) {
        //console.log(l);
        fill_tile = document.getElementById(`${position}`);
        fill_tile.innerHTML = l;
        position++;
        word_length++;
      }
    }
  });
});

// onclick functions
function instructions() {
  document.getElementById("container").style.display = "None";
  document.getElementById("game-box").style.display = "Block";
}
function remove() {
  document.getElementById("game-box").style.display = "None";
  document.getElementById("container").style.display = "Block";
}