<script setup lang="ts">

import {onMounted, Ref, ref} from "vue";
 import {useCanvasStore} from "../store/canvasStore.ts";
import ParticuleBuilder, {Position} from "../src/Particule/Drawer/ParticuleBuilder.ts";
import NoiseColorBuilder from "../src/Color/Builder/NoiseColorBuilder.ts";
const {setCanvas, drawParticules, addParticule, deleteOldParticules, enableCameraMovement, initCameraMovement} = useCanvasStore();
import chroma from "chroma-js";
import StaticColorBuilder from "../src/Color/Builder/StaticColorBuilder.ts";
import SetIntervalDrawer from "../src/Particule/Drawer/SetIntervalDrawer.ts";
import TextParticule from "../src/Particule/DrawerAt/TextParticule.ts";

let canvas: Ref<HTMLCanvasElement> = ref(null);

const canvasWidth = ref(window.innerWidth * 1.2);
const canvasHeight = ref(window.innerHeight * 1.2);

const particuleWidth = ref(30);
const particuleHeight = ref(10);
const baseColor = ref('#000000');
const xDensity = ref(1);
const yDensity = ref(1);

const getCanvasStyle = () => {
  return {
    maxWidth: window.innerWidth + 'px',
    maxHeight: window.innerHeight + 'px',
  }
}

const createParticules = () => {
  xDensity.value = Math.floor(canvasWidth.value / particuleWidth.value);
  yDensity.value = Math.floor(canvasHeight.value / particuleHeight.value);
  const x: number[] = Array(xDensity.value).fill(null);
  const y: number[] = Array(yDensity.value).fill(null);

  const matrix: Position[] = [];
  x.forEach((_, x: number) => y.forEach((_2, y: number) => matrix.push({ x: x, y: y})));

  const baseColorObject = StaticColorBuilder.getInstance()
      .setColor(chroma.random().hex())
      .build();

  baseColor.value = baseColor.value ? baseColor.value : baseColorObject.hex();

  const colorBuilder =  NoiseColorBuilder.getInstance()
      .setBaseColor(baseColorObject)

  matrix.forEach((position: Position) => {
    addParticule(
        ParticuleBuilder.getInstance()
            .setPosition(
                {
                  x: position.x * particuleWidth.value,
                  y: position.y * particuleHeight.value,
                }
            )
            .setSize({width: particuleWidth.value , height: particuleHeight.value})
            .setColorBuilder(colorBuilder)
            .build()
    );
  });
}

const start = () => {
  const random = Math.random().toString();
  deleteOldParticules();
  createParticules();
  drawParticules(
      SetIntervalDrawer.getInstance(),
      TextParticule.getInstance()
          .fillTextUsing((seeded) => 'YANN')
  );
  initCameraMovement(particuleWidth.value, particuleHeight.value);
}

onMounted(async () => {
  setCanvas(canvas.value.getContext("2d"));
  start();

});

</script>

<template>
  <canvas
      :width="canvasWidth"
      :height="canvasHeight"
      id="canvas"
      ref="canvas"
      :style="getCanvasStyle()"
  />
  <div id="generation-info">
    <span>Couleur de base:  <input type="text" v-model="baseColor"></span><br/>
    <span>Largeur du canvas: <input type="number" v-model="canvasWidth"></span><br/>
    <span>Hauteur du canvas: <input type="number" v-model="canvasHeight"></span><br/>
    <span>Largeur des particules: <input type="number" v-model="particuleWidth"></span><br/>
    <span>Hauteur des particules: <input type="number" v-model="particuleHeight"></span><br/>
    <span>
      Mouvement actif
      <input checked type="checkbox" @change="(e: InputEvent) => enableCameraMovement(e.target.checked)">
    </span>
    <button id="restart" @click="start">Regénérer</button>
  </div>
</template>

<style lang="scss" scoped>

#canvas {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

#vision {
  border: 1px solid white;
  z-index: 100;
}

#generation-info {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  font-size: 20px;
  font-family: monospace;
  padding: 10px;

  input {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 20px;
    font-family: monospace;
    padding: 10px;
    outline: none;
  }

  #restart{
    background-color: transparent;
    border: 1px solid white;
    color: white;
    font-size: 20px;
    font-family: monospace;
    padding: 10px;
    outline: none;
    cursor: pointer;
  }

}

</style>
