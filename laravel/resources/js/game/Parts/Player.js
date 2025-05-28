export default class Player {
    constructor(name, character){
        this.name = name;
        this.positionX = 0;
        this.positionY = 0;
        this.points = 0;
        this.character = character;
    }

    moveUp(){
        this.positionY++;
    }

    moveDown(){
        this.positionY--;
    }

    moveLeft(){
        this.positionX--;
    }

    moveRight(){
        this.positionX++;
    }

    addPoint(){
        this.points++;
    }

    setZero(){
        this.points = 0;
        this.positionX = 0;
        this.positionY;
    }
}
