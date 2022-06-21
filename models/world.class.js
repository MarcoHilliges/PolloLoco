class World {
    character = new Character();

    enemies = [
        new Chicken,
        new Chicken,
        new Chicken,
    ];

    clouds = [
        new Cloud()
    ];

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0)
    ];

    canvas;     // definiert ein canvas um die Parameter zwischen den Funktionen übergeben zu können. 
    ctx;        //ctx bedeutet Context. let muss innerhalb von class nicht mehr geschrieben werden.

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // löscht den Inhalt des Canvas

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        let self = this;
        // console.log(self);
        // debugger;
        requestAnimationFrame(function(){  // aktualliert sooft der Browser zulässt und pausiert wenn der Tab gewächselt wird
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
            // this.enemies.forEach(enemy => { 
            //     this.addToMap(enemy);
            //     // this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
            // });
        });
    }

    addToMap(mo){       // mo = movable Object
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);  // welche Datei, X-Position, Y-Position, Breite, Höhe
    }
}