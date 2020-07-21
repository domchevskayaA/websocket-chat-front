import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueNoty from 'vuejs-noty'


import { requests } from './mixins/requests'
import { globalMethods } from './mixins/common'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueNoty);

Vue.mixin(requests);
Vue.mixin(globalMethods);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

