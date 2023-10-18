import ColorBuilderInterface from "../ColorBuilderInterface.ts";
import chroma, {Color} from "chroma-js";

export default class RandomColorBuilder extends ColorBuilderInterface {

    private readonly color: Color;

    public constructor() {
        super();
        this.color = chroma.random();
    }

    public static create(): ColorBuilderInterface {
        return new RandomColorBuilder();
    }

    public build(): Color {
        return this.color;
    }
}