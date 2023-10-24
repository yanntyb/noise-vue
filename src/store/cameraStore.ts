import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {onKeyDown, onKeyStroke} from "@vueuse/core";

export const useCameraStore = defineStore('camera', () => {
    const cameraPosition = ref({x: 0, y: 0});
    const cameraOptions = ref({
        xIncrement: 0,
        yIncrement: 0,
        movementEnabled: true,
        initialized: false
    });

    const initCameraMovement = (xIncrement: number, yIncrement: number) => {

        cameraOptions.value.xIncrement = xIncrement;
        cameraOptions.value.yIncrement = yIncrement;

        if (cameraOptions.value.initialized) {
            return;
        }

        onKeyStroke(
            'ArrowLeft',
            () => cameraPosition.value.x -= cameraOptions.value.movementEnabled ? cameraOptions.value.xIncrement : 0
        );
        onKeyStroke(
            'ArrowRight',
            () => cameraPosition.value.x += cameraOptions.value.movementEnabled ? cameraOptions.value.xIncrement : 0
        );
        onKeyStroke(
            'ArrowUp',
            () => cameraPosition.value.y -= cameraOptions.value.movementEnabled ? cameraOptions.value.yIncrement : 0
        );
        onKeyStroke(
            'ArrowDown',
            () => cameraPosition.value.y += cameraOptions.value.movementEnabled ? cameraOptions.value.yIncrement : 0
        );

        cameraOptions.value.initialized = true;
    }


    const enableCameraMovement = (enabled: boolean) => {
        cameraOptions.value.movementEnabled = enabled;
    }

    const getCameraPosition = (): Ref<{x: number, y: number}> => {
        return cameraPosition;
    }

    return {getCameraPosition, initCameraMovement, enableCameraMovement};
});