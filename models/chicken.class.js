class Chicken extends MovableObject{
    height = 60;
    width= 40;
    y = 400;
    energy = 2;
    dead = false;
    otherDirection = false;

    characterDistance;
    maximumHearing = 700;
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

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = -1100 + Math.random() * 3300;
        this.y = 420 - this.height;
        this.speed = 0.05 + Math.random() * 0.6;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.randomDirection();
        this.animate();
    }

    animate(){
        setInterval(() => {
            if (!world.gameEnd)
                this.randomDirection();    
        }, 5000);

        setInterval(() => {
            if (!world.gameEnd)
                this.chickenMoving();
        }, 1000 / 144);

        setInterval( () => {
            if (!world.gameEnd)
                this.chickenAnimation();
        }, 100);
    }

    chickenMoving(){
        if(this.energy <= 0) this.dead = true;
        if(this.x <= -1200) this.otherDirection = true;
        if(this.x >= 3400) this.otherDirection = false;
        if(!this.dead){
            if (this.otherDirection) this.moveRight();
            else this.moveLeft();
        }
    }

    chickenAnimation(){
        if(this.dead){
            this.playAnimation(this.IMAGES_DEAD);
            if(!this.dead_sound_played) this.playDeadSound();
        }
        else{
            this.playAnimation(this.IMAGES_WALKING);
            this.playWalkingSound();    
        }  
    }

    playDeadSound(){
        this.walking_sound.pause();
        this.dead_sound.play();
        this.dead_sound_played = true;
    }

    playWalkingSound(){
        this.characterDistance = this.x - world.character.x;
        if (this.characterDistance <= this.maximumHearing &&
            this.characterDistance >= -this.maximumHearing){
                this.soundvolume = Math.abs(this.characterDistance / this.maximumHearing);
                this.walking_sound.play();
                this.walking_sound.volume = 1- this.soundvolume;
        }
        else this.walking_sound.pause();
    }
}