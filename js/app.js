  "use strict";
  let score = 0,
    high = 0;
  // Declaring scoreDOM, HighscoreDOM and body
  var scoreBoard = document.querySelector("#score");
  var highBoard = document.querySelector("#high");
  var body = document.querySelector("#body");

  // Enemies our player must avoid
  var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
    // Enemy position changes in x direction only. So we need to modify the x value only.
    // The enemy moves in x direction using his speed so we change the x-position using speed.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
      this.x = 0;
      this.speed = 100 + Math.floor(Math.random() * 500);
    }
    // If enemy touches the player he will die and reborn from the starting position.
    if (player.x < this.x + 60 && player.x + 60 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
      player.x = 200;
      player.y = 400;

      // Implementing high score based on score
      if (score > high) {
        high = score;
        highBoard.innerHTML = score;
      }
      score = 0;
      scoreBoard.innerHTML = score;
      body.classList.remove("black");
    }
  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Craeting an array for storing all the enemy elemnts.
  var allEnemies = [];

  // Getting 3 enemies in 3 different positions on Y direction
  var enemyPositions = [60, 145, 230];
  enemyPositions.map((directionY) => {
    var enemy = new Enemy(0, directionY, 200);
    allEnemies.push(enemy);
  })
  // Player code
  // Creating own Player class
  class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.sprite = 'images/char-boy.png';
    }
  }

  // Creating a player object with canvas positions
  var player = new Player(200, 400);

  // Updating pla1yer with his position
  Player.prototype.update = function(dt) {

  }

  // Getting player on the canvas board using render method
  Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Positioning player based on input given by the user.
  Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey) {
      // If left key was pressed then the below code will executes, changes the position of player in left-x direction.
      case 'left':
        {
          this.x = this.x - 100;
          break;
        }

        // If right key was pressed then the below code will executes, changes the position of player in right-x direction.
      case 'right':
        {
          this.x = this.x + 100;
          break;
        }

        //If up key was pressed then the below code will executes, changes the position of player in up-y direction.
      case 'up':
        {
          this.y = this.y - 83;
          break;
        }

        // If down key was pressed then the below code will executes, changes the position of player in down-y direction.
      case 'down':
        {
          this.y = this.y + 83;
          break;
        }
    }
    // Stop the player to play on off canvas
    // in horizontal left
    if (this.x < 0) {
      this.x = 0;
    }

    // in horizontal right
    if (this.x > 400) {
      this.x = 400;
    }

    // In vertical bottom
    if (this.y > 400) {
      this.y = 400;
    }
    if (this.y < 60) {

      // Increasing score
      score = score + 1;
      scoreBoard.innerHTML = score;
      if (score === 5) {
        body.classList.add("black");
      }
      setTimeout(() => {
        this.x = 200;
        this.y = 400;
      }, 100);

    }
  }
  document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });
