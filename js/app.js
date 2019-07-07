// // Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
class GameObj{
    constructor(x=0,y=0,speed=0,sprite){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = sprite;
    }

    update(){}

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends GameObj{

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x,y,speed,sprite='images/enemy-bug.png'){
        super(x,y,speed,sprite);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        super.update();
        this.x += this.speed * dt;

        if(this.x > 500){
            this.x = -100;
            this.speed = randomSpeed();
        }

        if (player.x < this.x + 60 &&
            player.x + 37 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
            player.x = 200;
            player.y = 380;
        }
    }
    
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends GameObj{

    constructor(x,y,speed,sprite='images/char-boy.png') {
        super(x,y,speed,sprite);
    }
    
    update(){
        super.update();
            // Prevent player from moving beyond canvas wall boundaries
        if (this.y > 380) {
            this.y = 380;
        }

        if (this.x > 400) {
            this.x = 400;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        // Check for player reaching top of canvas and winning the game
        if (this.y < 0) {
            this.x = 200;
            this.y = 380;
        }
    }

    handleInput(keyPress){
        switch (keyPress) {
            case 'left':
                this.x -= this.speed + 50;
                break;
            case 'up':
                this.y -= this.speed + 30;
                break;
            case 'right':
                this.x += this.speed + 50;
                break;
            case 'down':
                this.y += this.speed + 30;
                break;
    }
    }
}

const randomSpeed = ()=>{
    return 100 + Math.floor(Math.random() * 512);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0,60,randomSpeed()),new Enemy(0,140,randomSpeed()),new Enemy(0,220,randomSpeed())];


// Place the player object in a variable called player
let player = new Player(200,380,50);


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
