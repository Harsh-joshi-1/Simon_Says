let gameSeq = [];
let playerSeq = [];
let level = 0;
let status = false;
const gamearea = document.querySelectorAll('.game-area');
const colors = ['red', 'green', 'blue', 'yellow'];
const colorBoxes = document.querySelectorAll('.color-box');
const startDiv = document.createElement('div');
startDiv.className = 'startbutton';
startDiv.textContent = 'Start Game';
const container = document.querySelector('.container');
container.appendChild(startDiv);
let sessionhighscore = 0;
function updateHighscoreDisplay() {
    let highscoreDisplay = document.querySelector('.highscore');
    highscoreDisplay.textContent = `High Score: ${sessionhighscore-1}`;
}
startDiv.addEventListener('click', () => {
    if (!status) {
        startgame();
        startDiv.style.display = 'none';
    }
});
colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        box.classList.add('flashclick');
        setTimeout(() => {
            box.classList.remove('flashclick');
        }, 50);
        userinput(box.id);
    });
});
function flashbtn(color) {
    const btn = document.getElementById(color);
    btn.classList.add('flashclick');
    setTimeout(() => {
        btn.classList.remove('flashclick');
    }, 500);
}
function levelDisplay() {
    const levelDisplay = document.querySelector('.level');
    levelDisplay.textContent = `Level: ${level}`;
}
function startgame() {
    level = 0;
    gameSeq = [];
    playerSeq = [];
    status = true;
    nextLevel();
}
function nextLevel() {
    level++;
    if( level > sessionhighscore) {
        sessionhighscore = level;
    }
    levelDisplay();
    playerSeq = [];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSeq.push(randomColor);
    flashbtn(randomColor);
    console.log(`Game Sequence: ${gameSeq}`);
    gamearea.forEach((area, index) => {
        if (gameSeq[level - 1] === area.id) {
            setTimeout(() => {
                area.classList.add('flashclick');
                setTimeout(() => {
                    area.classList.remove('flashclick');
                }, 500);
            }, index * 1000);
        }
    });
}
function checkInput(index) {
    if (gameSeq[index] === playerSeq[index]) {
        if (playerSeq.length === gameSeq.length) {
            setTimeout(() => {
                nextLevel();
            }, 1000);
        }
    } else {
        status = false;
        let levelDisplay = document.querySelector('.level');
        levelDisplay.textContent = 'Game Over!';
        gamearea.forEach(area => {
            area.classList.remove('flash');
        });
        startDiv.style.display = 'block';
        let body = document.querySelector('body');
        body.classList.add('loserflash');
        setTimeout(() => {
            body.classList.remove('loserflash');
        }, 1000);
        updateHighscoreDisplay();
    }
}
function userinput(color) {
    if (!status) {
        startgame();
    }
    if (status) {
        playerSeq.push(color);
        checkInput(playerSeq.length - 1);
    }
}