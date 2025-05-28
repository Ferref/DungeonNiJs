import $ from 'jquery';
import Player from './game/Parts/Player';
import Game from './game/Parts/Game';

$(document).ready(() => {
    const player = new Player('player', 'Pink_Monster');
    const game = new Game(player);

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext("2d");

    const frameSize = 32;
    const totalFrames = 4;
    const frameDelay = 100;
    let currentFrame = 0;

    const images = {
        idle: new Image(),
        moveUp: new Image(),
        run: new Image()
    };

    images.idle.src = player.images.idle;
    images.moveUp.src = player.images.moveUp;
    images.run.src = player.images.run;

    let currentImage = images.idle;
    let flipHorizontal = false;

    const idleSlow = function(){
        setTimeout(() => {
            currentImage = images.idle;
        }, 300);
    }

    const onKeyDown = (e) => {
        switch (e.key.toLowerCase()) {
            case 'w':
                player.moveUp();
                currentImage = images.moveUp;
                flipHorizontal = false;
                break;
            case 's':
                player.moveDown();
                currentImage = images.moveUp;
                flipHorizontal = false;
                break;
            case 'd':
                player.moveRight();
                currentImage = images.run;
                flipHorizontal = false;
                idleSlow();
                break;
            case 'a':
                player.moveLeft();
                currentImage = images.run;
                flipHorizontal = true;
                idleSlow();
                break;
            default:
                currentImage = images.idle;
                flipHorizontal = false;
                break;
        }
    };

    const startAnimation = () => {
        setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const posX = 100 + player.positionX;
            const posY = 100 + player.positionY;
            const scale = 1;

            if (flipHorizontal) {
                ctx.save();
                ctx.translate(posX + frameSize, posY);
                ctx.scale(-1, scale);
                ctx.drawImage(
                    currentImage,
                    currentFrame * frameSize, 0,
                    frameSize, frameSize,
                    0, 0,
                    frameSize, frameSize
                );
                ctx.restore();
            } else {
                ctx.drawImage(
                    currentImage,
                    currentFrame * frameSize, 0,
                    frameSize, frameSize,
                    posX, posY,
                    frameSize, frameSize
                );
            }

            currentFrame = (currentFrame + 1) % totalFrames;
        }, frameDelay);
    };

    let imagesLoaded = 0;

    const onImageLoad = () => {
        imagesLoaded++;
        if (imagesLoaded === Object.keys(images).length) {
            document.addEventListener('keydown', onKeyDown);
            startAnimation();
        }
    };

    images.idle.onload = onImageLoad;
    images.moveUp.onload = onImageLoad;
    images.run.onload = onImageLoad;
});
