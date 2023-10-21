import { defineStore } from 'pinia'
import {Ref, ref} from "vue";
import ColorBuilder from "../src/Color/ColorBuilderInterface.ts";
import {ParticuleType, Position} from "../src/Particule/ParticuleBuilder.ts";
import NoiseColorBuilder from "../src/Color/Builder/NoiseColorBuilder.ts";
import {onKeyStroke} from "@vueuse/core";
import ParticuleDrawerInterface from "../src/Particule/Drawer/ParticuleDrawerInterface.ts";

export const useCanvasStore = defineStore('canvas', () =>{

    const canvas = ref<CanvasRenderingContext2D>(null);
    const particules = ref<Ref<ParticuleType<any>>[]>([])
    const cameraPosition = ref<Position>({x: 0, y: 0});
    const drawningIntervals = ref<number[]>([]);
    const cameraOptions = ref({
        xIncrement: 0,
        yIncrement: 0,
        movementEnabled: true,
        initalized: false
    });

    const setCanvas = (ctx: CanvasRenderingContext2D) => {
        canvas.value = ctx;
    }

    const addParticule = <ColorBuilderType extends ColorBuilder>(particule: ParticuleType<ColorBuilderType>) => {
        particules.value.push(ref(particule));
    }


    const drawParticuleAt = async (position: Position): Promise<any> => {
        const particule = particules.value
            .find((particule: Ref<ParticuleType<NoiseColorBuilder>>) => particule.value.position === position);
        canvas.value.fillStyle = particule.value.color
            .setSeed(1)
            .setX(particule.value.position.x + cameraPosition.value.x)
            .setY(particule.value.position.y + cameraPosition.value.y)
            .build()
            .hex();

        canvas.value.clearRect(
            particule.value.position.x,
            particule.value.position.y,
            particule.value.size.width,
            particule.value.size.height
        );

        canvas.value.fillRect(
            particule.value.position.x,
            particule.value.position.y,
            particule.value.size.width,
            particule.value.size.height
        );
    }

    const drawParticules =
        async (drawer: ParticuleDrawerInterface): Promise<any> => drawer.setParticule(particules.value).drawParticules(drawParticuleAt);

    const deleteOldParticules = () => {
        particules.value = [];
        drawningIntervals.value.forEach((interval) => window.clearInterval(interval));
        canvas.value.clearRect(0, 0, canvas.value.canvas.width, canvas.value.canvas.height);
    }

    const initCameraMovement = (xIncrement: number, yIncrement: number) => {

        cameraOptions.value.xIncrement = xIncrement;
        cameraOptions.value.yIncrement = yIncrement;

        if (cameraOptions.value.initalized) {
            return;
        }


        onKeyStroke(
            'ArrowLeft',
            () => cameraPosition.value.x += cameraOptions.value.movementEnabled ? cameraOptions.value.xIncrement : 0
        );
        onKeyStroke(
            'ArrowRight',
            () => cameraPosition.value.x -= cameraOptions.value.movementEnabled ? cameraOptions.value.xIncrement : 0
        );
        onKeyStroke(
            'ArrowUp',
            () => cameraPosition.value.y -= cameraOptions.value.movementEnabled ? cameraOptions.value.yIncrement : 0
        );
        onKeyStroke(
            'ArrowDown',
            () => cameraPosition.value.y += cameraOptions.value.movementEnabled ? cameraOptions.value.yIncrement : 0
        );

        cameraOptions.value.initalized = true;

    }

    const enableCameraMovement = (enabled: boolean) => {
        cameraOptions.value.movementEnabled = enabled;
    }

    return {setCanvas, addParticule, drawParticules, deleteOldParticules, enableCameraMovement, initCameraMovement};

});