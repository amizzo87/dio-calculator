import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'


var eventHub = new Vue();
export default eventHub

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    price: 0,
    pricebook: 0,
    config: [
      {}
    ]
  },
  mutations: {
    increment(state, n) {
      state.price += n;
    },
    decrement(state, n) {
      state.price -=n;
    },
    setPricebook(state, n) {
      state.pricebook = n;
    }

  }

})

export { store }
