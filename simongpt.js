// Simon.js
let gameSeq = [];
let userSeq = [];

const btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");

// start on any key
document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    h2.textContent = "Level 0";
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];                 // reset user input each level
  level++;
  h2.textContent = `Level ${level}`;

  const randIdx = Math.floor(Math.random() * btns.length);
  const randColor = btns[randIdx];
  const randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);      // store sequence
  gameFlash(randBtn);           // show flash for the new step
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000); // next level when user completes current one
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b><br>Press any key to start.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  const btn = this;
  userFlash(btn);

  const userColor = btn.id;     // ids: red, yellow, green, purple
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// add click listeners
const allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
