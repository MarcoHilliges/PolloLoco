let canvas;
let world;
let keyboard = new KeyBoard();

function start(){
    
    document.getElementById('layerGameStart').classList.add('d-none');
    document.getElementById('gameStartButton').classList.add('d-none');
    
    document.getElementById('gameButtonsLeft').classList.remove('d-none');
    document.getElementById('gameButtonsRight').classList.remove('d-none');

    loadAnimies();
    canvas = document.getElementById('canvas');

    world = new World(canvas, keyboard);
    



    // console.log('My Character is ', world.character)

}


window.addEventListener("keydown" , (key) => {
    if(key.keyCode == 39){
       
        keyboard.RIGHT = true;
    }
    if(key.keyCode == 37){
        
        keyboard.LEFT = true;
    }
    if(key.keyCode == 38){
        
        keyboard.UP = true;
    }
    if(key.keyCode == 40){
       
        keyboard.DOWN = true;
    }
    if(key.keyCode == 32){
        
        keyboard.SPACE = true;
    }
    if(key.keyCode == 68){
        
        keyboard.D = true;
    }
});

window.addEventListener("keyup" , (key) => {
    if(key.keyCode == 39){
        
        keyboard.RIGHT = false;
    }
    if(key.keyCode == 37){
        
        keyboard.LEFT = false;
    }
    if(key.keyCode == 38){
        
        keyboard.UP = false;
    }
    if(key.keyCode == 40){
        
        keyboard.DOWN = false;
    }
    if(key.keyCode == 32){
        
        keyboard.SPACE   = false;
    }
    if(key.keyCode == 68){

        keyboard.D = false;
    }
});