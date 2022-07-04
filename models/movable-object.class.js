class MovableObject extends DrawableObject{

    energy = 100;

    lastHit = 0;

    speed = 15 / 144; // 15px/s         144 ergibt eine sehr flüssige Bewegung

    otherDirection = false;
   
    speedY = 0;
    acceleration = 2.5;   // Gravitationsbeschleunigung
    objectMinY;

    applyGravity(objectMinY){
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0){   // objectMinY wird benötigt um 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            else{
                this.y = objectMinY;
            }
            

        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < this.objectMinY;
    }

    isColliding(mo){
        return this.x + this.width -23> mo.x &&
        this.y + this.height -35> mo.y &&
        this.x +8 < mo.x &&
        this.y +5 < mo.y + mo.height;
    }

    isCollidingTop(mo){
        return this.x + this.width -15> mo.x &&
        this.y + this.height > mo.y &&
        this.x +15 < mo.x &&
        this.y + this.height -10< mo.y + mo.height*0.9 ;
    }

    hit(demage){
        this.energy -= demage;
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden
        timepassed = timepassed / 1000; // Differenz in Sekunden
        return timepassed < 0.5;
    }

    isDead(){
        return this.energy == 0;
    }



    playAnimation(images){
        // z.B. Walk animation
        let i = this.currentImage % images.length; // Modulo-Funktion = gibt nur den Rest als Wert aus 
        // 0 / 6 = 0 Rest 0, 1 / 6 Rest 1, ..., 7 / 6 Rest 1 also Rest 0, 1, 2, 3, 4, 5, 0, 1, ...
        let path = images[i]; // 
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    randomDirection(){
        if(this.dead == false){
            let number = Math.round(Math.random());

            if(number == 1){this.otherDirection = true;}
            else{this.otherDirection = false;}
        }
    }

    backgroundMovingRight(){
        world.level.backgroundFirstLayer.forEach((background) => {
            background.x += 0;
        });
        world.level.backgroundSecondLayer.forEach((background) => {
            background.x += 0.4;
        });
        world.level.backgroundThirdLayer.forEach((background) => {
            background.x += 1;
        });
        world.level.clouds.forEach((background) => {
            background.x += 1;
        });
    }

    backgroundMovingLeft(){
        world.level.backgroundFirstLayer.forEach((background) => {
            background.x -= 0;
        });
        world.level.backgroundSecondLayer.forEach((background) => {
            background.x -= 0.4;
        });
        world.level.backgroundThirdLayer.forEach((background) => {
            background.x -= 1;
        });
        world.level.clouds.forEach((background) => {
            background.x -= 1;
        });
    }
}