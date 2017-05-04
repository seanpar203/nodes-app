// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource';
import VueSocketio from 'vue-socket.io';
import App from './App'
import router from './router'

Vue.use(VueResource);
Vue.use(VueSocketio, 'http://127.0.0.1:5000');
Vue.config.productionTip = false;
Vue.http.options.root = 'http://127.0.0.1:5000/api';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
