let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480,
    //backgroundColor: 'rgba(209,239,234)', //reference used: https://phaser.io/examples/v2/display/game-background-color 
    scene: [ Menu, Play ], 
};

let game = new Phaser.Game(config); 

//define game settings 
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT;
let mouseClick; 
let highScore = 0;  

