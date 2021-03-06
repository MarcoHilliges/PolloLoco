let level1;

function loadAnimies(){
    level1 = new Level(
        [
            new Endboss(),
            new Chicken_mini(),
            new Chicken_mini(),
            new Chicken_mini(),
            new Chicken_mini(),
            new Chicken_mini(),
            new Chicken_mini(),
            new Chicken_mini(),
            new Chicken_mini(),
            new Chicken_mini(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken()
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -1439),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 1439)
        ],
        [
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', -1439),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 1439)
        ],
        [
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', -1439),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 1439)
        ],
        [
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', -1439),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 1439)
        ],
        [
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true),
            new ThrowableObject(0, 0, true)
        ]
    );
}