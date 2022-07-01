class Coin extends MovableObject{

collected = false;
height = 50;
width = 50; 

IMAGES = [
    'img/8_coin/coin_3.png',
    'img/8_coin/coin_4.png'
]

constructor(x,y){
    super().loadImage('img/8_coin/coin_2.png');
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES);
    this.animate();
}

animate(){
    setInterval(() => {
        this.playAnimation(this.IMAGES);
    }, 100);
}

}