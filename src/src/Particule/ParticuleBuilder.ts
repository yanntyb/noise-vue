import ColorBuilder from "../Color/Builder/ColorBuilderInterface.ts";
import StaticColorBuilder from "../Color/Builder/StaticColorBuilder.ts";
import PositionModifierInterface from "./Position/PositionModifierInterface.ts";
import chroma, {Color} from "chroma-js";

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export type ParticuleType = {
    basePosition: Position;
    position: Position;
    lastPosition?: Position;
    size: Size;
    colorBuilder: ColorBuilder;
    canvasColor?: Color;
    positionModifier: PositionModifierInterface;
};

export default class ParticuleBuilder {
    private _position: Position;
    private _colorBuilder: ColorBuilder;
    private _size: Size;
    private static instance: ParticuleBuilder;
    private positionModifier?: PositionModifierInterface;

    private constructor() {
        this.setPosition({x: 200, y: 200})
            .setSize({width: 10, height: 10})
            .setColorBuilder(
                StaticColorBuilder.getInstance()
                    .setBaseColor(chroma.css('red'))
            )
        ;
    }

    public static getInstance(): ParticuleBuilder
    {
        if (!this.instance) {
            this.instance = new ParticuleBuilder();
        }
        return this.instance;
    }


    public setColorBuilder(builder: ColorBuilder): this
    {
        this._colorBuilder = builder;
        return this;
    }

    public setPositionModifier(modifier?: PositionModifierInterface): this
    {
        this.positionModifier = modifier;
        return this;
    }

    public setPosition(value: Position): this
    {
        this._position = value;
        return this;
    }

    public setSize(value: Size): this
    {
        this._size = value;
        return this;
    }

    public build(): ParticuleType
    {
        return {
            basePosition: this._position,
            position: this._position,
            colorBuilder: this._colorBuilder,
            size: this._size,
            positionModifier: this.positionModifier,
        };
    }
}