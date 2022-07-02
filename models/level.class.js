class Level {
    enemies;
    clouds;
    air;
    backgroundObjects;
    backgroundThirdLayer;
    backgroundSecondLayer;
    backgroundFirstLayer;
    bottles;
    level_end_x = 2250;


    constructor(enemies, clouds, backgroundObjects, backgroundThirdLayer, backgroundSecondLayer, backgroundFirstLayer, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.backgroundThirdLayer =backgroundThirdLayer;
        this.backgroundSecondLayer = backgroundSecondLayer;
        this.backgroundFirstLayer = backgroundFirstLayer;
        this.bottles = bottles;
    }
}