# Classic Arcade Game Clone Project
Memory Game is a complete browser-based card matching game.

## Table of Contents

* [Game Rules](#game-rules)
* [Technical](#technical)
* [Credits](#credits)
* [Additional Functionality](#additional-functionality) 
* [Tools Used](#tools-used)

## Game Rules

* In this game you have a Player and Enemies (bugs). 
* The goal of the player is to reach the water, without colliding into any one of the enemies.
* The player can move left, right, up and down.
* The enemies move at varying speeds on the paved block portion of the game board
* Once a the player collides with an enemy, the game is reset and the player moves back to the starting square
* Once the player reaches the water (i.e., the top of the game board), the game is won


## Technical

This project consists of the following assets:

* **index.html**  - contains the game's html structure.
* **style.css** - contains the game's board styling.
* **app.js** - contains most of the player & enemy actions & logic.


## Additional Functionality

* Player selection: allow the user to select the image for the player character before starting the game. You can use the different character images provided in the images folder (we’ll get to that below)
* Score: you can implement a score for the game. For example, the score can increase each time the player reaches the water, and it can be reset to 0 when collision occurs (or it can be reduced)

## Credits

* **engine.js** - HTML canvas & game engine provide by udacity as part of the starter code.
* **resources.js** - images are rendereded from a cache, provided by Udacity as part of the starter code. 

## Tools Used

* [Fontawesome](http://fontawesome.io/icons/) was used to display the life-counter heart icons.
