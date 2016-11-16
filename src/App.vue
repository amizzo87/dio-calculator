<template>
  <div id="app">
    <projectrow></projectrow>
  <br />
    <input v-model="segments" type="number" min="1"/>
    <div class="row">
      <div class="col-md-3">Consumer Segments</div>
      <div class="col-md-3">Geography</div>
      <div class="col-md-2">Quantity</div>
      <div class="col-md-2">Translator?</div>
      <div class="col-md-2">Price</div>
    </div>
    <recruitingrow v-for="n in segments" v-bind:segments="n"></recruitingrow>
    <servicesrow></servicesrow>
    <div class="col-md-2"><label>Total Price (estimated) ${{ totalPrice }}</label></div>
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
    watch: {
    segments: function (newVal, oldVal) {
    if (oldVal > newVal) {

    this.nodePrices = this.nodePrices.filter(function(el) {
          return el.id !== oldVal;
        });

    }
    },
    nodePrices: function () {

    if(this.nodePrices.length > 0) {
    var sumPrice = 0;
      for (var i in this.nodePrices) {
        sumPrice += this.nodePrices[i]["atts"][0]["price"];
      }
      this.totalPrice = sumPrice;
    }
    }
    },

    methods: {
    addPrice: function (newPrice) {
    // console.log(newPrice);


      if(this.nodePrices.length > 0) {
      for (var i in this.nodePrices) {
        this.nodePrices = this.nodePrices.filter(function(el) {
          return el.id !== newPrice.id;
        });
      }
      }
      this.nodePrices.push(newPrice);


    }
    },
  created() {
  console.log('created');
    eventHub.$on('recruitingPrice', this.addPrice);
    eventHub.$on('projectRowPrice', this.addPrice);
    eventHub.$on('servicesRowPrice', this.addPrice);
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
