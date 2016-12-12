<template>
  <div class="col-md-12 table-responsive" id="recruitingrow">
    <table class="table">
      <thead>
      <th>Participants per Session</th>
      <th>Quantity of Sessions</th>
      <th>Technology and Hosting</th>
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
        <td>${{ techPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', '') }}</td>
      </tr>
      </tbody>
      </table>
      </div>
</template>

<script>
import eventHub from '../main.js'

export default {
  name: 'projectrow',
  data () {
    return {
      techPrice: 299,
      sessionQty: 1,
      participants: 1
    }
  },
  methods: {
  priceEvent: function (price) {
    eventHub.$emit('projectRowPrice', {id: 0, atts: [{ price: price, node: 0, time: new Date().getTime()}]});
    eventHub.$emit('sessionQty', this.sessionQty);

    },
    participantEvent: function (val) {
    eventHub.$emit('minParticipants', val);
    }
  },
  watch: {
  sessionQty: function() {
        var sessionPrice = this.sessionQty * 299;
        this.techPrice = sessionPrice;
        this.priceEvent(sessionPrice);
        this.participantEvent(this.sessionQty * this.participants);

  },
  participants: function (newVal, oldVal) {
  this.participants = newVal;
  this.participantEvent(this.sessionQty * this.participants);

  // this.broadcastEvent();
  }
  },
  calculated: {
  sumPrice: function () {
    // return this.techPrice = this.sessionQty * 299;

  }

  },
  created() {
  eventHub.$emit('projectRowPrice', {id: 0, atts: [{ price: 299, node: 0, time: new Date().getTime()}]});

  }


}
</script>


