import ParticuleDrawerAtInterface from "./ParticuleDrawerAtInterface.ts";
import {Ref} from "vue";
import {ParticuleType, Position} from "../Drawer/ParticuleBuilder.ts";
import NoiseColorBuilder from "../../Color/Builder/NoiseColorBuilder.ts";

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

    public async drawParticuleAt(position: Position): Promise<any> {
        const particule = this.particules
            .find((particule: Ref<ParticuleType<NoiseColorBuilder>>) => particule.value.position === position);

        this.canvas.value.fillStyle = particule.value.color
            .setSeed(1)
            .setX(particule.value.position.x + this.cameraPosition.value.x)
            .setY(particule.value.position.y + this.cameraPosition.value.y)
            .build()
            .hex();

        this.canvas.value.clearRect(
            particule.value.position.x,
            particule.value.position.y,
            particule.value.size.width,
            particule.value.size.height
        );

        this.canvas.value.fillRect(
            particule.value.position.x,
            particule.value.position.y,
            particule.value.size.width,
            particule.value.size.height
        );
    }
}