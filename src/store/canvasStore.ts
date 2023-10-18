import { defineStore } from 'pinia'
import { ref} from "vue";
import {ParticuleType} from "../components/Particule.vue";

export const useCanvasStore = defineStore('canvas', () =>{

    const canvas = ref<CanvasRenderingContext2D>(null);
    const particules = ref<ParticuleType[]>([])

    const setCanvas = (ctx: CanvasRenderingContext2D) => {
        canvas.value = ctx;
    }

    const getCanvas = () => {
        return canvas;
    }

    const addParticule = (particule: ParticuleType) => {
        particules.value.push(particule);
    }

    const getParticules = (): ParticuleType[] => {
        return particules.value;
    }

    return {getCanvas, setCanvas, addParticule, getParticules};

});