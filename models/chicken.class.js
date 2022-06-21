class Chicken extends MovableObject{
    height = 60;
    width= 40;
    y = 400;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    // currentImage = 0;    verschoben in MovableObject

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;     // Math.random() gibt eine zufällige Zahl zwischen 0 und 1 aus
        this.y = 420 - this.height      // y-position - Bildhöhe, da von ober gezählt wird
        
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate(){
        setInterval( () => {            //Kurzschreibweise einer Funktion.
            let i = this.currentImage % this.IMAGES_WALKING.length; // Modulo-Funktion = gibt nur den Rest als Wert aus 
            // 0 / 6 = 0 Rest 0, 1 / 6 Rest 1, ..., 7 / 6 Rest 1 also Rest 0, 1, 2, 3, 4, 5, 0, 1, ...

            let path = this.IMAGES_WALKING[i]; // 
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }


}