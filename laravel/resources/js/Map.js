export default class Map {
    /**
     *
     */
    constructor(name) {
        this.name = name;
        this.mapCols = 5000;
        this.mapRows = 5000;

        this.glassColorsHex = [
            '#0B3D0B99', '#0F520FCC', '#14521499',
            '#1A631ACC', '#1E7B1ECC', '#225E2299', '#2A7F2ACC'
        ];
    }

    generateMap() {
        let mapBase = Array.from({ length: this.mapCols }, () =>
            Array.from({ length: this.mapRows }, () =>
                this.getRandomColor()
            )
        );

        return mapBase;
    }

    getRandomColor() {
        const index = Math.floor(Math.random() * this.glassColorsHex.length);
        return this.glassColorsHex[index];
  }
}