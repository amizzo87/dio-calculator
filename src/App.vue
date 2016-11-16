<template>
  <div id="app">
    <img src="./assets/logo.png">
    <projectrow></projectrow>
  <br />
    <input v-model="segments" type="number" min="1"/><
    <div class="row">
      <div class="col-md-3">Consumer Segments</div>
      <div class="col-md-3">Geography</div>
      <div class="col-md-2">Quantity</div>
      <div class="col-md-2">Translator?</div>
      <div class="col-md-2">Price</div>
    </div>
    <recruitingrow v-for="n in segments" v-bind:segments="n"></recruitingrow>
    <!-- <div class="col-md-2">${{ totalPrice }}</div> -->
  </div>
</template>

<script>
import recruitingrow from './components/RecruitingRow'
import projectrow from './components/ProjectRow'
import servicesrow from './components/ServicesRow'

import eventHub from './main.js'
export default {
  name: 'app',
  props: ['rowPrice'],
  components: {
    recruitingrow,
    projectrow,
    servicesrow
  },

  data () {
    return {
      segments: 1,
      totalPrice: 0,
      nodePrices: []
    }
    },
    methods: {
    addPrice: function (newPrice) {
    console.log(newPrice);
    this.nodePrices.push(newPrice);

    }
    },
  created() {
  console.log('created');
    eventHub.$on('calculatedPrice', this.addPrice);

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
