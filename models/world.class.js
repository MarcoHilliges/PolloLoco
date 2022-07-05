class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
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
    gameEnd = false;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.movableContent();
        
        this.ctx.translate(-this.camera_x, 0);
        this.fixContent();

        let self = this;

        requestAnimationFrame(function(){
            world.selfDrawOrGameEnd(self);
            
            
        });
    }

    movableContent(){
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
    }

    fixContent(){
        this.addToMap(this.lifeBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.lifeBarEndboss);
    }

    selfDrawOrGameEnd(self){
        if(!world.gameWin && !world.gameLose) self.draw();
        if(world.gameWin){
            world.gameEnd = true;     
            document.getElementById('layerGameWin').classList.remove('d-none');
            this.showRestartButton();
        };
        if(world.gameLose){
            world.gameEnd = true;  
            document.getElementById('layerGameLose').classList.remove('d-none');
            this.showRestartButton();
        };
    }

    showRestartButton(){
        document.getElementById('gameRestartButton').classList.remove('d-none');
        document.getElementById('gameButtonsLeft').classList.add('d-none');
        document.getElementById('gameButtonsRight').classList.add('d-none');
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){
        if(mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);      // add HitBox !!!!
        if(mo.otherDirection) this.flipImageBack(mo);
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
        this.character.world = this
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
            this.directHittingWithEnemy(enemy);            
        })
        this.level.bottles.forEach((bottle) => { //Picking up generated bottles
            this.pickingUpBottles(bottle);    
        });
        this.throwableObjects.forEach((bottle) => { //Picking up throwed bottles
            if(bottle.onGround) this.pickingUpBottles(bottle);
        });
        this.coins.forEach((coin) => { //Picking up Coins
            this.pickingUpCoins(coin);    
        });   
    }

    checkThrowObjects(){    // throw Bottle
        if(this.keyboard.D && this.bottleBar.percentage > 0){
            let bottle = new ThrowableObject(this.character.x + this.character.width/2  , this.character.y + this.character.width);
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(this.bottleBar.percentage - 5);
        }
    }

    checkCollisionsThrowObjects(){
        if(this.throwableObjects.length > 0){
            this.throwableObjects.forEach( (bottle) => {
                if(this.level.enemies[0].isColliding(bottle) && !bottle.onGround){
                    this.level.enemies[0].hit(10);
                    this.lifeBarEndboss.setPercentage(this.level.enemies[0].energy);
                    this.level.enemies[0].hurt = true;
                    bottle.energy = -100;                    
                }
            })
        }
    }

    directHittingWithEnemy(enemy){
        if(this.character.isColliding(enemy)) 
                this.enemyHittingCharacter(enemy);
        if(this.character.isCollidingTop(enemy) && !enemy.dead)
                this.characterHittingEnemy(enemy);
    }

    enemyHittingCharacter(enemy){
        if(enemy.energy>0) this.character.hit(2);
        this.lifeBar.setPercentage(this.character.energy);
    }

    characterHittingEnemy(enemy){
        enemy.hit(2);
        setTimeout(() => {
            if (enemy.dead) this.dropCoin(enemy);
        }, 250); 
    }

    dropCoin(enemy){
        let coin = new Coin(enemy.x-30, 100);
        this.coins.push(coin);
    }

    pickingUpBottles(bottle){
        if(this.character.isColliding(bottle)){
            this.bottleBar.setPercentage(this.bottleBar.percentage + 5);
            bottle.x = -3000;
            bottle.bottle_pull.play();
        }
    }

    pickingUpCoins(coin){
        if(this.character.isColliding(coin) && !coin.collected){
            this.coinBar.setPercentage(this.coinBar.percentage + 5);
            coin.collected = true;
            coin.x = -3000;
            coin.coin_sound.play();
        }
    }
}