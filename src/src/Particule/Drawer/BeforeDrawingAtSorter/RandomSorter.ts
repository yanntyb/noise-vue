import BeforeDrawingAtSorterInterface from "./BeforeDrawingAtSorterInterface.ts";

export default class RandomSorter extends BeforeDrawingAtSorterInterface {
    public static instance: RandomSorter;
    public options: {};

    private constructor() {
        super();
        this.setCallback((particules) => {
            return particules
                    .sort(() => Math.random() - 0.5)
                    .sort(() => Math.random() - 0.5)
                    .sort(() => Math.random() - 0.5)
                ;
        })
    }

    public static getInstance(): RandomSorter
    {
        if (!this.instance) {
            this.instance = new RandomSorter();
        }
        return this.instance;
    }


}