class Endboss extends MovableObject{
    
    height = 450;
    width= 300;
    
    IMAGES_WAITING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_WAITING[0]);

        this.x = 200 + Math.random() * 500;     // Math.random() gibt eine zufällige Zahl zwischen 0 und 1 aus
        this.y = 460 - this.height      // y-position - Bildhöhe, da von ober gezählt wird
        
        this.speed = 0.05 + Math.random() * 0.15;   // min. 0.05 + max. 0.15 = max.randomSpeed 0.2

        this.loadImages(this.IMAGES_WAITING);
        this.animate();
    }

    animate(){

        setInterval( () => {            //Kurzschreibweise einer Funktion.
            this.playAnimation(this.IMAGES_WAITING);
            
        }, 250);
    }
}