<script setup lang="ts">

import {onMounted, Ref, ref} from "vue";
import {useCanvasStore} from "../store/canvasStore.ts";
import {useCameraStore} from "../store/cameraStore.ts";
import ParticuleBuilder, {ParticuleType} from "../src/Particule/ParticuleBuilder.ts";
import NoiseColorBuilder from "../src/Color/Builder/NoiseColorBuilder.ts";
const {setCanvas, drawParticules, addParticule, deleteOldParticules} = useCanvasStore();
const {getCameraPosition, initCameraMovement} = useCameraStore();
import chroma from "chroma-js";
import StaticColorBuilder from "../src/Color/Builder/StaticColorBuilder.ts";
import SetIntervalDrawer from "../src/Particule/Drawer/SetIntervalDrawer.ts";
import ColorParticule from "../src/Particule/DrawerAt/ColorParticule.ts";
import CameraFollower from "../src/Particule/Position/CameraFollower.ts";
import AnimationFrameDrawer from "../src/Particule/Drawer/AnimationFrameDrawer.ts";
import DrawOnceDrawer from "../src/Particule/Drawer/DrawOnceDrawer.ts";
import ParticuleMatrixBuilder from "../utils/ParticuleMatrixBuilder.ts";

let canvas: Ref<HTMLCanvasElement> = ref(null);
let canvasContext: Ref<CanvasRenderingContext2D> = ref(null);



const getCanvasStyle = () => {
  return {
    maxWidth: window.innerWidth + 'px',
    maxHeight: window.innerHeight + 'px',
  }
}

const createTerrain = () => {
  const canvasWidth = 1200;
  const canvasHeight = 1200;

  const particuleWidth = 100;
  const particuleHeight = 100;
  const xParticuleCount = Math.floor(canvasWidth / particuleWidth);
  const yParticuleCount = Math.floor(canvasHeight / particuleHeight);
  const x: number[] = Array(xParticuleCount).fill(null);
  const y: number[] = Array(yParticuleCount).fill(null);

  const baseColorObject = StaticColorBuilder.getInstance()
      .setBaseColor(chroma.css('green'))
      .build();

  const baseColorBuilder =  NoiseColorBuilder.getInstance()
      .setBaseColor(baseColorObject)

  const matrix = ParticuleMatrixBuilder.make()
      .setParticuleBuilder(
          ParticuleBuilder.getInstance()
              .setSize({width: particuleWidth , height: particuleHeight})
              .setColorBuilder(
                  baseColorBuilder.clone()
                      .setBaseColor(
                          chroma.css('green')
                      )
              )
      )

  x.forEach((_, x: number) => y.forEach((_2, y: number) => matrix.addPoint({ x: x * particuleWidth, y: y * particuleHeight})));

  return matrix.build().map((particule: ParticuleType) => addParticule(particule));
}

const createPlayer = () => {
  const baseBuilder = ParticuleBuilder.getInstance()
      .setSize({width: 25, height: 25})
      .setColorBuilder(
          NoiseColorBuilder.getInstance()
              .setBaseColor(chroma.css('red'))
      )
      .setPositionModifier(
          CameraFollower.getInstance()
              .setOptions({
                cameraPosition: getCameraPosition(),

              })
      )

  return ParticuleMatrixBuilder.make()
      .setParticuleBuilder(baseBuilder)
      .fromPattern([
          [1, 0, 0, 1],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [1, 0, 0, 1],

      ], {x: 100, y: 100})
      .build()
      .map((particule: ParticuleType) => addParticule(particule));

}

const start = async () => {

  //Initialisation du terrain
  const terrain = createTerrain()
  await drawParticules(
      terrain,
      DrawOnceDrawer.getInstance(),
      ColorParticule.getInstance(),
      canvasContext
  );

  // Initialisation du joueur
  const player = createPlayer();
  drawParticules(
      player,
      AnimationFrameDrawer.getInstance(),
      ColorParticule.getInstance()
          .clone(),
          // .setRedrawChecker(
          //     LastPositionChangeRedrawChecker.getInstance()
          // ),
      canvasContext
  );

  //Initialisation du redraw automatique du terrain
  drawParticules(
      terrain,
      SetIntervalDrawer.getInstance(),
      ColorParticule.getInstance(),
      canvasContext
  );

  // Initialisation du mouvement de la caméra
  initCameraMovement(50, 50);
}

onMounted(async () => {
  canvasContext.value = canvas.value.getContext("2d");
  start();
});

</script>

<template>

  <canvas
      :width="1200"
      :height="1200"
      id="canvas"
      ref="canvas"
      :style="getCanvasStyle()"
  />
</template>

<style lang="scss" scoped>

#canvas {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 50vw;
}

</style>
