class LifeBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 0;
        this.width = 120;
        this.height = 40;
        this.setPercentage(100);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }
        else if (this.percentage >=80){
            return 4;
        }
        else if (this.percentage >=60){
            return 3;
        }
        else if (this.percentage >=40){
            return 2;
        }
        else if (this.percentage >=20){
            return 1;
        }
        else{
            return 0;
        }
    }
}