import ParticuleBuilder, {ParticuleType, Position} from "../src/Particule/ParticuleBuilder.ts";

export default class ParticuleMatrixBuilder {
    matrix: { rows: {x: string, cols: {y: string, point: boolean }[] }[] };
    private _particuleBuilder: ParticuleBuilder;
    private basePosition: Position;

    constructor() {
        this.matrix = {rows: []};
    }

    public static make(): ParticuleMatrixBuilder {
        return new this().setBasePosition({x: 0, y: 0});
    }

    public setBasePosition(position: Position): this {
        this.basePosition = position;
        return this;
    }

    public addPoint(position: Position): this {
        const x = (position.x + this.basePosition.x).toString();
        const y = (position.y + this.basePosition.y).toString();


        if (!this.matrix.rows[x]) {
            this.matrix.rows[x] = {x: x, cols: []};
        }

        if (!this.matrix.rows[x].cols[y]) {
            this.matrix.rows[x].cols[y] = {y: y, point: false};
        }
        this.matrix.rows[x].cols[y].point = true

        return this;
    }

    public fromPattern(pattern: number[][], size: Position): this {

        const realPositions = pattern.flatMap((row, x): (Position|null)[] =>
            row.flatMap((point, y): Position|null => {
                if (!point) {
                    return null;
                }
                const width =  size.x / row.length;
                const height = size.y / pattern.map((patternRow) => patternRow[x]).length;

                return {
                    x: x * width,
                    y: y * height
                };
            })
        );

        realPositions.filter((isPoint: Position|null) => isPoint).forEach((position) => this.addPoint(position));

        return this;
    }

    public build(): ParticuleType[] {

        return Object.keys(this.matrix.rows).flatMap(
            (x) => {
                return Object.keys(this.matrix.rows[x].cols).flatMap(
                    (y) => {
                        if (!this.matrix.rows[x].cols[y].point) {
                            return null;
                        }
                        return this._particuleBuilder.setPosition({
                            x: parseFloat(x),
                            y: parseFloat(y)
                        }).build();
                    });
            }
        );
    }


    public setParticuleBuilder(value: ParticuleBuilder): ParticuleMatrixBuilder {
        this._particuleBuilder = value;
        return this;
    }
}