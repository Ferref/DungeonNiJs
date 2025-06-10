import Map from '../Map';

export class MagnificantForest extends Map {

    constructor(name, assets) {
        super('MagnificantForest', assets);
        this.mapCols = 5000;
        this.mapRows = 5000;

        this.glassColorsHex = [
            '#0B3D0B99', '#0F520FCC', '#14521499',
            '#1A631ACC', '#1E7B1ECC', '#225E2299', '#2A7F2ACC'
        ];
    }

    generateMap() {
        let mapBase = Array.from({ length: this.mapCols }, (_, col) =>
            Array.from({ length: this.mapRows }, (_, row) =>
                this.getColorByCoords(col, row)
            )
        );

        return mapBase;
    }

    getColorByCoords(col, row) {
        const mixed = (col * 73856093) ^ (row * 19349663);
        const index = Math.abs(mixed) % this.glassColorsHex.length;
        return this.glassColorsHex[index];
    }

    addAssets(){

    }
}