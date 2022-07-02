class Cloud extends MovableObject{
    y = 50;
    width = 500;
    height = 250;


    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = -1100 + Math.random() * 3300;
        this.speed = 0.05 + Math.random() * 0.1;

        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();

            if(this.x <= -1900){this.x = 3000;}
        }, 1000 / 144);  // 144 
        
    }

 
}