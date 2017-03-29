<template>
  <div class="col" id="recruitingrow">
    <table class="table table-sm">
      <thead>
      <th>Participants per Session</th>
      <th>Quantity of Sessions</th>
      <th>Technology and Hosting</th>
      <th>Project Setup Fee</th>
      </thead>
      <tbody>
      <tr>
        <td><select v-model="participants">
          <option value="1">1 Consumer (1v1)</option>
          <option value="2">2 Consumers (Dyad)</option>
          <option value="3">3 Consumers (Triad)</option>
          <option value="4">4 Consumers (Focus Group)</option>
          <option value="5">5 Consumers (Focus Group)</option>
          <option value="6">6 Consumers (Focus Group)</option>
        </select></td>
        <td><input v-model="sessionQty" type="number" min="1" /></td>
        <td>${{ (techPrice * sessionQty).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', '') }}</td>
        <td>${{ (participants == 1 ? idiFee : focusGroupFee).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', '') }}</td>
      </tr>
      </tbody>
      </table>
      </div>
</template>

<script>
import eventHub from '../main.js'
import paygSkus from '../assets/paygSkus.js'
import subSkus from '../assets/subSkus.js'
import { store } from '../main.js'

export default {
  name: 'projectrow',
  props: ['priceSetting'],
  data () {
    return {
      techPrice: (this.priceSetting == 0 ? paygSkus.filter(function( obj ) { return obj["Product Name"] == 'Tech and Hosting' })[0]["List Price"] : subSkus.filter(function( obj ) { return obj["Product Name"] == 'Tech and Hosting' })[0]["List Price"]),
      sessionQty: 1,
      participants: 1,
      idiFee: (this.priceSetting == 0 ? paygSkus.filter(function( obj ) { return obj["Product Name"] == 'Individual Depth Interview (IDI)' })[0]["List Price"] : subSkus.filter(function( obj ) { return obj["Product Name"] == 'Individual Depth Interview (IDI)' })[0]["List Price"]),
      focusGroupFee: (this.priceSetting == 0 ? paygSkus.filter(function( obj ) { return obj["Product Name"] == 'Focus Group' })[0]["List Price"] : subSkus.filter(function( obj ) { return obj["Product Name"] == 'Focus Group' })[0]["List Price"])
    }
  },
  methods: {
  priceEvent: function (price) {
    // store.commit('increment', price);
    // store.state.config.push({price: price});
    eventHub.$emit('projectRowPrice', {id: 0, atts: [{ price: price, node: 0, time: new Date().getTime()}]});
    eventHub.$emit('sessionQty', this.sessionQty);

    },
    participantEvent: function (val) {
    eventHub.$emit('minParticipants', val);
    }
  },
  watch: {
  sessionQty: function() {
        //var sessionPrice = this.sessionQty * 299;
        //this.techPrice = sessionPrice;
        // this.priceEvent(sessionPrice);

        var sessionTypeFee = (this.participants == 1 ? this.idiFee : this.focusGroupFee);
        var rowTotalWithFee = (sessionTypeFee + (this.techPrice * this.sessionQty));
        this.priceEvent(rowTotalWithFee);
        this.participantEvent(this.sessionQty * this.participants);

  },
  participants: function (newVal, oldVal) {
    this.participants = newVal;
    this.participantEvent(this.sessionQty * this.participants);
    var sessionTypeFee = (this.participants == 1 ? this.idiFee : this.focusGroupFee);
    var rowTotalWithFee = (sessionTypeFee + (this.techPrice * this.sessionQty));
    this.priceEvent(rowTotalWithFee);
    // this.broadcastEvent();
  },
    priceSetting: function(newVal, oldVal) {
      this.techPrice = (this.priceSetting == 0 ? paygSkus.filter(function( obj ) { return obj["Product Name"] == 'Tech and Hosting' })[0]["List Price"] : subSkus.filter(function( obj ) { return obj["Product Name"] == 'Tech and Hosting' })[0]["List Price"]);
      this.idiFee = (this.priceSetting == 0 ? paygSkus.filter(function( obj ) { return obj["Product Name"] == 'Individual Depth Interview (IDI)' })[0]["List Price"] : subSkus.filter(function( obj ) { return obj["Product Name"] == 'Individual Depth Interview (IDI)' })[0]["List Price"]);
      this.focusGroupFee = (this.priceSetting == 0 ? paygSkus.filter(function( obj ) { return obj["Product Name"] == 'Focus Group' })[0]["List Price"] : subSkus.filter(function( obj ) { return obj["Product Name"] == 'Focus Group' })[0]["List Price"]);


      this.priceEvent((this.techPrice * this.sessionQty) + (this.participants == 1 ? this.idiFee : this.focusGroupFee));

     if (newVal > oldVal) {

     }
    }
  },
  calculated: {
  sumPrice: function () {
    // return this.techPrice = this.sessionQty * 299;

  }

  },
  created() {
  eventHub.$emit('projectRowPrice', {id: 0, atts: [{ price: this.techPrice + (this.participants == 1 ? this.idiFee : this.focusGroupFee), node: 0, time: new Date().getTime()}]});

  }


}
</script>


