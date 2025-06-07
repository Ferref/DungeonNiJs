export default class Animator {
  constructor(player, ctx, canvas, background, assets) {
    this.player = player;
    this.ctx = ctx;
    this.canvas = canvas;
    this.assets = assets;

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
      tree1: new Image()
    };

    this.idleTimeout = null;
    this.background = background;

    this.loadImages();
  }

  loadImages() {
    this.images.idle.src = this.player.images.idle;
    this.images.moveUp.src = this.player.images.moveUp;
    this.images.moveDown.src = this.player.images.moveDown;
    this.images.run.src = this.player.images.run;
    this.images.attack1.src = this.player.images.attack1;
    this.images.tree1.src = this.assets.tree1.images.idle;


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


