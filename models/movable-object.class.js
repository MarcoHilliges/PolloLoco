class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;


    loadImage(path){
        this.img = new Image();         // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;            // path = Pfad
    }

    moveRight() {
        console.log('Moving right')
    }

    moveLeft(){
        
    }
}