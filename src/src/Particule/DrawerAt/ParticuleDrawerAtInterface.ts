import {ref, Ref} from "vue";
import {ParticuleType, Position} from "../ParticuleBuilder.ts";
import RedrawCheckerInterface from "../RedrawChecker/RedrawCheckerInterface.ts";

export default abstract class ParticuleDrawerAtInterface {
    public particules: Ref<ParticuleType>[] = [];
    public position: Position = {x: 0, y: 0};
    public canvas: Ref<CanvasRenderingContext2D> = ref(null);
    public redrawChecker?: RedrawCheckerInterface;

    setParticules(particules: Ref<ParticuleType>[]) {
        this.particules = particules;
        return this;
    }

    setPosition(position: Position) {
        this.position = position;
        return this;
    }

    setCanvas(canvas: Ref<CanvasRenderingContext2D>) {
        this.canvas = canvas;
        return this;
    }

    setRedrawChecker(redrawChecker: RedrawCheckerInterface) {
        this.redrawChecker = redrawChecker;
        return this;
    }

    hasToRedraw(particule: ParticuleType): boolean {
        return this.redrawChecker ? this.redrawChecker.hasToRedraw(particule) : true;
    }

    public clone(): this
    {
        return Object.assign(Object.create(this), this);
    }

    abstract drawSingleParticule(particule: Ref<ParticuleType>): Promise<any>;
}