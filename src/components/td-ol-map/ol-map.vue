<template>
  <div class="map-body">
    <div id="tdOlMap" v-if="currentMap" style="width: 100%; height: 100%"></div>
    <div id="tdOlMapSecond" v-else style="width: 100%; height: 100%"></div>
  </div>
</template>

<script src="./ol-map.ts"></script>

<style scoped>
.map-body {
  width: 100%;
  height: 100%;
}
</style>
