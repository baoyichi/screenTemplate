import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import * as echarts from 'echarts';
import { decoration12, decoration9, scrollBoard } from '@jiaminghi/data-view';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/common.scss';

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.use(decoration9);
Vue.use(decoration12);
Vue.use(scrollBoard);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
