import ColorBuilderInterface from "./ColorBuilderInterface.ts";
import chroma, {Color} from "chroma-js";
import alea from 'alea';
import { createNoise2D} from 'simplex-noise'
import {Position} from "../../Particule/ParticuleBuilder.ts";
export default class NoiseColorBuilder extends ColorBuilderInterface {

    private static instance: NoiseColorBuilder;
    public options: {
        seed: number;
        position: Position;
    };

    private constructor() {
        super();
        this.setOptions({
            seed: Math.random(),
            position: {x: 0, y: 0}
        });
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

    public build(): Color {
        const value = createNoise2D(alea(this.options.seed))(this.options.position.x, this.options.position.y);
        const valueInInterval = (value + 1) / 2;
        const [r, g, b] = this._baseColor.rgb();
        return chroma.rgb(r, g, b, valueInInterval);
    }
}