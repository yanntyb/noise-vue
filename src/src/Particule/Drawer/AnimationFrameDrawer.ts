import ParticuleDrawerInterface from "./ParticuleDrawerInterface.ts";
import {ParticuleType} from "../ParticuleBuilder.ts";
import {Ref} from "vue";

/**
 * Performant quand pas beaucoup de particules
 */
export default class AnimationFrameDrawer extends ParticuleDrawerInterface {
    private static _instance: AnimationFrameDrawer;

    public static getInstance(): AnimationFrameDrawer {
        if (!this._instance) {
            this._instance = new AnimationFrameDrawer();
        }
        return this._instance;
    }


    public async drawParticulesUsing(drawSingleParticle:(particule: Ref<ParticuleType>) => void): Promise<void> {

        // Ici n'a pas d'effet car toutes les particules sont dessinées en même temps
        super.sortParticules();
        const cyclesDone = [];

        const drawParticule = (particule: Ref<ParticuleType>, index: number) => {
            drawSingleParticle(particule);
            cyclesDone.push(index);
            requestAnimationFrame(() => drawParticule(particule, index));

        }

        this.particules.forEach((particule: Ref<ParticuleType>, index: number) => {
            drawParticule(particule, index);
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

}