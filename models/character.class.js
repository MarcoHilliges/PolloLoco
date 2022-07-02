class Character extends MovableObject {
    energy = 100;
    width = 120;
    height = 250;
    speed = 200 / 144;  // 150px/s
    timeLastMove = 0;
    timepassedLastMove;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
       'img/2_character_pepe/5_dead/D-51.png',
       'img/2_character_pepe/5_dead/D-52.png',
       'img/2_character_pepe/5_dead/D-53.png',
       'img/2_character_pepe/5_dead/D-54.png',
       'img/2_character_pepe/5_dead/D-55.png',
       'img/2_character_pepe/5_dead/D-56.png',
       'img/2_character_pepe/5_dead/D-57.png'
    ];

    world;
    walking_sound = new Audio('./audio/charakterWalking.mp3')

    // currentImage = 0;    verschoben in MovableObject

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.y = 425  // 425 - this.height y-position - Bildhöhe, da von ober gezählt wird
        this.objectMinY = 425 - this.height;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity(this.objectMinY);
        this.animate();
    }

    animate() {

        setInterval(() => {            //Kurzschreibweise einer Funktion.
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                this.timeLastMove = 0;
            };

            if (this.world.keyboard.LEFT && this.x >= -1315) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
                this.timeLastMove = 0;
            };

            if(this.world.keyboard.SPACE && !this.isAboveGround() ){
                this.jump();
                this.timeLastMove = 0;
            }

            this.world.camera_x = -this.x +120;

        }, 1000 / 144);

        let i = 0;
        
        setInterval(() => {            //Kurzschreibweise einer Funktion.
            if (this.isDead() && i < 5){
                this.playAnimation(this.IMAGES_DEAD);
                i++;
            }
            else if (this.isDead() && i >= 5){
                this.loadImage('img/2_character_pepe/5_dead/D-57.png');
                setTimeout(() => {
                    this.world.gameLose = true;
                    console.log('Lose');
                }, 500);
               
            }

            else if (this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);

            }
            
            else if (this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
            }
            
            else if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT){
                this.calculateIdle();
                if (this.timepassedLastMove > 3){
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                }
                else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }

            else{

                if (this.world.keyboard.RIGHT && this.x >= -1315 && this.x <= this.world.level.level_end_x || 
                    this.world.keyboard.LEFT && this.x >= -1315 && this.x <= this.world.level.level_end_x) {
                    // this.x += this.speed;
                    
                        this.playAnimation(this.IMAGES_WALKING);

                    // // Walk animation
                    // let i = this.currentImage % this.IMAGES_WALKING.length; // Modulo-Funktion = gibt nur den Rest als Wert aus 
                    // // 0 / 6 = 0 Rest 0, 1 / 6 Rest 1, ..., 7 / 6 Rest 1 also Rest 0, 1, 2, 3, 4, 5, 0, 1, ...
                    // let path = this.IMAGES_WALKING[i]; // 
                    // this.img = this.imageCache[path];
                    // this.currentImage++;
                }
            }
        }, 1000 / 7);

    }

    jump() {
        this.speedY = 30;
    }

    calculateIdle() {
        if(this.timeLastMove == 0){
            this.timeLastMove = new Date().getTime(); 
        }
        this.timepassedLastMove = new Date().getTime()-this.timeLastMove;
        this.timepassedLastMove = this.timepassedLastMove / 1000;
        // console.log(this.timeLastMove, this.timepassedLastMove);
    }
}