import ColorBuilderInterface from "../ColorBuilderInterface.ts";
import chroma, {Color} from "chroma-js";

export default class StaticColorBuilder extends ColorBuilderInterface {

    private _color: string;
    private static instance: StaticColorBuilder;

    private constructor() {
        super();
        this._color = '#000000';
    }

    public static getInstance(): StaticColorBuilder
    {
        if (!this.instance) {
            this.instance = new StaticColorBuilder();
        }
        return this.instance;
    }

    /**
     * Attend une couleur en hexadécimal
     */
    public setColor(value: string): this
    {
        this._color = value;
        return this;
    }

    public static create(): StaticColorBuilder
    {
        return new StaticColorBuilder();
    }

    public build(): Color
    {
        return chroma.hex(this._color);
    }
}