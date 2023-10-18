import ColorBuilderInterface from "../ColorBuilderInterface.ts";
import chroma, {Color} from "chroma-js";
import alea from 'alea';
import { createNoise2D} from 'simplex-noise'
export default class NoiseColorBuilder extends ColorBuilderInterface {

    private _seed: number
    private _x: number;
    private _y: number;

    public constructor() {
        super();
        this.setSeed(Math.random())
            .setX(0)
            .setY(0);
    }

    public static create(): NoiseColorBuilder {
        return new NoiseColorBuilder();
    }


    public setSeed(value: number): this
    {
        this._seed = value;
        return this;
    }

    public setX(value: number): this
    {
        this._x = value;
        return this;
    }

    public setY(value: number): this
    {
        this._y = value;
        return this;
    }

    public build(): Color {
        const value = createNoise2D(alea(this._seed))(this._x, this._y);
        return chroma.rgb(0, 0, 255 * value, 1);
    }
}