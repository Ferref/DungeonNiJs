export default class Player {
    constructor(name, background){
        this.name = name;
        this.positionX = 0;
        this.positionY = 0;
        this.points = 0;

        // Animations
        this.images = {
            idle: 'textures/lilheroes/1 Pink_Monster/Pink_Monster_Idle_4.png',
            moveUp: 'textures/lilheroes/1 Pink_Monster/Pink_Monster_Climb_4.png',
            moveDown: 'textures/lilheroes/1 Pink_Monster/Pink_Monster_Walk_6.png',
            run: 'textures/lilheroes/1 Pink_Monster/Pink_Monster_Run_6.png',
        }
    }
}
