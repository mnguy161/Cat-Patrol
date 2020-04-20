//rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame){
        super (scene, x, y, texture, frame);

        scene.add.existing(this); //add objects to existing 
        this.isFiring = false; //track rocket's firing status
        this.sfxRocket = scene.sound.add('sfx_rocket'); //add rocket sfx
    }

    update () {
        //left / right movement 
        if(!this.isFiring) {
            if ((keyLEFT.isDown && this.x >= 47)){
                this.x -= 2;
            } else if (keyRIGHT.isDown && this.x <= 578){
                this.x += 2; 
            }
        }

        //mouse controls ()
        if(!this.isFiring) {
            if ((mouseX.x >= 40 && mouseX.x <= 320) && (mouseY.y <= 480 && mouseY.y >= 0) && this.x >= 47){
                this.x -= 2; 
            } else if ((mouseX.x >= 320 && mouseX.x <= 614) && this.x <= 578){
                this.x += 2; 
            }
        }

        //fire button 
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring || mouseClick.isDown){
            this.isFiring = true; 
            this.sfxRocket.play(); //play sfx
        }

        //if fired, move up 
        if (this.isFiring && this.y >= 108) {
            this.y -= 2;
        }

        //reset on miss 
        if (this.y <= 108) {
            this.isFiring = false; 
            this.y = 431; 
        }
    }

    //reset rocket to "ground"
    reset () {
        this.isFiring = false; 
        this.y = 410; 
    }



}