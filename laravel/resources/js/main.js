import $ from 'jquery';
import Player from './game/Parts/Player';
import Game from './game/Parts/Game';


$(document).ready(() => {
    const player = new Player('player', 'Pink_Monster');
    const game = new Game(player);

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext("2d");

    const sprite = new Image();
        if(player.character === 'Pink_Monster'){
        sprite.src = 'textures/lilheroes/1 Pink_Monster/Pink_Monster_Idle_4.png';

    }

    const frameHeight = 32;
    const frameWidth = 32;
    let currentFrame = 0;
    let totalFrames = 4;
    const frameDelay = 150;

    sprite.onload = () => {
        setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                sprite,
                currentFrame * frameWidth, 0,
                frameWidth, frameHeight,
                100, 100,
                frameWidth, frameHeight
            );

            currentFrame = (currentFrame + 1) % totalFrames;
        }, frameDelay);
    }


    ctx.fillRect(10, 10, 150, 100);
});
