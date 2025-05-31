import $ from 'jquery';
import Player from './game/Parts/Player';
import Game from './game/Parts/Game';

class Background {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.pixelSize = 4;

    this.mapCols = 1000;
    this.mapRows = 1000;

    this.viewportX = 0;
    this.viewportY = 0;

    this.glassColorsHex = [
      '#0B3D0B99', '#0F520FCC', '#14521499',
      '#1A631ACC', '#1E7B1ECC', '#225E2299', '#2A7F2ACC'
    ];

    this.map = this.generateMap();
  }

  generateMap() {
    return Array.from({ length: this.mapCols }, () =>
      Array.from({ length: this.mapRows }, () =>
        this.getRandomColor()
      )
    );
  }

  getRandomColor() {
    const index = Math.floor(Math.random() * this.glassColorsHex.length);
    return this.glassColorsHex[index];
  }

  update(direction) {
    const speed = 4;
    const maxX = (this.mapCols * this.pixelSize) - this.canvas.width;
    const maxY = (this.mapRows * this.pixelSize) - this.canvas.height;

    switch (direction) {
      case 'up':    this.viewportY = Math.max(this.viewportY - speed, 0); break;
      case 'down':  this.viewportY = Math.min(this.viewportY + speed, maxY); break;
      case 'left':  this.viewportX = Math.max(this.viewportX - speed, 0); break;
      case 'right': this.viewportX = Math.min(this.viewportX + speed, maxX); break;
    }
  }

  draw() {
    const startCol = Math.floor(this.viewportX / this.pixelSize);
    const endCol = Math.min(startCol + Math.ceil(this.canvas.width / this.pixelSize) + 1, this.mapCols);
    const startRow = Math.floor(this.viewportY / this.pixelSize);
    const endRow = Math.min(startRow + Math.ceil(this.canvas.height / this.pixelSize) + 1, this.mapRows);

    for (let col = startCol; col < endCol; col++) {
      for (let row = startRow; row < endRow; row++) {
        const color = this.map[col][row];
        const drawX = (col * this.pixelSize) - this.viewportX;
        const drawY = (row * this.pixelSize) - this.viewportY;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(drawX, drawY, this.pixelSize, this.pixelSize);
      }
    }
  }
}

class Animator {
  constructor(player, ctx, canvas) {
    this.player = player;
    this.ctx = ctx;
    this.canvas = canvas;

    this.frameSize = 32;
    this.totalFrames = 4;
    this.frameDelay = 100;
    this.currentFrame = 0;
    this.currentImage = null;
    this.flipHorizontal = false;

    this.images = {
      idle: new Image(),
      moveUp: new Image(),
      moveDown: new Image(),
      run: new Image(),
      attack1: new Image(),
    };

    this.idleTimeout = null;
    this.background = new Background(ctx, canvas);

    this.loadImages();
  }

  loadImages() {
    this.images.idle.src = this.player.images.idle;
    this.images.moveUp.src = this.player.images.moveUp;
    this.images.moveDown.src = this.player.images.moveDown;
    this.images.run.src = this.player.images.run;
    this.images.attack1.src = this.player.images.attack1;

    let loadedCount = 0;
    const totalImages = Object.keys(this.images).length;

    Object.values(this.images).forEach(image => {
      image.onload = () => {
        if (++loadedCount === totalImages) {
          this.currentImage = this.images.idle;
          this.addEventListeners();
          this.startAnimation();
        }
      };
    });
  }

  addEventListeners() {
    document.addEventListener('keydown', e => this.handleKeyDown(e));
    document.addEventListener('keyup', e => this.handleKeyUp(e));
  }

  handleKeyDown(event) {
    clearTimeout(this.idleTimeout);
    const key = event.key.toLowerCase();

    switch (key) {
      case 'w':
        this.setAnimation('moveUp', this.flipHorizontal, 'up');
        break;
      case 's':
        this.setAnimation('moveDown', this.flipHorizontal, 'down');
        break;
      case 'd':
        this.flipHorizontal = false;
        this.setAnimation('run', this.flipHorizontal, 'right');
        break;
      case 'a':
        this.flipHorizontal = true;
        this.setAnimation('run', this.flipHorizontal, 'left');
        break;
      case ' ':
        this.setAnimation('attack1', this.flipHorizontal);
        break;
      default:
        this.setAnimation('idle', this.flipHorizontal);
        break;
    }
  }

  handleKeyUp(event) {
    if (['w', 'a', 's', 'd', ' '].includes(event.key.toLowerCase())) {
      this.setIdleAfterDelay();
    }
  }

  setAnimation(imageKey, flip = false, direction = null) {
    this.currentImage = this.images[imageKey];
    console.log(this.currentImage)
    this.flipHorizontal = flip;
    if (direction){
      this.background.update(direction);
    }
  }

  setIdleAfterDelay() {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(() => {
      this.currentImage = this.images.idle;
    }, 150);
  }

  startAnimation() {
    let lastFrameTime = 0;

    const animate = (timestamp) => {
      if (!lastFrameTime) lastFrameTime = timestamp;
      const delta = timestamp - lastFrameTime;

      if (delta > this.frameDelay) {
        this.renderFrame();
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        lastFrameTime += this.frameDelay;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  renderFrame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw();

    const posX = Math.floor((this.canvas.width - this.frameSize) / 2);
    const posY = Math.floor((this.canvas.height - this.frameSize) / 2);

    if (this.flipHorizontal) {
      this.ctx.save();
      this.ctx.translate(posX + this.frameSize, posY);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(this.currentImage, this.currentFrame * this.frameSize, 0, this.frameSize, this.frameSize, 0, 0, this.frameSize, this.frameSize);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(this.currentImage, this.currentFrame * this.frameSize, 0, this.frameSize, this.frameSize, posX, posY, this.frameSize, this.frameSize);
    }
  }
}

$(document).ready(() => {
  const player = new Player('player', 'Pink_Monster');
  const game = new Game(player);
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  new Animator(player, ctx, canvas);
});
