import ParticuleDrawerAtInterface from "./ParticuleDrawerAtInterface.ts";
import {Ref} from "vue";
import {ParticuleType} from "../ParticuleBuilder.ts";

export default class ColorParticule extends ParticuleDrawerAtInterface {
    public static instance: ColorParticule;

    private constructor() {
        super();
    }

    public static getInstance(): ColorParticule
    {
        if (!this.instance) {
            this.instance = new ColorParticule();
        }
        return this.instance;
    }

    public async drawSingleParticule(particule: Ref<ParticuleType>): Promise<any> {
        if (!particule.value.canvasColor) {
            particule.value.canvasColor = particule.value.colorBuilder
                .setOptions({
                    ...particule.value.colorBuilder.options,
                    position: particule.value.position,
                })
                .build();

        }

        this.canvas.value.fillStyle = particule.value.canvasColor.hex();
        this.modifyPosition(particule);

        if (!this.hasToRedraw(particule.value)) {
            return;
        }

        this.canvas.value.clearRect(
            particule.value.lastPosition?.x,
            particule.value.lastPosition?.y,
            particule.value.size.width,
            particule.value.size.height
        );

        this.canvas.value.fillRect(
            particule.value.position.x,
            particule.value.position.y,
            particule.value.size.width,
            particule.value.size.height
        );

        particule.value.lastPosition =  particule.value.position;
    }

    private modifyPosition(particule: Ref<ParticuleType>): void {
        particule.value.position = particule.value.positionModifier?.getModifierPosition(particule) ?? particule.value.position;
    }
}