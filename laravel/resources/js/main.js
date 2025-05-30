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

                drawBackground(ctx, canvas);

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

    
    function drawBackground(ctx, canvas=null){

        const glassColorsHex = [
        '#0B3D0B99', // very dark green, 60% opacity
        '#0F520FCC', // dark green, 80% opacity
        '#14521499', // darker green, 60% opacity
        '#1A631ACC', // rich dark green, 80% opacity
        '#1E7B1ECC', // strong dark green, 80% opacity
        '#225E2299', // medium dark green, 60% opacity
        '#2A7F2ACC', // vivid dark green, 80% opacity
        ];

        let rowIndex = 0;
        let pixelSize = 4; // smaller number means more pixels
        while(rowIndex < canvas.width){
            const randomGreenColor = glassColorsHex[Math.floor(Math.random() * glassColorsHex.length)];
            ctx.fillStyle = randomGreenColor;
            ctx.fillRect(rowIndex, 0, pixelSize, pixelSize);
            
            let columnIndex = 0;
            while(columnIndex < canvas.height){
                const randomGreenColor = glassColorsHex[Math.floor(Math.random() * glassColorsHex.length)];
                ctx.fillStyle = randomGreenColor;
                ctx.fillRect(rowIndex, columnIndex, pixelSize, pixelSize);
                columnIndex += pixelSize;
            }
            rowIndex += pixelSize;
        }

    }
});


