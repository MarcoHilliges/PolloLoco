class Cloud extends MovableObject{
    y = 50;
    width = 500;
    height = 250;
    x;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;     // Math.random() gibt eine zufällige Zahl zwischen 0 und 1 aus
        
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= 0.1;
        }, 1000 / 144);
        
    }
}