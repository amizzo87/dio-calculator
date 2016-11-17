<template>
  <div id="app">
    <projectrow></projectrow>
    <br />
    <br />
    <div style="text-align:center;"><label>Minimum No. of Participants:</label> {{ minParticipants }} </div>
    <div style="text-align:center;"><label>Number of Consumer Segments:</label> <input v-model="segments" type="number" min="1" max="5"/></div>
    <br />
    <recruitingrow v-for="n in segments" v-bind:segments="n"></recruitingrow>
    <servicesrow></servicesrow>
    <div style="text-align:center;"><label>Total Price (estimated): ${{ totalPrice }}</label></div>
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
      totalPrice: 299,
      minParticipants: 1,
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
      // this.totalPrice = ( sumPrice == 0 ? this.totalPrice : sumPrice );
      this.totalPrice = ( sumPrice < 299 ? sumPrice + 299 : sumPrice );

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


    },
    adjSessionQty: function (sessionQty) {

    },
    adjMinParticipants: function (total) {
      this.minParticipants = total;
    }
    },
  created() {
    console.log('created');
    eventHub.$on('recruitingPrice', this.addPrice);
    eventHub.$on('projectRowPrice', this.addPrice);
    eventHub.$on('servicesRowPrice', this.addPrice);
    eventHub.$on('sessionQty', this.adjSessionQty);
    eventHub.$on('minParticipants', this.adjMinParticipants);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 60px;
}
</style>
