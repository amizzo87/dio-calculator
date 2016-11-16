import Vue from 'vue'
import App from './App'


var eventHub = new Vue();
export default eventHub

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
