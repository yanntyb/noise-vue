import ParticuleDrawerInterface from "./ParticuleDrawerInterface.ts";
import {ParticuleType} from "../ParticuleBuilder.ts";
import {Ref} from "vue";

export default class SetIntervalDrawer extends ParticuleDrawerInterface {
    public static _instance: SetIntervalDrawer;
    public intervals: number[] = [];

    public static getInstance(): SetIntervalDrawer {
        if (!this._instance) {
            this._instance = new SetIntervalDrawer();
        }
        this._instance.resetIntervals();
        return this._instance;
    }

    public async drawParticulesUsing(drawSingleParticle:(particule: Ref<ParticuleType>) => void): Promise<void> {
        super.sortParticules()
        const cyclesDone = [];
        this.particules.forEach((particule: Ref<ParticuleType>, index: number) => {
            this.intervals.push(window.setInterval(() => {
                drawSingleParticle(particule);
            }));
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