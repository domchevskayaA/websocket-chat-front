import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueNoty from 'vuejs-noty'

import { globalMethods } from './mixins/common'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueNoty);

Vue.mixin(globalMethods);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

