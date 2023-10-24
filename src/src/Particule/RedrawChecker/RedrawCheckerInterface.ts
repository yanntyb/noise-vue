import {ParticuleType} from "../ParticuleBuilder.ts";

export default abstract class RedrawCheckerInterface {

    public abstract hasToRedraw(particule: ParticuleType): boolean;
}