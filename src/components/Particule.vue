<script setup lang="ts">
import {ref, PropType, Ref, onMounted} from 'vue';
import NoiseColorBuilder from "../src/Color/Builder/NoiseColorBuilder.ts";
import {useCanvasStore} from "../store/canvasStore.ts";
import {Position, Size} from "../src/Particule/ParticuleBuilder.ts";
import {Color} from "chroma-js";
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
    type: Object as PropType<Ref<Color>>,
    required: false,
    default: () => ref(NoiseColorBuilder.create().setX(0).setY(0).build())
  }
});

export type ParticuleType = {
  position: Position;
  size: Size;
  color: Ref<Color>;
};

onMounted(() => {

  const color = props.color;

  addParticule({
    position: props.position,
    size: props.size,
    color: color,
  })
});

</script>
<template></template>
