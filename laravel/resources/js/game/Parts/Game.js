class Game {
    constructor(player = 'Player1'){
        this.player = player;
    }

    start(){
        this.player.setZero();
    }

    pause(){
        //...
    }

    movePlayerUp(){
        this.moveUp();
    }

    movePlayerDown(){
        this.moveDown();
    }

    movePlayerLeft(){
        this.moveUp();
    }

    movePlayerRight(){
        this.moveDown();
    }
}