import {ParticuleType} from "../../ParticuleBuilder.ts";
import {Ref} from "vue";

export default abstract class BeforeDrawingAtSorterInterface {
    public abstract options: Object;
    public callback: (particules: Ref<ParticuleType>[], options: typeof this.options) => Ref<ParticuleType>[];

    public setOptions(options: typeof this.options): this
    {
        this.options = options;
        return this;
    }

    public setCallback(callback: typeof this.callback): this
    {
        this.callback = callback;
        return this;
    }

    public sortParticules(particules: Ref<ParticuleType>[]): Ref<ParticuleType>[]
    {
        return this.callback(particules, this.options);
    }
}