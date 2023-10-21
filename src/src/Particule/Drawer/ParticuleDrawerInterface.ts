import {ParticuleType, Position} from "../ParticuleBuilder.ts";
import {Ref} from "vue";

export default abstract class ParticuleDrawerInterface {
    public particules: Ref<ParticuleType<any>>[] = [];

    setParticule(particules: Ref<ParticuleType<any>>[]) {
        this.particules = particules;
        return this;
    }
    abstract drawParticules(drawingAtCallback: (position: Position) => void): void;
}