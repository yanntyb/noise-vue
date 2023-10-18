import Particule from "../../components/Particule.vue";
import {VNode} from "@vue/runtime-core";
import { h } from "vue";
import ColorBuilderInterface from "../Color/ColorBuilderInterface.ts";
import StaticColorBuilder from "../Color/Builder/StaticColorBuilder.ts";

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export default class ParticuleBuilder {
    private _position: Position;
    private _colorBuilder: ColorBuilderInterface;
    private _size: Size;

    private constructor() {
        this.setPosition({x: 200, y: 200})
            .setSize({width: 10, height: 10})
            .setColorBuilder((new StaticColorBuilder).setColor('#cb0808'))
        ;
    }

    public static create(): ParticuleBuilder
    {
        return new ParticuleBuilder();
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

    public build(): VNode
    {
        return h(Particule, {
            position: this._position,
            color: this._colorBuilder.buildRef(),
            size: this._size,
        })
    }
}