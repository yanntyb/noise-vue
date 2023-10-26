import ParticuleDrawerInterface from "./ParticuleDrawerInterface.ts";
import {ParticuleType} from "../ParticuleBuilder.ts";
import {Ref} from "vue";

export default class DrawOnceDrawer extends ParticuleDrawerInterface {
    public static _instance: DrawOnceDrawer;
    public intervals: number[] = [];

    public static getInstance(): DrawOnceDrawer {
        if (!this._instance) {
            this._instance = new DrawOnceDrawer();
        }
        this._instance.resetIntervals();
        return this._instance;
    }

    public clone(): this
    {
        return Object.assign(Object.create(this), this);
    }

    public async drawParticulesUsing(drawSingleParticle:(particule: Ref<ParticuleType>) => void): Promise<void> {
        super.sortParticules()
        const cyclesDone = [];
        this.particules.forEach((particule: Ref<ParticuleType>, index: number) => {
            const interval = window.setInterval(() => {
                drawSingleParticle(particule);
                window.clearInterval(interval);
            });
            this.intervals.push(interval);
            cyclesDone.push(index);

        });

        return await new Promise((resolve) => {
            window.setInterval(() => {
                if (cyclesDone.length !== this.particules.length) {
                    return;
                }
                resolve();
            });
        })
    }

    private resetIntervals(): void {
        this.intervals.forEach((interval: number) => window.clearInterval(interval));
        this.intervals = [];
    }
}