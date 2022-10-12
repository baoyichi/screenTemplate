<template>
  <div class="home">
    <div class="wrap-responsive">
      <div class="wrap-items left">
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
              <chart :echarts-name="'barCharts'" :option="barOption"></chart>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-items center">
        <div ref="map" class="wrap-items-box map">
          <ol-map :current-map="isLayoutOne"></ol-map>
        </div>
        <div class="wrap-items-box">
          <div class="wrap-items-box-card">
            <div class="card-head">
              <div class="card-head-title">标题</div>
            </div>
            <div class="card-body center-card-body">
              <div class="wrap-items-box-card">
                <chart :echarts-name="'circleCharts'" :option="circleOption"></chart>
              </div>
              <div class="wrap-items-box-card">
                <chart :echarts-name="'areaCharts'" :option="areaOption"></chart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-items right">
        <div class="wrap-items-box">
          <div class="wrap-items-box-card">
            <div class="card-head">
              <div class="card-head-title">标题</div>
            </div>
            <div class="card-body">
              <circle-decoration></circle-decoration>
            </div>
          </div>
        </div>
        <div class="wrap-items-box">
          <div class="wrap-items-box-card">
            <div class="card-head">
              <div class="card-head-title">标题</div>
            </div>
            <div class="card-body">
              <scroll-data :formData="formData"></scroll-data>
            </div>
          </div>
        </div>
        <div class="wrap-items-box">
          <div class="wrap-items-box-card">
            <div class="card-head">
              <div class="card-head-title">标题</div>
            </div>
            <div class="card-body">
              <capsule></capsule>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Chart from '@/components/public-module/chart.vue';
import OlMap from '@/components/td-ol-map/ol-map.vue';
import CircleDecoration from '@/components/public-module/circle-decoration.vue';
import ScrollData from '@/components/public-module/scroll-data.vue';
import Capsule from '@/components/public-module/capsule.vue';

@Component({
  components: {
    Capsule,
    ScrollData,
    CircleDecoration,
    'ol-map': OlMap,
    Chart
  }
})
export default class Home extends Vue {
  /**
   * 中间地图被框起来的模式
   */
  isLayoutOne = true;
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
  barOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      right: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
    },
    series: [
      {
        name: '2021',
        type: 'bar',
        data: [182, 234, 290, 1049, 1317, 6302]
      },
      {
        name: '2022',
        type: 'bar',
        data: [193, 234, 310, 1215, 1341, 6818]
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
  areaOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct']
    },
    toolbox: {
      show: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
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
}
</script>
