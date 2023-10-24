import {Color} from "chroma-js";
import {ref, Ref} from "vue";

export default abstract class ColorBuilder {
    public abstract build(): Color;
    public abstract options: Object;
    public _baseColor: Color;


    /**
     * Retourne une ref de la couleur
     */
    public buildRef(): Ref<Color>
    {
        return ref(this.build());
    }

    public setOptions(options: typeof this.options): this
    {
        this.options = options;
        return this;
    }


    public setBaseColor(color: Color): this
    {
        this._baseColor = color;
        return this;
    }

    public clone(): this
    {
        return Object.assign(Object.create(this), this);
    }

}