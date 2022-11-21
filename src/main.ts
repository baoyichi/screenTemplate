import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Button, Input, Form, FormItem } from 'element-ui';
import { decoration12, decoration9, scrollBoard, capsuleChart, scrollRankingBoard } from '@jiaminghi/data-view';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/common.scss';

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(decoration9);
Vue.use(decoration12);
Vue.use(scrollBoard);
Vue.use(capsuleChart);
Vue.use(scrollRankingBoard);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
