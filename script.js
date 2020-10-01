const playButton = document.getElementById('play-button');
const container = document.getElementById('container');
const playerContainer = document.getElementById('player-selection');
const userfighter = document.getElementById('user-fighter');
const computerContainer = document.getElementById('computer-selection');
const computerfighter = document.getElementById('computer-fighter');
const starterDiv = document.getElementById('starter');

const scoreboard = document.getElementById('score');
const userBalls = document.querySelectorAll('.ball.user-ball');
const cpuBalls = document.querySelectorAll('.ball.cpu-ball');

const roundResult = document.getElementById('round-result');

const activeButton = document.querySelectorAll('.active-button');

const winningScore = 5;

let playerScore = 0;
let compScore = 0;
let roundScore = 0;

function reset() {
    playerScore = 0;
    compScore = 0;
    roundScore = 0;
    scoreboard.textContent = (`Score: ${playerScore} to ${compScore} Round: ${roundScore}`);
    roundResult.textContent = '';
    for (let i = 0; i <= (userBalls.length - 1); i++) {
        userBalls[i].setAttribute('class', 'ball user-ball');
        cpuBalls[i].setAttribute('class', 'ball user-ball');
    }
}

function computerPlay() { 
    let selectHand = ['rock', 'paper', 'scissors'];
    let hand = selectHand[Math.floor(Math.random() * selectHand.length)];
    return(hand);
}

function round(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    roundScore++;
    return(`There was NO EFFECT! The ${playerSelection}\'s high-five!`);
  } else if ((playerSelection == 'rock' && computerSelection == 'scissors') ||
      (playerSelection == 'paper' && computerSelection == 'rock') ||
      (playerSelection == 'scissors' && computerSelection == 'paper')) {
        playerScore++;
        roundScore++;
        userBalls[(playerScore - 1)].setAttribute('class', 'ball user-ball win-round');
        return(`It was SUPER EFFECTIVE, ${playerSelection} beats ${computerSelection}!`);
        
  } else {
    compScore++;
    roundScore++;
    cpuBalls[(compScore - 1)].setAttribute('class', 'ball cpu-ball win-round');
    return(`Ouch... CRITICAL HIT, ${computerSelection} beats ${playerSelection}!`);;
  }
}

function knockOut() {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'ko');

    const newButton = document.createElement('button');
    newButton.setAttribute('class', 'btn');
    newButton.setAttribute('id', 'play-again');
    newButton.textContent = 'Play Again';

    const newText = document.createElement('p');
    newText.setAttribute('class', 'post-game');
    newText.textContent = 'Straight testin';

    container.appendChild(newDiv);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newText);


    //againButton.addEventListener('click', () => {starterDiv.remove()});
}

function rematch() {
    const x = document.getElementById('play-again');
    const y = document.getElementById('ko');
    x.addEventListener('click', () => {
        reset();
        x.remove();
        y.remove();
        userfighter.setAttribute('class', '');
        computerfighter.setAttribute('class', '');
        roundResult.textContent = 'COMPUTER wants to fight! Select an attack.';
    });

}

function checkGameOver() {    
    if (playerScore === winningScore) {
        roundResult.textContent = 'The match is yours';
        knockOut();
        rematch();
        //activeButton.forEach(activeButton => activeButton.classList.remove('active-button'));
    } else if (compScore === winningScore) {
        roundResult.textContent = 'You\'ve been defeated, you white out';
        knockOut();
        rematch();
        //activeButton.forEach(activeButton => activeButton.classList.remove('active-button'));
    } else {
        console.log('');
    }
}


/*
//to take functions off buttons and call instead
function testRound() {
    let playerSelection = this.textContent;
    let computerSelection = computerPlay();
    roundResult.textContent = (round(playerSelection, computerSelection));
    console.log(`Score: ${playerScore} to ${compScore} // Round: ${roundScore}`);
    scoreboard.textContent = (`Score: ${playerScore} to ${compScore} // Round: ${roundScore}`);

    checkGameOver();
}
*/
/*
        let playerSelection = 'rock';
        let computerSelection = computerPlay();
        console.log(round(playerSelection, computerSelection));
        console.log(`Score: ${playerScore} to ${compScore} // Round: ${roundScore}`);
*/
/*     */

activeButton.forEach(activeButton => activeButton.addEventListener('click', (e) => {
    if (button = e.target.matches("#rock")) {
        let playerSelection = 'rock';
        let computerSelection = computerPlay();
        roundResult.textContent = (round(playerSelection, computerSelection));
        console.log(`Score: ${playerScore} to ${compScore} // Round: ${roundScore}`);
        scoreboard.textContent = (`Score: ${playerScore} to ${compScore} Round: ${roundScore}`);
        
        computerfighter.setAttribute('class', `${computerSelection}`);
        userfighter.setAttribute('class', 'rock');

        checkGameOver();

    } else if (button = e.target.matches("#paper")) {
        let playerSelection = 'paper';
        let computerSelection = computerPlay();
        roundResult.textContent = (round(playerSelection, computerSelection));
        console.log(`Score: ${playerScore} to ${compScore} // Round: ${roundScore}`);
        scoreboard.textContent = (`Score: ${playerScore} to ${compScore} Round: ${roundScore}`);

        computerfighter.setAttribute('class', `${computerSelection}`);
        userfighter.setAttribute('class', 'paper');

        checkGameOver();
    } else if (button = e.target.matches("#scissors")) {
        let playerSelection = 'scissors';
        let computerSelection = computerPlay();
        roundResult.textContent = (round(playerSelection, computerSelection));
        console.log(`Score: ${playerScore} to ${compScore} // Round: ${roundScore}`);
        scoreboard.textContent = (`Score: ${playerScore} to ${compScore} Round: ${roundScore}`);

        userfighter.setAttribute('class', 'scissors');
        computerfighter.setAttribute('class', `${computerSelection}`);

        checkGameOver();
    }
}));


playButton.addEventListener('click', () => {starterDiv.remove()});


//this.arrowsHolder.forEach(arrow => arrow.addEventListener('click', e => console.log(arrow.id)));





/**
 * Play a single round of the game, updating the round results as necessary.
 */
function playRound() {
    // 'this' refers to button element calling this function.
    const playerSelection = this.textContent.toLowerCase();
    const computerSelection = computerPlay().toLowerCase();
    
    // Element (containing each player's action) class lists
    const classListPlayer = document.querySelector('.player-action').classList;
    const classListComp = document.querySelector('.computer-action').classList;
    let winner;

    updateActionImage(classListPlayer, playerSelection);
    updateActionImage(classListComp, computerSelection);

    // Tie between player and computer.
    if (playerSelection === computerSelection) {
        return;
    } else {
        winner = findWinner(playerSelection, computerSelection);
        updateScore(winner);
    }

    checkGameOver();
}
//const BUTTONS = [...document.querySelectorAll('.player .action-button')];
// Add event listener to each button.
//for (let i = 0; i < BUTTONS.length; i++) {
//    BUTTONS[i].addEventListener('click', playRound);
//}
