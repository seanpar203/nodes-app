// Modules.
import Vue from 'vue'
import socketIO from 'socket.io-client';
import VueResource from 'vue-resource';


// Local
import App from './App'
import router from './router'
import bus from './bus';

// Vue Config
Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.http.options.root = 'http://127.0.0.1:5000/api';


// Create new vue instance and bind it el with id app.
/* eslint-disable no-new */
new Vue({
  el:         '#app',
  router,
  template:   '<App/>',
  components: { App }
});


// Create new socket io.
const io = new socketIO('http://localhost:5000/');


// socket io events
io.on('connect', function () {
  console.log('Hello')
});

bus.$on('update', function () {
  console.log('Update.');
});




