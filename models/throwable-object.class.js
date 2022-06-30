class ThrowableObject extends MovableObject{
    
    objectMinY = 365;

    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = 100;
        this.y = 100;
        this.height = 60;
        this.width = 40;
        this.throw(x, y);
    }

    throw(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 25;
        this.applyGravity(this.objectMinY);

        setInterval(() => {
            this.x += 2;
        }, 1000 / 144);
    }

}