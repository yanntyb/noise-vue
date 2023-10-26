import ParticuleBuilder, {ParticuleType, Position} from "../src/Particule/ParticuleBuilder.ts";

export default class ParticuleMatrixBuilder {
    matrix: boolean[][];
    private _particuleBuilder: ParticuleBuilder;

    constructor() {
        this.matrix = [[]];
    }

    public static make(): ParticuleMatrixBuilder {
        return new this();
    }

    public addPoint(position: Position) {
        if (!this.matrix[position.x]) {
            this.matrix[position.x] = [];
        }
        this.matrix[position.x][position.y] = true
    }

    public build(): ParticuleType[] {
        return this.matrix.flatMap(
            (row, x) => row.flatMap(
                (isPlaced: boolean, y) => isPlaced ? this._particuleBuilder.setPosition({x, y}).build() : null
            ).filter(el => el !== null)
        );
    }


    public setParticuleBuilder(value: ParticuleBuilder): ParticuleMatrixBuilder {
        this._particuleBuilder = value;
        return this;
    }
}