export default class Player {
    constructor(name, character){
        this.name = name;
        this.positionX = 0;
        this.positionY = 0;
        this.points = 0;

        // Animations
        this.images = {
            idle: 'textures/lilheroes/1 Pink_Monster/Pink_Monster_Idle_4.png',
            moveUp: 'textures/lilheroes/1 Pink_Monster/Pink_Monster_Jump_8.png',
            run: 'textures/lilheroes/1 Pink_Monster/Pink_Monster_Run_6.png',
        }
    }

    moveUp(){
        this.positionY -= 5;
    }

    moveDown(){
        this.positionY--;
    }

    moveLeft(){
        this.positionX -= 5;
    }

    moveRight(){
        this.positionX += 5;
    }

    idle(){
        this.positionY = 0;
    }
}
