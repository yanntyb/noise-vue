import RedrawCheckerInterface from "./RedrawCheckerInterface.ts";
import {ParticuleType} from "../ParticuleBuilder.ts";

export default class LastPositionChangeRedrawChecker extends RedrawCheckerInterface {
    public static instance: LastPositionChangeRedrawChecker;

    private constructor() {
        super();
    }

    public static getInstance(): LastPositionChangeRedrawChecker
    {
        if (!this.instance) {
            this.instance = new LastPositionChangeRedrawChecker();
        }
        return this.instance;
    }

    public hasToRedraw(particule: ParticuleType): boolean {

        return !(
            particule.lastPosition !== undefined
            && particule.lastPosition.x === particule.position.x
            && particule.lastPosition.y === particule.position.y
        );
    }
}