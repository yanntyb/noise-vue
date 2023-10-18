import ColorBuilderInterface from "../ColorBuilderInterface.ts";
import chroma, {Color} from "chroma-js";

export default class StaticColorBuilder extends ColorBuilderInterface {

    private _color: string;

    public constructor() {
        super();
        this._color = '#000000';
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