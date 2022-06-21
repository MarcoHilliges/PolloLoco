class Character extends MovableObject{
    width = 120;
    height = 250;
    
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    // currentImage = 0;    verschoben in MovableObject

    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.y = 425 - this.height  // y-position - Bildhöhe, da von ober gezählt wird

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


    jump(){

    }
}