class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;

    x = 120;
    y = 280;

    height = 150;
    width = 100;

    loadImage(path){
        this.img = new Image();         // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;            // path = Pfad
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  // welche Datei, X-Position, Y-Position, Breite, Höhe
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coin){        
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src =path;
            this.imageCache[path] = img;
        });
    }
}