<template>
  <div class="map-body">
    <div id="tdOlMap" :style="{ height: offsetHeight, width: offsetWidth }"></div>
  </div>
</template>

<script lang="ts" src="ol-map.ts"></script>

<style scoped>
.map-body {
  padding: 0 10px;
}
</style>
