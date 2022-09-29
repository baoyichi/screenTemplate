<template>
  <div id="echartsContainer">
    <div :id="echartsName" style="width: 400px; height: 200px"></div>
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

  mounted() {
    if (this.echartsName === 'lineCharts') {
      this.initLineEcharts();
    } else if (this.echartsName === 'pieCharts') {
      this.initPieEcharts();
    } else if (this.echartsName === 'barCharts') {
      this.initBarEcharts();
    } else if (this.echartsName === 'radarCharts') {
      this.initRadarEcharts();
    } else if (this.echartsName === 'gaugeCharts') {
      this.initGaugeEcharts();
    }
  }

  initLineEcharts(): void {
    const lineEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    lineEcharts.setOption(this.option);
  }

  initPieEcharts(): void {
    const pieEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    pieEcharts.setOption(this.option);
  }

  initBarEcharts(): void {
    const barEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    barEcharts.setOption(this.option);
  }

  initRadarEcharts(): void {
    const radarEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    radarEcharts.setOption(this.option);
  }

  initGaugeEcharts(): void {
    const gaugeEcharts = this.$echarts.init(document.getElementById(this.echartsName));
    gaugeEcharts.setOption(this.option);
  }
}
</script>

<style scoped lang="scss"></style>
