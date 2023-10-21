import { defineStore } from 'pinia'
import {Ref, ref} from "vue";
import ColorBuilder from "../src/Color/ColorBuilderInterface.ts";
import {useArray} from "../utils/composable/useArray.ts";
import {ParticuleType, Position} from "../src/Particule/ParticuleBuilder.ts";
import { map, sleep} from 'modern-async'

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

    const drawParticuleAt = async (position: Position): Promise<any> => {
        const particule = particules.value
            .find((particule: Ref<ParticuleType<any>>) => particule.value.position === position);
        canvas.value.fillStyle = particule.value.color.build().hex();
        canvas.value.fillRect(
            particule.value.position.x,
            particule.value.position.y,
            particule.value.size.width,
            particule.value.size.height
        );
    }

    const drawParticules = async (): Promise<any> => {
        Array(particules.value.length)
            .fill(0).forEach((_, index) => {
                window.setInterval(() => {
                    drawParticuleAt(particules.value[index].value.position);
                })
            })
    }

    return {getCanvas, setCanvas, addParticule, getParticules, drawParticules, drawParticuleAt};

});