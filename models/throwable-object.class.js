class ThrowableObject extends MovableObject{
    
    objectMinY = 365;

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_ON_GROUND);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = 100;
        this.y = 100;
        this.height = 60;
        this.width = 40;
        this.throw(x, y);
        this.animate();
    }

    animate(){
        setInterval(() => {
            if(this.energy <= 0){
                this.playAnimation(this.IMAGES_SPLASH);
                this.acceleration = 0;
                this.speedY = 0;
                
                
                setTimeout(() => {
                    this.x = -2000;
                    this.height = 0;
                }, 150);
                
            }

            else if(this.y!==this.objectMinY){
                this.playAnimation(this.IMAGES_THROW);
            }
            else if(this.y==this.objectMinY){
                this.playAnimation(this.IMAGES_ON_GROUND);
            }
        }, 100);
    }
    

    throw(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 25;
        this.applyGravity(this.objectMinY);

        setInterval(() => {           
            if(this.y!==this.objectMinY || this.y > this.objectMinY){
                this.x += 2.5;
            }
        }, 1000 / 144);
    }

    // clearInterval(throw())
}