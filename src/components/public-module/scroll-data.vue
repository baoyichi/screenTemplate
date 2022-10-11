<template>
  <div id="container">
    <dv-scroll-board :config="formData" style="width: 100%; height: 252px" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ScrollData extends Vue {
  @Prop({ default: '', type: Object })
  formData?: {};
}
</script>

<style scoped lang="scss">
#container {
  width: 100%;
}
.dv-scroll-board {
  color: rgba(0, 0, 0, 0.85);
}
</style>
