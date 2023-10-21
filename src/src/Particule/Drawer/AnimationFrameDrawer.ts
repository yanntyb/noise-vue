import ParticuleDrawerInterface from "./ParticuleDrawerInterface.ts";
import {Position} from "./ParticuleBuilder.ts";

export default class AnimationFrameDrawer extends ParticuleDrawerInterface {
    private static _instance: AnimationFrameDrawer;

    public static getInstance(): AnimationFrameDrawer {
        if (!this._instance) {
            this._instance = new AnimationFrameDrawer();
        }
        return this._instance;
    }


    public drawParticules(drawingAtCallback:(position: Position) => void): void {
        let indexes = Array(this.particules.length)
            .fill(0)
            .map((_, index) => index);

        indexes = indexes
            .sort(() => 0.5 - Math.random())
            .sort(() => 0.5 - Math.random());

        let currentIndex = 0;
        const drawParticule = (timestamp: number) => {
            drawingAtCallback(this.particules[indexes[currentIndex]].value.position);
            if (currentIndex < indexes.length - 1) {
                currentIndex++;
                requestAnimationFrame(drawParticule);
            }
        }
        requestAnimationFrame(drawParticule);
    }

}