import ColorBuilderInterface from "./ColorBuilderInterface.ts";
import chroma, {Color} from "chroma-js";

export default class StaticColorBuilder extends ColorBuilderInterface {

    private static instance: StaticColorBuilder;

    private constructor() {
        super();
        this.setBaseColor('#000000');
    }

    public static getInstance(): StaticColorBuilder
    {
        if (!this.instance) {
            this.instance = new StaticColorBuilder();
        }
        return this.instance;
    }

    public static create(): StaticColorBuilder
    {
        return new StaticColorBuilder();
    }

    public build(): Color
    {
        return chroma.hex(this._baseColor);
    }
}