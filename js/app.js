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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(handleInput) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrow) {
    if (arrow === 'up') {
        this.y -= 85.5;
    }
    else if (arrow === 'down') {
        this.y += 85.5;
    }
    else if (arrow === 'left') {
        this.x -= 101;
    }
    else if (arrow === 'right') {
        this.x += 101;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function generateRandomSpeed(min, max) {
    return Math.floor((Math.random() * (500 - 100 + 1)) + 100);
}

// Adds a set of 3 ladybugs on upper , middle and lower Y coordinates. For UX reasons, I think it's important to have the first 3 bugs on those positions as it will give to  player the idea of all scenarios
var ladybug1 = new Enemy(-100, 65, generateRandomSpeed());
var ladybug2 = new Enemy(-100, 145, generateRandomSpeed());
var ladybug3 = new Enemy(-100, 230, generateRandomSpeed());
var allEnemies = [ladybug1, ladybug2, ladybug3];

// After the first 3 are loaded, it pushes new ladybugs having random Y position into the allEnemies array following a certain time interval
function generateRandomYPos() {
    return Math.floor((Math.random() * (230 - 65 + 1)) + 65);
}

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