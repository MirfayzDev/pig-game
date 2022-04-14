'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Starting conditions
let scores, currentScore, activePlayer, isPlaying;

const init = function () {
    diceEl.classList.add('hidden');
    player0El.classList.add('player--active')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    current0El.textContent = 0
    current1El.textContent = 0
    score0El.textContent = 0
    score1El.textContent = 0
    activePlayer = 0
    currentScore = 0
    scores = [0, 0]
    isPlaying = true
}
init()

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (isPlaying === true) {
        // 1.Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1

        // 2. Display dice
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`

        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            // Switch to next player
            switchPlayer()
        }
    }
})

// Holding current score to global score
btnHold.addEventListener('click', function () {
    if (isPlaying === true) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]


        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            isPlaying = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            diceEl.classList.add('hidden')
        } else {
            // 3. Switch to the next player
            switchPlayer()
        }
    }
})

// Resetting the game
btnNew.addEventListener('click', init)

