class Chicken extends MovableObject{
    height = 60;
    width= 40;
    y = 400;
    energy = 2;
    dead = false;
    otherDirection = false;

    characterDistance;
    soundvolume = 1;
    dead_sound_played = false;

    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    walking_sound = new Audio('./audio/chickenWalk.mp3');
    dead_sound = new Audio('./audio/chickenDead.mp3');


    // currentImage = 0;    verschoben in MovableObject

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = -1100 + Math.random() * 3300;     // Math.random() gibt eine zufällige Zahl zwischen 0 und 1 aus
        this.y = 420 - this.height      // y-position - Bildhöhe, da von ober gezählt wird
        
        this.speed = 0.05 + Math.random() * 0.6;   // min. 0.05 + max. 0.15 = max.randomSpeed 0.2

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.randomDirection();
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.randomDirection();
        }, 5000);

        setInterval(() => {
            if(this.energy <= 0){this.dead = true;}

            if(this.x <= -1200){this.otherDirection = true;}

            if(this.x >= 3400){this.otherDirection = false;}

            if(!this.dead){
                if (this.otherDirection){this.moveRight();}
                else {this.moveLeft();}
            }

        }, 1000 / 144);  // 144 


        setInterval( () => {            //Kurzschreibweise einer Funktion.
            if(this.dead){
                this.playAnimation(this.IMAGES_DEAD);
                if(!this.dead_sound_played){
                    this.walking_sound.pause();
                    this.dead_sound.play();
                    this.dead_sound_played = true;
                }
            }
            else{
                this.playAnimation(this.IMAGES_WALKING);

                this.characterDistance = this.x - world.character.x;
                
                if (this.characterDistance <=700 && this.characterDistance >=-700 ){
                    this.soundvolume = this.characterDistance / 700;
                    // console.log(1-this.soundvolume);
                    this.walking_sound.play();
                    this.walking_sound.volume = 1- this.soundvolume;
                }else{
                    this.walking_sound.pause();
                }
                
                // this.walking_sound.volume = 0.1;

                // let i = this.currentImage % this.IMAGES_WALKING.length; // Modulo-Funktion = gibt nur den Rest als Wert aus 
                // // 0 / 6 = 0 Rest 0, 1 / 6 Rest 1, ..., 7 / 6 Rest 1 also Rest 0, 1, 2, 3, 4, 5, 0, 1, ...
    
                // let path = this.IMAGES_WALKING[i]; // 
                // this.img = this.imageCache[path];
                // this.currentImage++;
            }
            
        }, 100);
    }


}