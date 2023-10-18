<script setup lang="ts">

import {computed} from "vue";

const props = defineProps({
  size: {
    type: Number,
    required: true,
  }
});

const getSize = computed(() => props.size + 'px');

</script>

<template>
  <div id="canvas-container">
    <div id="canvas">
      <slot/>
    </div>
  </div>
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

  #canvas {
    position: relative;
    width: v-bind(getSize);
    height: v-bind(getSize);
    background-color: black;
  }
}

</style>
