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
    coins = [];
    throwableObjects = [];
    lifeBarEndboss = new LifeBarEndboss();
    gameWin = false;
    gameLose = false;

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
        this.addObjectsToMap(this.level.backgroundThirdLayer);
        this.addObjectsToMap(this.level.backgroundSecondLayer);
        this.addObjectsToMap(this.level.backgroundFirstLayer);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.level.bottles);
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
            if(!world.gameWin && !world.gameLose){
                self.draw();
            }
            if(world.gameWin){
                document.getElementById('layerGameWin').classList.remove('d-none');
                document.getElementById('gameRestartButton').classList.remove('d-none');
                document.getElementById('gameButtonsLeft').classList.add('d-none');
                document.getElementById('gameButtonsRight').classList.add('d-none');
            };
            if(world.gameLose){
                document.getElementById('layerGameLose').classList.remove('d-none');
                document.getElementById('gameRestartButton').classList.remove('d-none');
                document.getElementById('gameButtonsLeft').classList.add('d-none');
                document.getElementById('gameButtonsRight').classList.add('d-none');
            };
            
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
        // mo.drawFrame(this.ctx);      // add HitBox !!!!

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
                if(enemy.energy>0){
                    this.character.hit(2);
                }
                this.lifeBar.setPercentage(this.character.energy);
                // console.log('collision with character, energy', this.character.energy);
            }
            if(this.character.isCollidingTop(enemy) && !enemy.dead){
                // console.log(enemy.dead);
                enemy.hit(2);
                setTimeout(() => {
                    // console.log(enemy.dead);
                if (enemy.dead){
                    // console.log('coin')
                    let coin = new Coin(enemy.x-30, 100);
                    this.coins.push(coin);
                }
                }, 250);
                // console.log('collision with enemy, energy', enemy.energy);
            }
        })
        this.level.bottles.forEach((bottle) => { //Aufheben generierter Bottles
            if(this.character.isColliding(bottle)){
                this.bottleBar.setPercentage(this.bottleBar.percentage + 5);
                bottle.x = -3000;
                // console.log('collision with bottle');
            }
        });
        this.throwableObjects.forEach((bottle) => { //Aufheben geworfener Bottles
            if(this.character.isColliding(bottle) && bottle.onGround){
                this.bottleBar.setPercentage(this.bottleBar.percentage + 5);
                bottle.x = -3000;
                // console.log('collision with bottle');
            }
        });
        this.coins.forEach((coin) => { //Aufheben von Coins
            if(this.character.isColliding(coin) && !coin.collected){
                this.coinBar.setPercentage(this.coinBar.percentage + 5);
                coin.collected = true;
                coin.x = -3000;
                // console.log('collision with coin');
            }
        });
        
    }

    checkThrowObjects(){    // add Bottle !!!
        if(this.keyboard.D && this.bottleBar.percentage > 0){
            let bottle = new ThrowableObject(this.character.x + this.character.width/2  , this.character.y + this.character.width);
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(this.bottleBar.percentage - 5);
        }
    }

    checkCollisionsThrowObjects(){
        if(this.throwableObjects.length > 0){
            // console.log('Wurf');
            this.throwableObjects.forEach( (bottle) => {
                if(this.level.enemies[0].isColliding(bottle) && !bottle.onGround){
                    this.level.enemies[0].hit(10);
                    this.lifeBarEndboss.setPercentage(this.level.enemies[0].energy);
                    this.level.enemies[0].hurt = true;
                    // console.log('collision with bottle and endboss, energy', this.level.enemies[0].energy);

                    bottle.energy = -100;
                    
                }
                // console.log(bottle);
            })
        }
    }
}