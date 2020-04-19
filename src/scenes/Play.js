class Play extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    create () {

        //place tile sprite 
        
        this.starry = this.add.tileSprite(0, 50, 640, 480, 'stars').setOrigin(0,0);
        this.starfield = this.add.tileSprite(0, 50, 640, 480, 'sparkles').setOrigin(0,0);

        //green rectangle borders 
        this.add.rectangle(5, 5, 630, 32, 0xdaf598).setOrigin(0,0);
        this.add.rectangle(5, 443, 630, 32, 0xdaf598).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, 455, 0xdaf598).setOrigin(0,0);
        this.add.rectangle(603, 5, 32, 455, 0xdaf598).setOrigin(0,0);

        //yelow UI background
        this.add.rectangle(37, 42, 566, 70, 0xFFE280).setOrigin(0,0);

        //rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setScale(0.5,0.5).setOrigin(0,0);

        //spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'cat_alien3', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'floaty_catalien', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'cat_alien2', 0, 10).setOrigin(0,0);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //mouse input
        mouseClick = this.input.mousePointer; 
        
        //animation config
        //ADD THE ANIMATIONS HERE
        this.anims.create ({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //add timer 
        this.timerTesting = 0; 
        let testConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5, 
            },
            fixedWidth: 0,
        }
        this.timerText = this.add.text(305, 55, this.timerTesting, testConfig); 

        //score
        this.p1Score = 0; 
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5, 
                    bottom: 5, 
                },
                fixedWidth: 100
            }
            this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig).setOrigin(0,0);

        let highScore = 0; 
        this.current = 0; 
            let highestConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5, 
                    bottom: 5, 
                },
                fixedWidth: 100
            }
            this.highest = this.add.text(50, 100, highScore, highestConfig).setOrigin(0,0);

        //game over flag
        this.gameOver = false; 

        //60 second play clock
        scoreConfig.fixedWidth = 0; 
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update () {

        this.remainingTime(); 

        this.starry.tilePositionX -= 3;
        this.starfield.tilePositionX -= 5;
        
        //check key input for restart 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
            game.settings.spaceshipSpeed = 3; 
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        if (!this.gameOver){
            this.p1Rocket.update();     //update rocket sprite
            this.ship01.update();       //update spaceships (x3)
            this.ship02.update();
            this.ship03.update(); 
        }

        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();  
            this.shipExplode(this.ship03);  
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();             
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset(); 
            this.shipExplode(this.ship01);
        }
    }

    checkCollision (rocket, ship){
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true; 
            } else {
                return false; 
            }
    }

    shipExplode (ship, testTimer) {

        ship.alpha = 0; // temporarily hide ship 
        //create explosion sprite at ship's position 
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);    
        boom.anims.play('explode');     //plays explode animation 
        boom.on('animationcomplete', () => {    //callback after animation completes
            ship.reset();   //reset ship position 
            ship.alpha = 1;     //make ship visible
            boom.destroy ();    // remove explosion sprite 
        });

        //score increment and repaint
        this.p1Score += ship.points; 
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion');
    }

    //CHANGE PLACEHOLDER NAMES! 
    //Reference used for the Timer: https://labs.phaser.io/edit.html?src=src/time\timer%20event.js
    //The reference provided a good starting point for both the timer and the text; it was a good starting point of reference for understandnig
    //how to call and set up the Clock 
    remainingTime (time) {
        let timeSeconds = this.clock.getElapsedSeconds(); 
        
        //decreasing timer 
        let timeSecondsElapsed = ((game.settings.gameTimer) * 0.001); 
        let testTimer = (Math.floor(timeSecondsElapsed - timeSeconds));
        this.timerText.text = ("Time remaining " + testTimer);

        console.log(testTimer);

        if (testTimer == 40){
            game.settings.spaceshipSpeed = 7; 
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.testTimer + 3; 
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.testTimer + 3; 
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.testTimer + 3; 
        }

    }

    preload () {
        //load images / tile sprites
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('cat_alien2','./assets/cat_alien2.png');
        this.load.image('cat_alien3','./assets/cat_alien3.png');
        this.load.image('stars_test','./assets/stars_test.png');
        this.load.image('stars','./assets/stars.png');
        this.load.image('sparkles','./assets/sparkles.png');
        this.load.image('floaty_catalien','./assets/floaty_catalien.png');

        //load spritesheet
        this.load.spritesheet('explosion','./assets/explosion.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
    }
}