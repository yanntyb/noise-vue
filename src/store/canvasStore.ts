import { defineStore } from 'pinia'
import {Ref, ref} from "vue";
import {ParticuleType} from "../src/Particule/ParticuleBuilder.ts";
import ParticuleDrawerInterface from "../src/Particule/Drawer/ParticuleDrawerInterface.ts";
import ParticuleDrawerAtInterface from "../src/Particule/DrawerAt/ParticuleDrawerAtInterface.ts";

export const useCanvasStore = defineStore('canvas', () =>{

    const canvas = ref<CanvasRenderingContext2D>(null);
    const particules = ref<Ref<ParticuleType>[]>([])
    const drawningIntervals = ref<number[]>([]);

    const setCanvas = (ctx: CanvasRenderingContext2D) => {
        canvas.value = ctx;
    }

    const addParticule =(particule: ParticuleType): Ref<ParticuleType> => {
        const particuleRef = ref(particule);
        particules.value.push(particuleRef);
        return particuleRef;
    }


    const drawSingleParticule =
        async (
            particule: Ref<ParticuleType>,
            drawer: ParticuleDrawerAtInterface,
            overrideCanvas?: Ref<CanvasRenderingContext2D>
        ): Promise<any> => drawer
                .setParticules(particules.value)
                .setCanvas(overrideCanvas || canvas)
                .drawSingleParticule(particule);

    const drawParticules =
        async (
            particules: Ref<ParticuleType>[],
            drawer: ParticuleDrawerInterface,
            singleParticuleDrawer: ParticuleDrawerAtInterface,
            overrideCanvas?: Ref<CanvasRenderingContext2D>,
        ): Promise<any> => drawer
                .setParticules(particules)
                .drawParticulesUsing(
                    (particule: Ref<ParticuleType>) => {
                        drawSingleParticule(particule, singleParticuleDrawer, overrideCanvas);
                    }
                );

    const deleteOldParticules = () => {
        particules.value = [];
        drawningIntervals.value.forEach((interval) => window.clearInterval(interval));
        canvas.value.clearRect(0, 0, canvas.value.canvas.width, canvas.value.canvas.height);
    }


    return {setCanvas, addParticule, drawParticules, deleteOldParticules};

});