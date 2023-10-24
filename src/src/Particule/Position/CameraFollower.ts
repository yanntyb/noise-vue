import PositionModifierInterface from "./PositionModifierInterface.ts";
import {Ref} from "vue";
import {ParticuleType, Position} from "../ParticuleBuilder.ts";

export default class CameraFollower extends PositionModifierInterface {
    public static instance: CameraFollower;
    public options: {
        cameraPosition: Ref<Position>,
    }

    private constructor() {
        super();
    }

    public static getInstance(): CameraFollower
    {
        if (!this.instance) {
            this.instance = new CameraFollower();
        }
        return this.instance;
    }

    public setOptions(options: typeof this.options): this
    {
        super.setOptions(options);
        this.setPositionCallback((particule: Ref<ParticuleType>) => {
            return {
                x: particule.value.basePosition.x + options.cameraPosition.value.x,
                y: particule.value.basePosition.y + options.cameraPosition.value.y,
            };
        });
        return this;
    }


}