<script setup lang="ts">

import {onMounted, Ref, ref} from "vue";
import {useCanvasStore, } from "../store/canvasStore.ts";
import StaticColorBuilder from "../src/Color/Builder/StaticColorBuilder.ts";
import chroma from "chroma-js";
import ParticuleMatrixBuilder from "../utils/ParticuleMatrixBuilder.ts";
import ParticuleBuilder, {ParticuleType} from "../src/Particule/ParticuleBuilder.ts";
import SetIntervalDrawer from "../src/Particule/Drawer/SetIntervalDrawer.ts";
import TextParticule from "../src/Particule/DrawerAt/TextParticule.ts";
import LastPositionChangeRedrawChecker from "../src/Particule/RedrawChecker/LastPositionChangeRedrawChecker.ts";
const {addParticule, drawParticules} = useCanvasStore();

let builder: Ref<HTMLCanvasElement> = ref(null);
let builderContext: Ref<CanvasRenderingContext2D> = ref(null);

const createBackground = (cssColor = 'white') => {
  const tilesWidth = 25;
  const tileHeight = tilesWidth;

  const baseColorObject = StaticColorBuilder.getInstance()
      .setBaseColor(chroma.css('green'));

  const backgroundTiles = ParticuleMatrixBuilder.make()
      .setParticuleBuilder(
          ParticuleBuilder.getInstance()
              .setSize({width: tilesWidth , height: tileHeight})
              .setColorBuilder(
                  baseColorObject.clone()
                      .setBaseColor(
                          chroma.css(cssColor)
                      )
              )

      )
      .setBasePosition({x: 5, y: -5})

  Array(20)
      .fill(1)
      .forEach(
          (_, x: number) => Array(20)
              .fill(1)
              .forEach(
                  (_2, y: number) => backgroundTiles.addPoint({
                    x: x * tilesWidth, y: y * tilesWidth
                  })
              )
      );


  return backgroundTiles.build()
      .map((particule: ParticuleType) => addParticule(particule));
}

const start = async () => {

  await drawParticules(
      createBackground('white'),
      SetIntervalDrawer.getInstance(),
      TextParticule.getInstance().fillTextUsing(() => 'o')
          .setRedrawChecker(LastPositionChangeRedrawChecker.getInstance()),
      builderContext,
  );


}

onMounted(async () => {
  builderContext.value = builder.value.getContext("2d");
  start();
});

</script>

<template>
  <canvas
      :width="400"
      :height="400"
      id="builder"
      ref="builder"
  />
</template>

<style lang="scss" scoped>
#builder {
  border: 1px solid white;
}
</style>
