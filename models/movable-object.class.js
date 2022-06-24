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

    playAnimation(images){
        // z.B. Walk animation
        let i = this.currentImage % images.length; // Modulo-Funktion = gibt nur den Rest als Wert aus 
        // 0 / 6 = 0 Rest 0, 1 / 6 Rest 1, ..., 7 / 6 Rest 1 also Rest 0, 1, 2, 3, 4, 5, 0, 1, ...
        let path = images[i]; // 
        this.img = this.imageCache[path];
        this.currentImage++;
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