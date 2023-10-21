import ColorBuilderInterface from "../ColorBuilderInterface.ts";
import chroma, {Color} from "chroma-js";
import alea from 'alea';
import { createNoise2D} from 'simplex-noise'
export default class NoiseColorBuilder extends ColorBuilderInterface {

    private _seed: number
    private _x: number;
    private _y: number;
    private _baseColor: Color;
    private static instance: NoiseColorBuilder;
    private _value: number = 0;

    public constructor() {
        super();
        this.setSeed(Math.random())
            .setX(0)
            .setY(0);
    }

    public static getInstance(): NoiseColorBuilder
    {
        if (!this.instance) {
            this.instance = new NoiseColorBuilder();
        }
        return this.instance;
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

    public setBaseColor(color: Color): this
    {
        this._baseColor = color;
        return this;
    }

    public getValue(): number {
        return this._value;
    }

    public build(): Color {
        const value = createNoise2D(alea(this._seed))(this._x, this._y);
        const valueInInterval = (value + 1) / 2;
        this._value = valueInInterval;
        const [r, g, b] = this._baseColor.rgb();
        return chroma.rgb(r, g, b, valueInInterval);
    }
}