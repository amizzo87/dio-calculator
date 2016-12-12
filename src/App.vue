<template>
  <div id="app">
    <div class="container-fluid">
    <div class="row"><projectrow></projectrow></div>
    <br />
    <br />
    <div class="row" style="text-align:center;"><alertrow v-bind:alertObj="alertObj"></alertrow></div>
    <br />
    <div class="row" style="text-align:center;"><label>Required No. of Participants:</label> {{ minParticipants }} </div>
    <div class="row" style="text-align:center;" v-bind:style="countSync"><label>Current No. of Participants:</label> {{ participantCount }} </div>
    <div class="row" style="text-align:center;"><label>Number of Consumer Segments:</label> <input v-model="segments" type="number" min="1" max="5"/></div>
    <br />
    <div class="row"><recruitingrow v-for="n in segments" v-bind:segments="n"></recruitingrow></div>
    <div class="row"><servicesrow></servicesrow></div>
    <div class="row alert alert-success" style="text-align:center; font-size:24px;"><label>Total Price (estimated): ${{ totalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', '') }}</label></div>
    </div>
    </div>
</template>

<script>
import recruitingrow from './components/RecruitingRow'
import projectrow from './components/ProjectRow'
import servicesrow from './components/ServicesRow'
import alertrow from './components/AlertRow'

import eventHub from './main.js'
export default {
  name: 'app',
  props: ['rowPrice'],
  components: {
    recruitingrow,
    projectrow,
    servicesrow,
    alertrow
  },

  data () {
    return {
      segments: 1,
      totalPrice: 0,
      techAdded: null,
      minParticipants: 1,
      participantCount: 1,
      countSync: {},
      nodePrices: [],
      alertObj: {}
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
    minParticipants: function() {
     this.countSync = (this.minParticipants != this.participantCount) ? ({ color:"red" }) : ({color: "green"});


    },
    nodePrices: function () {

    if(this.nodePrices.length > 0) {

      var sumPrice = 0;
      var countParticipants = 0;
        for (var i in this.nodePrices) {
          sumPrice += this.nodePrices[i]["atts"][0]["price"];
          if (this.nodePrices[i]["atts"][0]["participantQty"]) {
          countParticipants += this.nodePrices[i]["atts"][0]["participantQty"];
          }
        }
         this.participantCount = countParticipants;
         this.countSync = (this.minParticipants != this.participantCount) ? ({ color:"red" }) : ({color: "green"});
         var successMsg = 'You have the required number of participants for your project. Great!';
         var errorMsg = 'Your current selected number of participants does not meet the required amount.';
         this.alertObj =
         {
         "class" : (this.minParticipants != this.participantCount) ? ("alert alert-danger") : ("alert alert-success"),
         "content" : (this.minParticipants != this.participantCount ? errorMsg : successMsg),
         "participantCount" : this.participantCount
         }
         this.totalPrice = ( sumPrice == 0 ? this.totalPrice : sumPrice );

         // this.participantCount = countParticipants;

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
      // this.totalPrice = this.totalPrice + (sessionQty * 299);
    },
    adjMinParticipants: function (total) {
      this.minParticipants = total;
    },
    adjParticipantQty: function (qty) {

    }
    },
  created() {
    console.log('created');
    this.totalPrice = 299;
    eventHub.$on('recruitingPrice', this.addPrice);
    eventHub.$on('projectRowPrice', this.addPrice);
    eventHub.$on('servicesRowPrice', this.addPrice);
    eventHub.$on('sessionQty', this.adjSessionQty);
    eventHub.$on('participantQty', this.addPrice)
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
