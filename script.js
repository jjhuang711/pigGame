"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting variables
let scores, currentScore, activePlayer, playing;

// Function expression to Create initialized state
const init = function () {
  diceEl.classList.add("hidden");
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Initialize
init();

// Function expression to switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Since we start with player 0, toggle both player will ensure there is only 1 active player.
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Roll dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    // diceEl.setAttribute("src", `dice-${dice}.png`);
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      setTimeout(function () {
        diceEl.classList.add("hidden");
      }, 1000);
      //switch to the next  player (if active player is 0, change it to 1)
      switchPlayer();
    }
  }
});

// Hold dice functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player
    scores[activePlayer] += currentScore;
    // Display score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game, game WON
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // Switch to the next player
      switchPlayer();
      diceEl.classList.add("hidden");
    }
  }
});

btnNew.addEventListener("click", init);
