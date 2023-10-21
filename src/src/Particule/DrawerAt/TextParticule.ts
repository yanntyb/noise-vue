import ParticuleDrawerAtInterface from "./ParticuleDrawerAtInterface.ts";
import {Ref} from "vue";
import {ParticuleType, Position} from "../Drawer/ParticuleBuilder.ts";
import NoiseColorBuilder from "../../Color/Builder/NoiseColorBuilder.ts";

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
            this.instance = new TextParticule();
        }
        return this.instance;
    }

    public fillTextUsing = (callback: (noised: string) => string): this => {
        this.fillTextUsingCallback = callback;
        return this;
    }

    public async drawParticuleAt(position: Position): Promise<any> {
        const particule = this.particules
            .find((particule: Ref<ParticuleType<NoiseColorBuilder>>) => particule.value.position === position);

         particule.value.color
            .setSeed(1)
            .setX(particule.value.position.x + this.cameraPosition.value.x)
            .setY(particule.value.position.y + this.cameraPosition.value.y)
            .build();

        const noised = particule.value.color.getValue();

        this.canvas.value.fillStyle = particule.value.color.build().hex();
        this.canvas.value.font = particule.value.size.width + "px Arial";

        // this.canvas.value.clearRect(
        //     particule.value.position.x,
        //     particule.value.position.y,
        //     particule.value.size.width,
        //     particule.value.size.height
        // );

        this.canvas.value.fillText(
            this.fillTextUsingCallback(noised),
            particule.value.position.x,
            particule.value.position.y,
            particule.value.size.width,
        )
    }
}