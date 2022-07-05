class Endboss extends MovableObject{
    
    height = 450;
    width= 300;
    energy = 200;
    speed = 150 / 144;
    angry = false;
    attack = false;
    walking = false;
    hurt = false;
    dead = false;

    IMAGES_WAITING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        // 'img/4_enemie_boss_chicken/2_alert/G5.png',
        // 'img/4_enemie_boss_chicken/2_alert/G6.png',
        // 'img/4_enemie_boss_chicken/2_alert/G7.png',
        // 'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        // 'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        // 'img/4_enemie_boss_chicken/3_attack/G13.png',
        // 'img/4_enemie_boss_chicken/3_attack/G14.png',
        // 'img/4_enemie_boss_chicken/3_attack/G15.png',
        // 'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    angry_sound = new Audio('./audio/endbossAngry.mp3');
    walking_sound = new Audio('./audio/endbossWalking2.mp3');
    hurt_sound = new Audio('./audio/endbossHurt.mp3');
    attack_sound = new Audio('./audio/endbossAttack.mp3');
    dead_sound = new Audio('./audio/endbossDead.mp3');

    constructor(){
        super().loadImage(this.IMAGES_WAITING[0]);
        this.x = 2250;
        this.y = 460 - this.height;
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        setTimeout(() => {
            this.animate();
        }, 200);        
    }

    animate(){
        setInterval(() => {
            this.endbossPhases();    
        }, 100);
        setInterval( () => {
            if (!world.gameEnd)
                this.endbossAnimation();  
        }, 175);
        setInterval(() => {
            if (this.walking && !this.hurt && !this.dead || 
                this.attack && !this.hurt && !this.dead)
                    this.endbossMoving();                            
        }, 1000/144);
    }

    endbossPhases(){
        if(this.energy <= 0) this.dead = true;
        if (this.x - world.character.x < 700 && !this.angry) 
                world.lifeBarEndboss.height = 60;
        if (this.x - world.character.x < 500 && !this.attack  && !this.walking )
                this.angry = true;
        if (this.energy < 200 && !this.walking && !this.attack){
                this.angry = true;
                this.walking = true;}
        if (this.x - world.character.x < 350 && this.x - world.character.x > 200){
                this.walking = true;
                this.attack = false;} 
        if (this.x - world.character.x < 200){
                this.walking = false;
                this.attack = true;} 
    }

    endbossAnimation(){
        if(this.dead) 
            this.deadAnimation();

        else if(this.hurt)
            this.hurtAnimation();

        else if(this.angry && !this.walking && !this.attack)
            this.alertAnimation();
        
        else if(this.walking)
            this.walkingAnimation();

        else if(this.attack)
            this.attackAnimation();

        else this.playAnimation(this.IMAGES_WAITING);
    }

    deadAnimation(){
        this.playAnimation(this.IMAGES_DEAD);
        this.playDeadSound();
        setTimeout(() => {
            world.gameWin = true;
        }, 500);
    }

    hurtAnimation(){
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSound();
        setTimeout(() => {
            this.hurt = false;
        }, 800);
    }

    alertAnimation(){
        this.playAnimation(this.IMAGES_ALERT);
        this.playAngrySound();
    }

    walkingAnimation(){
        this.playAnimation(this.IMAGES_WALKING);
        this.playWalkingSound();
    }

    attackAnimation(){
        this.playAnimation(this.IMAGES_ATTACK);
        this.playAttackSound();
    }

    playDeadSound(){
        this.walking_sound.pause();
        this.hurt_sound.pause();
        this.attack_sound.pause();
        this.dead_sound.play();
    }

    playHurtSound(){
        this.walking_sound.pause();
        this.attack_sound.pause();
        this.hurt_sound.play();
    }

    playAngrySound(){
        this.angry_sound.play();
    }

    playWalkingSound(){
        this.angry_sound.pause();
        this.walking_sound.play();
    }

    playAttackSound(){
        this.angry_sound.pause();
        this.walking_sound.pause();
        this.attack_sound.play();
    }

    endbossMoving(){
        if(this.x - world.character.x >= 50){                  
            this.moveLeft();
        }
        if(this.x - world.character.x < 10){                   
            this.moveRight();
        }  
    }
}