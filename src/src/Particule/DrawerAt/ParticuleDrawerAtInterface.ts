import {ref, Ref} from "vue";
import {ParticuleType, Position} from "../Drawer/ParticuleBuilder.ts";

export default abstract class ParticuleDrawerAtInterface {
    public particules: Ref<ParticuleType<any>>[] = [];
    public position: Position = {x: 0, y: 0};
    public cameraPosition: Ref<Position> = ref({x: 0, y: 0});
    public canvas: Ref<CanvasRenderingContext2D> = ref(null);

    setParticules(particules: Ref<ParticuleType<any>>[]) {
        this.particules = particules;
        return this;
    }

    setPosition(position: Position) {
        this.position = position;
        return this;
    }

    setCameraPosition(cameraPosition: Ref<Position>) {
        this.cameraPosition = cameraPosition;
        return this;
    }

    setCanvas(canvas: Ref<CanvasRenderingContext2D>) {
        this.canvas = canvas;
        return this;
    }

    abstract drawParticuleAt(position: Position): Promise<any>;
}