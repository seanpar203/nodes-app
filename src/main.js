// Modules.
import 'babel-polyfill';
import Vue from 'vue'
import socketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import VueResource from 'vue-resource';

// Local
import App from './App'
import router from './router'

// Socket io instance.
export const io = new socketIO('https://nodes-server.herokuapp.com/');

// Vue Config
Vue.use(VueResource);
Vue.use(VueSocketIO, io);
Vue.config.productionTip = false;
Vue.http.options.root = 'https://nodes-server.herokuapp.com/api';


// Create new vue instance and bind it el with id app.
/* eslint-disable no-new */
new Vue({
  ...App,
  router,
}).$mount('#app');


