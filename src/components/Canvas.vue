<script setup lang="ts">

import {onMounted, Ref, ref} from "vue";
import {map} from "modern-async";
import {useCanvasStore} from "../store/canvasStore.ts";
import ParticuleBuilder, {Position} from "../src/Particule/ParticuleBuilder.ts";
import NoiseColorBuilder from "../src/Color/Builder/NoiseColorBuilder.ts";
const {setCanvas, drawParticules, addParticule} = useCanvasStore();

let canvas: Ref<HTMLCanvasElement> = ref(null);

const canvasWidth = ref(window.innerWidth);
const canvasHeight = ref(window.innerHeight);

const particuleWidth = ref(10);
const particuleHeight = ref(10);

const density = ref(0.7);


const createParticules = (noiseSeed: number = Math.random()) => {
  const x: number[] = Array(50)
      .fill(null,0, Math.floor(canvasWidth.value));


  const y: number[] = Array(50)
      .fill(null,0, Math.floor(canvasHeight.value));

  const matrix: Position[] = [];
  x.forEach((_, x: number) => y.forEach((_2, y: number) => matrix.push({ x: x, y: y})));


  matrix.forEach((position: Position) => {
    addParticule(
        ParticuleBuilder.getInstance()
            .setPosition(
                {
                  x: position.x * 10,
                  y: position.y * 10,
                }
            )
            .setSize({width: particuleWidth.value , height: particuleHeight.value})
            .setColorBuilder(
                new NoiseColorBuilder()
                    .setSeed(noiseSeed)
                    .setX(position.x * particuleWidth.value)
                    .setY(position.y * particuleHeight.value)
            )
            .build()
    );
  });
}

onMounted(async () => {
  setCanvas(canvas.value.getContext("2d"));
  createParticules()
  drawParticules(1)

})






//
// drawParticules(1)
//     .then(await createParticules())
//     .then(await drawParticules())


;



</script>

<template>
  <canvas :width="canvasWidth" :height="canvasHeight" id="canvas" ref="canvas"/>
</template>

<style lang="scss" scoped>
#canvas-container {
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

</style>
