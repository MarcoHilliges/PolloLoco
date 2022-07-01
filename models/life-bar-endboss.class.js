class LifeBarEndboss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    percentage = 10;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 520;
        this.y = 0;
        this.width = 180;
        this.height = 0;
        this.setPercentage(200);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 200) {
            return 5;
        }
        else if (this.percentage >= 160) {
            return 4;
        }
        else if (this.percentage >= 120) {
            return 3;
        }
        else if (this.percentage >= 80) {
            return 2;
        }
        else if (this.percentage >= 40) {
            return 1;
        }
        else {
            return 0;
        }
    }

}