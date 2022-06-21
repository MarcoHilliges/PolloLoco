class Chicken extends MovableObject{
    height = 60;
    width= 40;
    y = 400;

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;     // Math.random() gibt eine zufällige Zahl zwischen 0 und 1 aus
        this.y = 420 - this.height      // y-position - Bildhöhe, da von ober gezählt wird
    
    }


}