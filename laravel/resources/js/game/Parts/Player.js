class Player {
    constructor(name){
        this.name = name;
        this.positionX = 0;
        this.positionY = 0;
        this.points = 0;
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
        this.point++;
    }

    setZero(){
        this.point = 0;
        this.positionX = 0;
        this.positionY;
    }
}
