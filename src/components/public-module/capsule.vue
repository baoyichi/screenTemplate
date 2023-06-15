<template>
  <div id="container">
    <dv-capsule-chart :config="config" style="width: 300px; height: 200px" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Capsule extends Vue {
  config = {
    data: [
      {
        name: '南阳',
        value: 167
      },
      {
        name: '周口',
        value: 67
      },
      {
        name: '漯河',
        value: 123
      },
      {
        name: '郑州',
        value: 55
      },
      {
        name: '西峡',
        value: 98
      }
    ]
  };
}
</script>

<style scoped lang="scss">
#container {
  margin: 0 auto;
}

.dv-capsule-chart {
  color: rgba(255, 255, 255, 0.85);
}
</style>
