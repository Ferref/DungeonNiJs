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
    const frameDelay = 50;
    let currentFrame = 0;

    const images = {
        idle: new Image(),
        moveUp: new Image(),
        moveDown: new Image(),
        run: new Image(),
    };

    images.idle.src = player.images.idle;
    images.moveUp.src = player.images.moveUp;
    images.moveDown.src = player.images.moveDown;
    images.run.src = player.images.run;

    let currentImage = images.idle;
    let flipHorizontal = false;

    let idleTimeout;

    function setIdleTimeout(){
        idleTimeout = setTimeout(idleMovement, 150);
    }

    function idleMovement(){
        currentImage = images.idle;
    }

    const onKeyDown = (e) => {
        switch (e.key.toLowerCase()) {
            case 'w':
                clearTimeout(idleTimeout);
                currentImage = images.moveUp;
                flipHorizontal = false;
                break;
            case 's':
                clearTimeout(idleTimeout);
                currentImage = images.moveDown;
                flipHorizontal = false;
                break;
            case 'd':
                clearTimeout(idleTimeout);
                currentImage = images.run;
                flipHorizontal = false;
                break;
            case 'a':
                clearTimeout(idleTimeout);
                currentImage = images.run;
                flipHorizontal = true;
                break;
            default:
                currentImage = images.idle;
                flipHorizontal = false;
                break;
        }
    };

    const onKeyUp = (e) => {
        if(['w', 'a', 's', 'd'].includes(e.key.toLowerCase())){
            setIdleTimeout();
        }
    }

    const startAnimation = () => {
        let lastFrameTime = 0;

        const animate = (timestamp) => {
            if (!lastFrameTime) {
                lastFrameTime = timestamp;
            }

            const delta = timestamp - lastFrameTime;

            if (delta > frameDelay) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const posX = Math.floor((canvas.width - frameSize) / 2);
                const posY = Math.floor((canvas.height - frameSize) / 2);
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
                lastFrameTime += frameDelay;
            }

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };


    let imagesLoaded = 0;

    const onImageLoad = () => {
        imagesLoaded++;
        if (imagesLoaded === Object.keys(images).length) {
            document.addEventListener('keydown', onKeyDown);
            document.addEventListener('keyup', onKeyUp);
            startAnimation();
        }
    };

    images.idle.onload = onImageLoad;
    images.moveUp.onload = onImageLoad;
    images.run.onload = onImageLoad;
    images.moveDown.onload = onImageLoad;
});
