import ParticuleDrawerInterface from "./ParticuleDrawerInterface.ts";
import {Position} from "./ParticuleBuilder.ts";

export default class SetIntervalDrawer extends ParticuleDrawerInterface {
    public static _instance: SetIntervalDrawer;

    public static getInstance(): SetIntervalDrawer {
        if (!this._instance) {
            this._instance = new SetIntervalDrawer();
        }
        return this._instance;
    }

    public drawParticules(drawingAtCallback:(position: Position) => void): void {
        let indexes = Array(this.particules.length)
            .fill(0)
            .map((_, index) => index);

        indexes = indexes
            .sort(() => 0.5 - Math.random())
            .sort(() => 0.5 - Math.random())
            .sort(() => 0.5 - Math.random());

        indexes.forEach((index: number) => {
            const interval = window.setInterval(() => {
                drawingAtCallback(this.particules[index].value.position);
            });
        });
    }
}