"use strict";

const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const curren0El = document.getElementById("current--0");
const curren1El = document.getElementById("current--1");
const diceHidden = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

let total, currentScore, activePlayer, isPlaying;

const initGame = function () {
  total = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0Element.innerHTML = 0;
  score1Element.innerHTML = 0;
  curren0El.innerHTML = 0;
  curren1El.innerHTML = 0;

  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.remove("player--active");
  player2.classList.remove("player--active");
  player1.classList.add("player--active");
  diceHidden.classList.add("hidden");
};
initGame();

const switchActivePlayer = function () {
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).innerHTML = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNumber);
    diceHidden.classList.remove("hidden");
    diceHidden.src = `dice${randomNumber}.png`;
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).innerHTML =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    total[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerHTML =
      total[activePlayer];
    if (total[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceHidden.classList.remove("hidden");
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener("click", initGame);
