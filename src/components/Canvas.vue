<script setup lang="ts">

import {onMounted, Ref, ref} from "vue";
import {useCanvasStore} from "../store/canvasStore.ts";
import {useCameraStore} from "../store/cameraStore.ts";
import ParticuleBuilder, {Position} from "../src/Particule/ParticuleBuilder.ts";
import NoiseColorBuilder from "../src/Color/Builder/NoiseColorBuilder.ts";
const {setCanvas, drawParticules, addParticule, deleteOldParticules} = useCanvasStore();
const {getCameraPosition, initCameraMovement, enableCameraMovement} = useCameraStore();
import chroma from "chroma-js";
import StaticColorBuilder from "../src/Color/Builder/StaticColorBuilder.ts";
import SetIntervalDrawer from "../src/Particule/Drawer/SetIntervalDrawer.ts";
import ColorParticule from "../src/Particule/DrawerAt/ColorParticule.ts";
import CameraFollower from "../src/Particule/Position/CameraFollower.ts";
import AnimationFrameDrawer from "../src/Particule/Drawer/AnimationFrameDrawer.ts";
import RandomSorter from "../src/Particule/Drawer/BeforeDrawingAtSorter/RandomSorter.ts";
import LastPositionChangeRedrawChecker from "../src/Particule/RedrawChecker/LastPositionChangeRedrawChecker.ts";
import DrawOnceDrawer from "../src/Particule/Drawer/DrawOnceDrawer.ts";

let canvas: Ref<HTMLCanvasElement> = ref(null);



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

  const matrix: Position[] = [];
  x.forEach((_, x: number) => y.forEach((_2, y: number) => matrix.push({ x: x, y: y})));

  const baseColorObject = StaticColorBuilder.getInstance()
      .setBaseColor(chroma.css('green'))
      .build();


  const baseColorBuilder =  NoiseColorBuilder.getInstance()
      .setBaseColor(baseColorObject)

  return matrix.map((position: Position) =>
    addParticule(
        ParticuleBuilder.getInstance()
            .setPosition(
                {
                  x: position.x * particuleWidth,
                  y: position.y * particuleHeight,
                }
            )
            .setSize({width: particuleWidth , height: particuleHeight})
            .setColorBuilder(
                baseColorBuilder.clone()
                    .setBaseColor(
                        chroma.css('green')
                    )
            )
            // .setPositionModifier(
            //     CameraFollower.getInstance()
            //         .setOptions({
            //           cameraPosition: getCameraPosition()
            //         })
            // )
            .build()
    )
  );
}

const createPlayer = () => {
  return [addParticule(
      ParticuleBuilder.getInstance()
          .setPosition({x: 0, y: 0})
          .setSize({width: 50, height: 50})
          .setColorBuilder(
              StaticColorBuilder.getInstance()
                  .setBaseColor(chroma.css('brown'))
          )
          .setPositionModifier(
              CameraFollower.getInstance()
                  .setOptions({
                    cameraPosition: getCameraPosition()
                  })
          )
          .build()
  )]
}

const start = async () => {
  deleteOldParticules();

  // Initialisation du terrain
  const terrain = createTerrain()
  await drawParticules(
      terrain,
      DrawOnceDrawer.getInstance(),
      ColorParticule.getInstance()
  );

  // Initialisation du joueur
  const player = createPlayer();
  drawParticules(
      player,
      AnimationFrameDrawer.getInstance(),
      ColorParticule.getInstance()
          .clone()
          // .setRedrawChecker(
          //     LastPositionChangeRedrawChecker.getInstance()
          // )
  );

  // Initialisation du redraw automatique du terrain
  drawParticules(
      terrain,
      SetIntervalDrawer.getInstance(),
      ColorParticule.getInstance()
  );

  // Initialisation du mouvement de la caméra
  initCameraMovement(50, 50);
}

onMounted(async () => {
  setCanvas(canvas.value.getContext("2d"));
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
