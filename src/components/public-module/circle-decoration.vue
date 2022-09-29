<template>
  <div id="container">
    <dv-decoration-9 style="width:150px;height:150px;">66%</dv-decoration-9>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CircleDecoration extends Vue {}
</script>

<style scoped lang="scss">
#container {
  flex: 0 1 50%;
}

.dv-decoration-9 {
  margin: 0 auto;
}
</style>
