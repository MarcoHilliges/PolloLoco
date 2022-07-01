class World {
    character = new Character();

    level = level1;

    canvas;     // definiert ein canvas um die Parameter zwischen den Funktionen übergeben zu können. 
    ctx;        //ctx bedeutet Context. let muss innerhalb von class nicht mehr geschrieben werden.
    keyboard;
    camera_x = 0;
    lifeBar = new LifeBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    lifeBarEndboss = new LifeBarEndboss();

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // löscht den Inhalt des Canvas

        this.ctx.translate(this.camera_x, 0);   //verschiebt das zu zeichnende auf der x-Achse

        this.addObjectsToMap(this.level.backgroundObjects);
        
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);  //verschiebt das zu zeichnende zurück
        this.addToMap(this.lifeBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.lifeBarEndboss);
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
        if(mo.otherDirection){  //object spiegeln   https://www.mediaevent.de/javascript/canvas-scale.html
            this.flipImage(mo);
        }
        
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale( -1, 1);
        mo.x = mo.x * -1
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    setWorld(){
        this.character.world = this     // übergibt alle 
        // this.character.keyboard = this.keyboard
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsThrowObjects();
        }, 100);
    }

    checkCollisions(){
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.lifeBar.setPercentage(this.character.energy);
                // console.log('collision with character, energy', this.character.energy);
            }
        })
    }

    checkThrowObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + this.character.width/2  , this.character.y + this.character.width);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisionsThrowObjects(){
        if(this.throwableObjects.length > 0){
            // console.log('Wurf');
            this.throwableObjects.forEach( (bottle) => {
                if(this.level.enemies[0].isColliding(bottle)){
                    this.level.enemies[0].hit();
                    this.lifeBarEndboss.setPercentage(this.level.enemies[0].energy);
                    // console.log('collision with bottle and endboss, energy', this.level.enemies[0].energy);

                    bottle.energy = -100;
                    
                }
                // console.log(bottle);
            })
        }
    }
}