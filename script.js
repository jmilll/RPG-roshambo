const playButton = document.getElementById('play-button');
const container = document.getElementById('container');
const playerContainer = document.getElementById('player-selection');
const userfighter = document.getElementById('user-fighter');
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
    newText.textContent = 'You\'ve been defeated, you get sad...';

    const newSad = document.createElement('div');
    newSad.setAttribute('class', 'sad');

    container.appendChild(newDiv);
    newDiv.appendChild(newSad);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newText);
}

// same as knockout, but different results for winning
function winner() {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'ko');

    const newButton = document.createElement('button');
    newButton.setAttribute('class', 'btn');
    newButton.setAttribute('id', 'play-again');
    newButton.textContent = 'Play Again';

    const newText = document.createElement('p');
    newText.setAttribute('class', 'post-game');
    newText.textContent = 'Hey, you won! You gained 12,000EXP points! You got $1500, sent some home to mom.';

    const newTrophy = document.createElement('div');
    newTrophy.setAttribute('class', 'trophy');

    container.appendChild(newDiv);
    newDiv.appendChild(newTrophy);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newText);
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
        winner();
        rematch();
    } else if (compScore === winningScore) {
        roundResult.textContent = 'You\'ve been defeated, you white out';
        knockOut();
        rematch();
    } else {
        console.log('');
    }
}

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