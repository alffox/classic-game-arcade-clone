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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrow) {
    switch(arrow) {
        case 'up':
        this.y -= 85.5;
        break;
        case 'down':
        this.y += 85.5;
        break;
        case 'left':
        this.x -= 101;
        break;
        case 'right':
        this.x += 101;
        break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Adds ladybugs on upper, middle and lower rows of bricks
var allEnemies = [];
var enemiesYPos = [230,145,65];

// Gives random speeds to ladybugs
function generateRandomSpeed() {
    return Math.floor((Math.random() * (500 - 100 + 1)) + 100);
}

// Places bugs on random rows of bricks among top, middle and bottom
function generateRandomYPos() {
    return enemiesYPos[Math.floor(Math.random() * enemiesYPos.length)];
}

// Populates the allEnemies array with new ladybugs having random Y position among the enemiesYPos array following a certain time interval
setInterval(function(){
    var newladybug = new Enemy(-100, generateRandomYPos(), generateRandomSpeed());
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