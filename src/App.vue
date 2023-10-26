<script setup lang="ts">
import Canvas from "./components/Canvas.vue";
import MatrixDesigner from "./components/MatrixDesigner.vue";


</script>

<template>
  <div id="designer">
    <h1>Matrix Designer</h1>
    <MatrixDesigner/>
  </div>
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
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  #designer {
    position: absolute;
    top: 0;
    left: 0;
    width: 25vw;
    height: 100vh;

    h1 {
      color: white;
      text-align: center;
      font-size: 5rem;
      margin-bottom: 0;
    }
  }

}

</style>
