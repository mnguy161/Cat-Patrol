class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene");
    }

    preload () {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('cat_alien2-export','./assets/cat_alien2-export.png');
    }

    create () {

        backgroundColor: 'rgba(209,239,234)';

        this.add.rectangle(5, 5, 630, 470, 0xdaf598).setOrigin(0,0);

        //menu display
            let menuConfig = {
                fontFamily: 'Courier',
                fontSize: '24px',
                //backgroundColor: '#ffe280',
                //color: '#843605',
                color: '#000',
                align: 'center',
                wordWrap: {
                    width: 490
                },
                padding: {
                    top: 5, 
                    bottom: 5, 
                    left: 5, 
                    right: 5
                },
                fixedWidth: 0
            }

            let menuConfig2 = {
                fontFamily: 'Courier',
                fontSize: '36px',
                color: '#000',
                align: 'center',
                wordWrap: {
                    width: 490
                },
                padding: {
                    top: 5, 
                    bottom: 5, 
                    left: 5, 
                    right: 5
                },
                fixedWidth: 0
            }

        // show menu text
        let centerX = game.config.width/2; 
        let centerY = game.config.height/2; 
        let textSpacer = 64; 
        
        let text = "'Use <--> arrows to move & (F) to Fire. For mouse controls: move the mouse LEFT or RIGHT to control the spaceship. Click to Fire.'";
        //let mouseControls = "For mouse controls: move the mouse LEFT or RIGHT to control the spaceship. Click to Fire."

        this.add.text(centerX, 80, 'CAT PATROL', menuConfig2).setOrigin(0.5);
        this.add.text(centerX, 200, text, menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#daf598';
        menuConfig.color = '#000';
        this.add.text(centerX, 320, 'Press <- for Easy or -> for Hard', menuConfig).setOrigin(0.5);

        //cat image
        //this.img = this.add.image(100,100, 'cat_alien2').setOrigin(0,0);
        this.cat = this.add.image(260, 350, 'cat_alien2-export').setOrigin(0,0);
        
        //defining keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update () {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3, 
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 4, 
                gameTimer: 45000   
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }

}