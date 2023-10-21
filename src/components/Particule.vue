<script setup lang="ts">
import {PropType, onMounted} from 'vue';
import {useCanvasStore} from "../store/canvasStore.ts";
import {Position, Size} from "../src/Particule/ParticuleBuilder.ts";
import ColorBuilder from "../src/Color/ColorBuilderInterface.ts";
const {addParticule} = useCanvasStore();
const props = defineProps({
  position: {
    type: Object as PropType<Position>,
    required: false,
    default: () => ({x: 0, y: 0})
  },
  size: {
    type: Object as PropType<Size>,
    required: false,
    default: () => ({width: 10, height: 10})
  },

  color: {
    type: Object as PropType<ColorBuilder>,
    required: true,
  }
});



onMounted(() => {
  addParticule({
    position: props.position,
    size: props.size,
    color: props.color,
  })
});

</script>
<template></template>
