//strict mode
"use strict";
document.addEventListener('DOMContentLoaded', (event) => {
    welcome();
});

//global variable & constants
const tileWidth = 101;
const titleHeight = 83;
const canvasRBoundary = 507;
const canvasVBoundary = 406;
const canvasWidth = 707;
const canvasHeight = 606;
var playerimg = 'images/char-boy.png';
var gameState = "notStarted";
var lifeCount = 3;
var score = 0;

//score panel
const heartsUl = document.querySelector('.hearts');
const heartsLi = heartsUl.children;

const spanLives = document.querySelector('.lives');
const spanScore = document.querySelector('.score');
const selectedPlayer = document.getElementsByClassName('playerPic playerPicSeleted');

//refresh button to restart the game
const repeatElement = document.querySelector('.restart');
repeatElement.addEventListener('click',function() {
    document.location.reload(true);
});

// Welcome Modal
const modalStartDiv = document.querySelector('#startModal');
const startBtn = document.querySelector('#startButton');

startBtn.addEventListener('click',function() {
    modalStartDiv.style.display = 'none';
    gameState ="started";
});

//End Modal
const modalEndDiv = document.querySelector('#endModal');
const playAgainBtn = document.querySelector('#playAgainButton');

playAgainBtn.addEventListener('click', function () {
    modalEndDiv.style.display = 'none';
    playAgain();
});

// Enemies constructor our player must avoid
const Enemy = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.sprite = 'images/enemy-bug.png';// default player
    this.height = 65;
    this.width = 95;
    this.speed = 290;//default speed
};

// Enemy prototype Methods

// Update the enemy's position & multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    if (this.xAxis > canvasWidth) {
       this.xAxis = -100 * (Math.floor(Math.random()*5) +1);;
    } else {
        this.xAxis += this.speed *dt;
    };
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xAxis, this.yAxis);
};

//Player constructor

// const Player = function(xAxis, yAxis, sprite) {
const Player = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.sprite = 'images/char-boy.png';
    this.height = 75;
    this.width = 65;
}

//Player Methods

Player.prototype.update = function(dt) {
    this.checkCollisions();
    this.checkWin();
};

//to select a player image
Player.prototype.setSprite = function() {
    this.sprite = playerimg;
};

Player.prototype.render = function() {
    this.setSprite();
    ctx.drawImage(Resources.get(this.sprite), this.xAxis, this.yAxis);
};

//Player movements based on the arrow keys
Player.prototype.handleInput = function(direction) {
     if(direction==='up') {
        updateScore();
     };

     if(direction==='left' && this.xAxis >0) {
        this.xAxis -=tileWidth;
    } else if(direction==='right' && this.xAxis < canvasRBoundary) {
        this.xAxis +=tileWidth;
    } else if(direction==='down' && this.yAxis < canvasVBoundary) {
        this.yAxis +=titleHeight;
    } else if(direction==='up' && this.yAxis >0) {
        this.yAxis -=titleHeight;
    };
};

//method to check if there is a collision of the player with the enenmy
Player.prototype.checkCollisions = function() {
    var noOfEnemies = allEnemies.length;
    for(let i = 0; i < noOfEnemies; i++) {
        if (this.xAxis>(allEnemies[i].xAxis-50) && this.xAxis<(allEnemies[i].xAxis+50) &&
            this.yAxis>(allEnemies[i].yAxis-50) && this.yAxis<(allEnemies[i].yAxis+50)) {
            this.goBackToStart();
            this.lives();
        };
    };

};

//player to go back to the start position
Player.prototype.goBackToStart = function() {
    this.xAxis = 300;
    this.yAxis = 410;
};

//whenever player collides with the enenmy, his life counter is reduced by 1
Player.prototype.lives = function() {
    lifeCount--;
    score--;
    spanScore.innerHTML = score;
    if (lifeCount>=0) {
        heartsLi[lifeCount].firstElementChild.classList.add('greyheart');
    }

    spanLives.innerHTML = lifeCount>1||lifeCount==0 ? ` ${lifeCount} Lives remaining ` :  `${lifeCount} Life remaining` ;
    if (lifeCount<1) {
        gameState ="lostGame";
        gameOver();
    };
};

//check if player reached the water
Player.prototype.checkWin = function() {
    if (this.yAxis ==0 || this.yAxis <30) {
        gameState ="wonGame";
        score += 10;
        spanScore.innerHTML = score;
        wonGame();
    };
};

// all enemy objects in an array called allEnemies
const enemyYAxis = [55,140,230,55,140,230];
var allEnemies = enemyYAxis.map((y, index)=> { return new Enemy(-250*[index+2],y);});

// Player object in a variable called player
const player = new Player(300, 410);

//This listens for key presses and sends the keys to the handleInput() mtd
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//welcome Screen to select player
function welcome() {
    modalStartDiv.style.display = 'block';
};

//Displays a modal when the game is lost
function gameOver() {
    modalEndDiv.style.display = 'block';
    document.querySelector('#gameMsg').innerText ="GAME OVER!"
    document.querySelector('.scoreModal').innerHTML = score;
};

//Displays a modal when the game is won
function wonGame() {
    modalEndDiv.style.display = 'block';
    document.querySelector('#gameMsg').innerText ="Hooray!! You Won!!"
    document.querySelector('.scoreModal').innerHTML = score;
};

//for every step forward the player gets a point & when he wins he gets 10 points added to the score
function updateScore() {
    score++;
    spanScore.innerHTML = score;
};

//all variables are reset
function playAgain() {
    player.goBackToStart();
    lifeCount =3;
    score = 0;
    spanLives.innerHTML = '3 Lives';
    spanScore.innerHTML = '0';

    for (let heartLi of heartsLi) {
        heartLi.firstElementChild.classList.remove('greyheart');
    };

    for(let i = 0; i < selectedPlayer.length; i++){
        selectedPlayer.item(i).classList.remove('playerPicSeleted');
    };
    welcome();
};

//to select a player in the welcome modal
function selectPlayer(selectedImg) {

    for(let i = 0; i < selectedPlayer.length; i++){
        selectedPlayer.item(i).classList.remove('playerPicSeleted');
    }

    switch (selectedImg) {
        case 'charboy':
            playerimg = 'images/char-boy.png';
            document.querySelector('#charboy').classList.add('playerPicSeleted');
            break;
        case 'catgirl':
            playerimg = 'images/char-cat-girl.png';
            document.querySelector('#catgirl').classList.add('playerPicSeleted');
            break;
        case 'horngirl':
            playerimg = 'images/char-horn-girl.png';
            document.querySelector('#horngirl').classList.add('playerPicSeleted');
            break;
        case 'pinkgirl':
            playerimg = 'images/char-pink-girl.png';
            document.querySelector('#pinkgirl').classList.add('playerPicSeleted');
            break;
        case 'princessgirl':
            playerimg = 'images/char-princess-girl.png';
            document.querySelector('#princessgirl').classList.add('playerPicSeleted');
            break;
        default:
            playerimg = 'images/char-boy.png';
            break;
    };
};