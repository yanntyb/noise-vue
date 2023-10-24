import {ParticuleType} from "../ParticuleBuilder.ts";
import { Ref} from "vue";
import BeforeDrawingAtSorterInterface from "./BeforeDrawingAtSorter/BeforeDrawingAtSorterInterface.ts";

export default abstract class ParticuleDrawerInterface {
    public particules: Ref<ParticuleType>[] = [];
    public beforeDrawingAtSorter?: BeforeDrawingAtSorterInterface;


    setParticules(particules: Ref<ParticuleType>[]) {
        this.particules = particules;
        return this;
    }

    sortParticules() {
        if (!this.beforeDrawingAtSorter) {
            return;
        }
        this.particules = this.beforeDrawingAtSorter.sortParticules(this.particules)
    }

    setBeforeDrawingAtSorter(beforeDrawingAtSorter: BeforeDrawingAtSorterInterface) {
        this.beforeDrawingAtSorter = beforeDrawingAtSorter;
        return this;
    }

    public  abstract drawParticulesUsing(drawingAtCallback:(particule: Ref<ParticuleType>) => void): Promise<void>;
}