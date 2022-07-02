class Chicken_mini extends MovableObject{
    height = 40;
    width= 30;
    y = 400;
    energy = 2;
    dead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    // currentImage = 0;    verschoben in MovableObject

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = -1200 + Math.random() * 3400;     // Math.random() gibt eine zufällige Zahl zwischen 0 und 1 aus
        this.y = 420 - this.height      // y-position - Bildhöhe, da von ober gezählt wird
        
        this.speed = 0.05 + Math.random() * 0.15;   // min. 0.05 + max. 0.15 = max.randomSpeed 0.2

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate(){
        setInterval(() => {
            if(this.energy <= 0){
                this.dead = true;
            }
        }, 1000/144);

        setInterval(() => {
            if(!this.dead){
                this.moveLeft();
            }
            
        }, 1000 / 144);  // 144 


        setInterval( () => {            //Kurzschreibweise einer Funktion.
            if(this.dead){
                this.playAnimation(this.IMAGES_DEAD);
            }
            else{
                this.playAnimation(this.IMAGES_WALKING);
                // let i = this.currentImage % this.IMAGES_WALKING.length; // Modulo-Funktion = gibt nur den Rest als Wert aus 
                // // 0 / 6 = 0 Rest 0, 1 / 6 Rest 1, ..., 7 / 6 Rest 1 also Rest 0, 1, 2, 3, 4, 5, 0, 1, ...
    
                // let path = this.IMAGES_WALKING[i]; // 
                // this.img = this.imageCache[path];
                // this.currentImage++;
            }
            
        }, 100);
    }


}