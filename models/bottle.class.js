class Bottle extends ThrowableObject{

    constructor(){
        super();
        this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    
        this.x = 200 + Math.random() * 500;     // Math.random() gibt eine zufällige Zahl zwischen 0 und 1 aus
        this.y = 365      // y-position - Bildhöhe, da von ober gezählt wird

        this.height = 60;
        this.width = 40;
    }


}