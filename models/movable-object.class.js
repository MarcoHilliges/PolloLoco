class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    
    speed = 15 / 144; // 15px/s         144 ergibt eine sehr flüssige Bewegung

    otherDirection = false;

    imageCache = {};
    currentImage = 0;
    
    loadImage(path){
        this.img = new Image();         // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;            // path = Pfad
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src =path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right')
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;   // gleich  this.x = this.x - this.speed;
        }, 1000 / 144);  // 144 
    }
}