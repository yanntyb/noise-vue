<script setup lang="ts">
import Canvas from "./components/Canvas.vue";


</script>

<template>
  <Suspense>
    <Canvas/>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<style lang="scss">

#app{
  background-color: black;
}

</style>
