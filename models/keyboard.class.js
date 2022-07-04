class KeyBoard{
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor(){
        setTimeout(() => {
            this.screenButtonPressEvent();
        }, 500);
        
    }

    screenButtonPressEvent(){
        document.getElementById('gameButtonJump').addEventListener('touchstart', (e) => {
           e.preventDefault();
           this.SPACE = true; 
        });
        document.getElementById('gameButtonJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false; 
        });
        
        document.getElementById('gameButtonThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true; 
        });
        document.getElementById('gameButtonThrow').addEventListener('touchend', (e) => {
             e.preventDefault();
             this.D = false; 
        });

        document.getElementById('gameButtonLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true; 
        });
        document.getElementById('gameButtonLeft').addEventListener('touchend', (e) => {
             e.preventDefault();
             this.LEFT = false; 
        });
        
        document.getElementById('gameButtonRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true; 
         });
        document.getElementById('gameButtonRight').addEventListener('touchend', (e) => {
             e.preventDefault();
             this.RIGHT = false; 
          });



    }
}