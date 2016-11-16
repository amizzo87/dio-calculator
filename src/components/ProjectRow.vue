<template>
  <div class="container-fluid" id="recruitingrow">
    <div class="row">
      <div class="col-md-3"><label>Participants per Session</label>
        <select>
          <option value="1">1 Consumer (1v1)</option>
          <option value="2">2 Consumers (Dyad)</option>
          <option value="3">3 Consumers (Triad)</option>
          <option value="4">4 Consumers (Focus Group)</option>
          <option value="5">5 Consumers (Focus Group)</option>
          <option value="6">6 Consumers (Focus Group)</option>
        </select>
      </div>
      </div>
    <div class="row">
      <div class="col-md-3">
    <label>Quantity of Sessions</label>
      <input v-model="sessionQty" type="number" min="1" />
    </div>
      <div class="col-md-6"></div>
      <div class="col-md-3"><label>Technology and Hosting</label>${{ techPrice }} </div>
      </div>
</div>
</template>

<script>
import eventHub from '../main.js'

export default {
  name: 'projectrow',
  data () {
    return {
      techPrice: 0,
      sessionQty: 1
    }
  },
  calculated: {
  sumPrice: function () {
    this.techPrice = this.sessionQty * 299;

  }

  }
}
</script>


