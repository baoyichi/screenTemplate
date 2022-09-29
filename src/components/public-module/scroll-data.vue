<template>
  <div id="container">
    <dv-scroll-board :config="formData" style="width: 400px; height: 252px" />
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
.dv-scroll-board {
  color: rgba(0, 0, 0, 0.85);
}
</style>
