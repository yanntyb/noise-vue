<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useCanvasStore} from "./store/canvasStore.ts";
import NoiseColorBuilder from "./src/Color/Builder/NoiseColorBuilder.ts";
import ParticuleBuilder from "./src/Particule/ParticuleBuilder.ts";
const {setCanvas, getCanvas, getParticules} = useCanvasStore();

const canvas = ref(null);
onMounted(() => {
  setCanvas(canvas.value.getContext("2d"));

  const t = getCanvas();

  const particules = getParticules();


  function step(timeStamp) {
    particules.forEach((particule) => {
      const color = NoiseColorBuilder.create()
          .setX(particule.position.x * timeStamp)
          .setY(particule.position.y * timeStamp)
          .build();
      t.value.fillStyle = color.hex();
      t.value.fillRect(particule.position.x, particule.position.y, particule.size.width, particule.size.height);

    });
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);

})





</script>

<template>
  <canvas width="500" height="500" id="canvas" ref="canvas">
    <template :id="'x'+x" v-for="x in 50">
        <template :id="'y'+y" v-for="y in 50">
          <component :id="'particule'+ y + '-' + x" :is="() => ParticuleBuilder.create()
                    .setPosition(
                        {
                          x: ((x) * 100 / 10) - 10,
                          y: ((y) * 100 / 10) - 10
                        }
                    )
                    .setSize({width: 10 , height: 10})
                    .build()"/>
        </template>
    </template>
  </canvas>
</template>
<style lang="scss">


</style>
