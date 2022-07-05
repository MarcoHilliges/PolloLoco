class Character extends MovableObject {
    world;
    energy = 100;
    width = 120;
    height = 250;
    speed = 200 / 144;  // 150px/s
    timeLastMove = 0;
    timepassedLastMove;
    characterMinX = -1315;

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
    //    'img/2_character_pepe/5_dead/D-57.png'
    ];
    
    walking_sound = new Audio('./audio/charakterWalking.mp3');
    hurt_sound = new Audio('./audio/charakterHurt.mp3');
    longIdle_sound = new Audio ('./audio/charakterLongIdle.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.y = 425
        this.objectMinY = 425 - this.height;
        this.x = -1300;
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
        setInterval(() => {
            if (!world.gameEnd){
                this.walking_sound.pause();
                this.characterMoving();
                this.world.camera_x = -this.x +120;
            }
        }, 1000 / 144);

        setInterval(() => {
            if (!world.gameEnd)
             this.characterAnimation();    
        }, 1000 / 7);
    }

    characterMoving(){
        if (this.world.keyboard.RIGHT && 
            this.x <= this.world.level.level_end_x)
                this.characterMovingRight();
        if (this.world.keyboard.LEFT && 
            this.x >= this.characterMinX)
                this.characterMovingLeft();
        if (this.world.keyboard.SPACE && 
            !this.isAboveGround()){
                this.jump();
                this.timeLastMove = 0;
        }
    }

    characterMovingRight(){
        this.moveRight();
        this.otherDirection = false;
        this.backgroundMovingRight();
    }

    characterMovingLeft(){
        this.moveLeft();
        this.otherDirection = true;
        this.backgroundMovingLeft();
    }

    characterAnimation(){
        if (this.isDead())
            this.deadAnimation();
        else if (this.isHurt())
            this.hurtAnimation();
        else if (this.isAboveGround())
            this.jumpAnimation();
        else if (this.world.keyboard.RIGHT &&
                 this.x >= this.characterMinX && 
                 this.x <= this.world.level.level_end_x || 
                 this.world.keyboard.LEFT && 
                 this.x >= this.characterMinX && 
                 this.x <= this.world.level.level_end_x)
                    this.walkingAnimation();
        else this.idleAnimation();
    }

    deadAnimation(){
        this.longIdle_sound.pause();
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.world.gameLose = true;
        }, 1000/7*3);
    }

    hurtAnimation(){
        this.longIdle_sound.pause();
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_sound.play();
    }

    jumpAnimation(){
        this.longIdle_sound.pause();
        this.playAnimation(this.IMAGES_JUMPING);
    }

    walkingAnimation(){
        this.longIdle_sound.pause();
        this.playAnimation(this.IMAGES_WALKING);
        this.walking_sound.play();
        this.walking_sound.volume = 0.5;
        this.timeLastMove = 0;
    }

    idleAnimation(){
        this.calculateIdle();
        if (this.timepassedLastMove > 3){
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.longIdle_sound.play();
        }
        else this.playAnimation(this.IMAGES_IDLE);
    }

    jump() {
        this.speedY = 30;
    }

    calculateIdle() {
        if(this.timeLastMove == 0) this.timeLastMove = new Date().getTime();
        this.timepassedLastMove = new Date().getTime()-this.timeLastMove;
        this.timepassedLastMove = this.timepassedLastMove / 1000;
    }
}