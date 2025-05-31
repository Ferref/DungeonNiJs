export default class Background {
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
