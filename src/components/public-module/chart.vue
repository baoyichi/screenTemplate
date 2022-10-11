<template>
  <div class="echartsContainer">
    <div :id="echartsName" style="width: 100%; min-height: 200px; height: 100%;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Chart extends Vue {
  private $echarts: any;

  @Prop({ default: '', type: String })
  echartsName!: string;

  @Prop({ default: {}, type: Object })
  option?: {};

  myCharts: any;

  mounted() {
    this.initLineEcharts();
    this.initPieEcharts();
    this.initBarEcharts();
    this.initCircleEcharts();
    this.initAreaEcharts();
    this.setResize();
  }

  initLineEcharts(): void {
    const lineEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    this.myCharts = lineEcharts;
    lineEcharts.setOption(this.option);
  }

  initPieEcharts(): void {
    const pieEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    this.myCharts = pieEcharts;
    pieEcharts.setOption(this.option);
  }

  initBarEcharts(): void {
    const barEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    this.myCharts = barEcharts;
    barEcharts.setOption(this.option);
  }

  initCircleEcharts(): void {
    const circleEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    this.myCharts = circleEcharts;
    circleEcharts.setOption(this.option);
  }

  initAreaEcharts(): void {
    const areaEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    this.myCharts = areaEcharts;
    areaEcharts.setOption(this.option);
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
