export default class Game {
    constructor(player = 'Player1'){
        this.player = player;
    }

    start(){
        this.player.setZero();
        console.log('game started');
    }

    pause(){
        console.log('game paused');
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