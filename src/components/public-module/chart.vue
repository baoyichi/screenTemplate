<template>
  <div class="echartsContainer">
    <div :id="echartsName" style="width: 100%; min-height: 200px; height: 100%;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as echarts from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop({ default: '', type: String })
  echartsName!: string;

  @Prop({ default: {}, type: Object })
  option?: any;

  myCharts: any;

  mounted() {
    if (this.option === undefined) {
      return console.error('option为空');
    }
    this.initEcharts();
    this.setResize();
  }

  initEcharts(): void {
    const myEcharts = echarts.init(document.getElementById(this.echartsName) as HTMLDivElement);
    this.myCharts = myEcharts;
    myEcharts.setOption(this.option);
  }

  setResize(): void {
    window.addEventListener('resize', () => {
      this.myCharts.resize();
    });
  }

  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.myCharts.resize();
    });
  }
}
</script>

<style scoped lang="scss">
.echartsContainer {
  width: 100%;
  height: 100%;
}
</style>
