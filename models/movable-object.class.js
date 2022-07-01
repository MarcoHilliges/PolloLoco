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
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

    hit(){
        this.energy -= 2;
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden
        timepassed = timepassed / 1000; // Differenz in Sekunden
        return timepassed < 1;
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

    
}