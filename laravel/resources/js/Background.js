export default class Background {
  constructor(ctx, canvas, assets, map) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.assets = assets;
    this.pixelSize = 4;
    this.viewportX = 0;
    this.viewportY = 0;
    this.map = map;
    this.mapTexture = null;
  }

  update(direction) {
    const speed = 4;
    const maxX = (this.map.mapCols * this.pixelSize) - this.canvas.width;
    const maxY = (this.map.mapRows * this.pixelSize) - this.canvas.height;

    switch (direction) {
      case 'up':    this.viewportY = Math.max(this.viewportY - speed, 0); break;
      case 'down':  this.viewportY = Math.min(this.viewportY + speed, maxY); break;
      case 'left':  this.viewportX = Math.max(this.viewportX - speed, 0); break;
      case 'right': this.viewportX = Math.min(this.viewportX + speed, maxX); break;
    }
  }

  draw() {
    if(this.mapTexture === null){
      this.mapTexture = this.map.generateMap();
    }

    const startCol = Math.floor(this.viewportX / this.pixelSize);
    const endCol = Math.min(startCol + Math.ceil(this.canvas.width / this.pixelSize) + 1, this.map.mapCols);
    const startRow = Math.floor(this.viewportY / this.pixelSize);
    const endRow = Math.min(startRow + Math.ceil(this.canvas.height / this.pixelSize) + 1, this.map.mapRows);

    // Draw Assets
    for (let col = startCol; col < endCol; col++) {
      for (let row = startRow; row < endRow; row++) {
        const color = this.mapTexture[row][col];
        const drawX = (col * this.pixelSize) - this.viewportX;
        const drawY = (row * this.pixelSize) - this.viewportY;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(drawX, drawY, this.pixelSize, this.pixelSize);
      }
    }
  }
}
