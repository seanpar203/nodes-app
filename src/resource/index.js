/**
 * Created by Admin on 04/05/2017.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default new VueResource({
  root: '/'
});
