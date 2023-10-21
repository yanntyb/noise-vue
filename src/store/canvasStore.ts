import { defineStore } from 'pinia'
import {Ref, ref} from "vue";
import ColorBuilder from "../src/Color/ColorBuilderInterface.ts";
import {useArray} from "../utils/composable/useArray.ts";
import {ParticuleType} from "../src/Particule/ParticuleBuilder.ts";
import { map } from 'modern-async'

export const useCanvasStore = defineStore('canvas', () =>{

    const canvas = ref<CanvasRenderingContext2D>(null);
    const particules = ref<Ref<ParticuleType<any>>[]>([])

    const setCanvas = (ctx: CanvasRenderingContext2D) => {
        canvas.value = ctx;
    }

    const getCanvas = () => {
        return canvas;
    }

    const addParticule = <ColorBuilderType extends ColorBuilder>(particule: ParticuleType<ColorBuilderType>) => {
        particules.value.push(ref(particule));
    }

    const getParticules = (): Ref<Ref<ParticuleType<ColorBuilder>>[]> => {
        return particules;
    }

    const drawParticules = async (parallelDrawingCount: number = 2): Promise<any> => {

        const partitions = useArray().chunkArray(
            particules.value as [],
            Math.ceil(particules.value.length / parallelDrawingCount)
        );

        return await map(partitions, async (partition: Ref<ParticuleType<any>>[]) => {
            await map(partition, async (particule: Ref<ParticuleType<any>>) => {
                canvas.value.fillStyle = particule.value.color.build().hex();
                canvas.value.fillRect(
                    particule.value.position.x,
                    particule.value.position.y,
                    particule.value.size.width,
                    particule.value.size.height
                );
            });
        });
    }

    return {getCanvas, setCanvas, addParticule, getParticules, drawParticules};

});