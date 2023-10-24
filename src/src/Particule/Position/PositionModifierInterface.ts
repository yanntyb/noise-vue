import {ParticuleType, Position} from "../ParticuleBuilder.ts";
import {Ref} from "vue";

export default abstract class PositionModifierInterface {
    public positionCallback: (particule: Ref<ParticuleType>, options: typeof this.options) => Position;
    public abstract options: Object;



    public setOptions(options: typeof this.options): this
    {
        this.options = options;
        return this;
    }

    public setPositionCallback(callback: typeof this.positionCallback): this
    {
        this.positionCallback = callback;
        return this;
    }

    public getModifierPosition(particule: Ref<ParticuleType>): Position
    {
        return this.positionCallback(particule, this.options);
    }



}