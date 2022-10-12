<template>
  <div class="home layout-two">
    <div ref="mapTwo" class="wrap-items-box map">
      <ol-map :current-map="isLayoutOne"></ol-map>
    </div>
    <div class="layout-wrap layout-wrap-left">
      <div class="wrap-items-box">
        <div class="wrap-items-box-card">
          <div class="card-head">
            <div class="card-head-title">标题</div>
          </div>
          <div class="card-body">
            <dv-scroll-ranking-board :config="config" style="width: 500px; height: 200px" />
          </div>
        </div>
      </div>
      <div class="wrap-items-box">
        <div class="wrap-items-box-card">
          <div class="card-head">
            <div class="card-head-title">标题</div>
          </div>
          <div class="card-body">
            <chart :echarts-name="'lineCharts'" :option="lineOption"></chart>
          </div>
        </div>
      </div>
      <div class="wrap-items-box">
        <div class="wrap-items-box-card">
          <div class="card-head">
            <div class="card-head-title">标题</div>
          </div>
          <div class="card-body">
            <chart :echarts-name="'circleCharts'" :option="circleOption"></chart>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-wrap layout-wrap-right">
      <div class="wrap-items-box">
        <div class="wrap-items-box-card">
          <div class="card-head">
            <div class="card-head-title">标题</div>
          </div>
          <div class="card-body">
            <dv-scroll-ranking-board :config="config" style="width: 500px; height: 200px" />
          </div>
        </div>
      </div>
      <div class="wrap-items-box">
        <div class="wrap-items-box-card">
          <div class="card-head">
            <div class="card-head-title">标题</div>
          </div>
          <div class="card-body">
            <chart :echarts-name="'pieCharts'" :option="pieOption"></chart>
          </div>
        </div>
      </div>
      <div class="wrap-items-box">
        <div class="wrap-items-box-card">
          <div class="card-head">
            <div class="card-head-title">标题</div>
          </div>
          <div class="card-body">
            <scroll-data :formData="formData" :layout-two="'second'"></scroll-data>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OlMap from '@/components/td-ol-map/ol-map.vue';
import Chart from '@/components/public-module/chart.vue';
import ScrollData from '@/components/public-module/scroll-data.vue';

@Component({
  components: {
    OlMap,
    Chart,
    ScrollData
  }
})
export default class Home1 extends Vue {
  /**
   * 中间地图作为背景的模式
   */
  isLayoutOne = false;
  config = {
    data: [
      {
        name: '周口',
        value: 55123
      },
      {
        name: '南阳',
        value: 12022
      },
      {
        name: '西峡',
        value: 78932
      },
      {
        name: '驻马店',
        value: 63411
      },
      {
        name: '新乡',
        value: 44231
      }
    ],
    unit: '单位',
    valueFormatter({ value }) {
      console.warn(arguments);
      const reverseNumber = (value + '').split('').reverse();
      let valueStr = '';

      while (reverseNumber.length) {
        const seg = reverseNumber.splice(0, 3).join('');
        valueStr += seg;
        if (seg.length === 3) valueStr += ',';
      }

      return valueStr.split('').reverse().join('');
    }
  };
  lineOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      show: false
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };
  circleOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '65%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' }
        ]
      }
    ]
  };
  pieOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        center: ['50%', '65%'], //  饼状图只能通过center来调整上下边距
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  formData = {
    oddRowBGC: 'transparent',
    evenRowBGC: 'transparent',
    header: ['列1', '列2', '列3'],
    data: [
      ['行1列1', '行1列2', '行1列3'],
      ['行2列1', '行2列2', '行2列3'],
      ['行3列1', '行3列2', '行3列3'],
      ['行4列1', '行4列2', '行4列3'],
      ['行5列1', '行5列2', '行5列3'],
      ['行6列1', '行6列2', '行6列3'],
      ['行7列1', '行7列2', '行7列3'],
      ['行8列1', '行8列2', '行8列3'],
      ['行9列1', '行9列2', '行9列3'],
      ['行10列1', '行10列2', '行10列3']
    ],
    index: true,
    columnWidth: [50],
    align: ['center']
  };

  mounted() {
    const appWrap = this.$refs.mapTwo as HTMLDivElement;
    appWrap.style.height = document.body.scrollHeight - 105 + 'px';
  }
}
</script>
<style scoped lang="scss">
.layout-two {
  padding: 0;
  height: auto;
  position: relative;

  .map {
    height: calc(100vh - 81px);
    width: 100%;
  }

  .layout-wrap {
    position: absolute;
    top: 0;
    height: auto;
    width: 470px;
    margin-top: 24px;

    .wrap-items-box {
      background-color: rgba(0, 0, 0, 0.3);

      .card-head {
        color: #ffffff;
      }

      ::v-deep {
        .dv-scroll-ranking-board .ranking-info .info-name {
          text-align: left;
        }
      }
    }
  }

  .layout-wrap-left {
    left: 0;
    padding-left: 24px;
  }

  .layout-wrap-right {
    right: 0;
    padding-right: 24px;
  }
}
</style>
