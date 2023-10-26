import ParticuleDrawerAtInterface from "./ParticuleDrawerAtInterface.ts";
import {Ref} from "vue";
import {ParticuleType} from "../ParticuleBuilder.ts";

export default class TextParticule extends ParticuleDrawerAtInterface {
    public static instance: TextParticule;
    private fillTextUsingCallback: (noised: string) => string;

    private constructor() {
        super();
        this.fillTextUsing((noised: string) => noised);
    }

    public static getInstance(): TextParticule
    {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }

    public fillTextUsing = (callback: (noised: string) => string): this => {
        this.fillTextUsingCallback = callback;
        return this;
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
        this.canvas.value.font = particule.value.size.width + "px Arial";
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

        this.canvas.value.fillText(
            this.fillTextUsingCallback('test'),
            particule.value.position.x,
            particule.value.position.y,
        );

        particule.value.lastPosition =  particule.value.position;
    }

    private modifyPosition(particule: Ref<ParticuleType>): void {
        particule.value.position = particule.value.positionModifier?.getModifierPosition(particule) ?? particule.value.position;
    }
}