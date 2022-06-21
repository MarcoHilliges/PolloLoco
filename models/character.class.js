class Character extends MovableObject{
    width = 120;
    height = 250;
    

    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.y = 425 - this.height  // y-position - Bildhöhe, da von ober gezählt wird
    }

    jump(){

    }
}