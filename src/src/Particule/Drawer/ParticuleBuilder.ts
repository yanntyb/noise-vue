import ColorBuilderInterface from "../../Color/ColorBuilderInterface.ts";
import StaticColorBuilder from "../../Color/Builder/StaticColorBuilder.ts";
import ColorBuilder from "../../Color/ColorBuilderInterface.ts";

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export type ParticuleType<ColorBuilderType extends ColorBuilder> = {
    position: Position;
    size: Size;
    color: ColorBuilderType;
};

export default class ParticuleBuilder {
    private _position: Position;
    private _colorBuilder: ColorBuilderInterface;
    private _size: Size;
    private static instance: ParticuleBuilder;

    private constructor() {
        this.setPosition({x: 200, y: 200})
            .setSize({width: 10, height: 10})
            .setColorBuilder(StaticColorBuilder.getInstance().setColor('#cb0808'))
        ;
    }

    public static getInstance(): ParticuleBuilder
    {
        if (!this.instance) {
            this.instance = new ParticuleBuilder();
        }
        return this.instance;
    }


    public setColorBuilder(builder: ColorBuilderInterface): this
    {
        this._colorBuilder = builder;
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

    public build(): ParticuleType<any>
    {
        return {
            position: this._position,
            color: this._colorBuilder,
            size: this._size,
        };
    }
}