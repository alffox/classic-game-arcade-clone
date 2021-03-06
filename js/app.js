var isGameOver = false; // Variable used to prevent player from moving after winning or hitting bugs

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    this.checkCollisions(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollisions = function(player) {
    if (player.x < this.x + 67 &&
        player.x + 33 > this.x &&
        player.y < this.y + 33 &&
        33 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrow) {
    if (isGameOver != true) { // Only move player when the game is not over
        switch (arrow) {
            case 'up':
                this.y -= 83;
                break;
            case 'down':
                this.y += 83;
                break;
            case 'left':
                this.x -= 101;
                break;
            case 'right':
                this.x += 101;
                break;
        }
    }

    // Prevents player from going out of bounds. Conditionals below have this order: top-bottom-left-rigth
    if (this.y < -35) {
        this.y = -35;
    }
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x < -102.99) {
        this.x = -2;
    }
    if (this.x > 502.99) {
        this.x = 402;
    }
    if (this.y < -34) { // The player reaches the water and wins the game, success function is called
        isGameOver = true;
        triggerSuccess();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Adds ladybugs on upper, middle and lower "corridors". In-between corridors are not used on purpose, this helps to deliver an easily playable game
var allEnemies = [];
var enemiesYPos = [230, 145, 65];

// Assigns random speeds to ladybugs
function generateRandomSpeed() {
    return Math.floor((Math.random() * (500 - 100 + 1)) + 100);
}

// Places bugs on random corridors among top, middle and bottom ones
function generateRandomYPos() {
    return enemiesYPos[Math.floor(Math.random() * enemiesYPos.length)];
}

// Populates the allEnemies array with new ladybugs having random Y position among the enemiesYPos array, following a 1 second time interval
setInterval(function() {
    var newladybug = new Enemy(-103, generateRandomYPos(), generateRandomSpeed());
    allEnemies.push(newladybug);
}, 1000);

var player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Success Modal
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
const replay = document.getElementsByClassName('play-again')[0];

// Opens the modal
function triggerSuccess() {
    modal.style.display = 'block';
}
// Closes the Modal
span.onclick = function() {
    modal.style.display = 'none';
}
// Restarts game upon pressing button
replay.onclick = function() {
    location.reload();
}

// Closes modal on blur (when the user clicks anywhere outside of it)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}