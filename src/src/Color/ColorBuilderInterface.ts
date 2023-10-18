import {Color} from "chroma-js";
import {ref, Ref} from "vue";

export default abstract class ColorBuilder {
    public abstract build(): Color;


    /**
     * Retourne une ref de la couleur
     */
    public buildRef(): Ref<Color>
    {
        return ref(this.build());
    }


}