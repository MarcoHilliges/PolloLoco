class Character extends MovableObject {
    width = 120;
    height = 250;
    speed = 150 / 144;  // 150px/s
    

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    world; // vielleicht eher keyboard;
    walking_sound = new Audio('./audio/charakterWalking.mp3')

    // currentImage = 0;    verschoben in MovableObject

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.y = 80  // 425 - this.height y-position - Bildhöhe, da von ober gezählt wird
        this.objectMinY = 425 - this.height;
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity(this.objectMinY);
        this.animate();
    }

    animate() {

        setInterval(() => {            //Kurzschreibweise einer Funktion.
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            };

            if (this.world.keyboard.LEFT && this.x >= -1315) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            };

            this.world.camera_x = -this.x +120;

        }, 1000 / 144);

        setInterval(() => {            //Kurzschreibweise einer Funktion.
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
        }, 1000 / 10);


    }





    jump() {

    }
}