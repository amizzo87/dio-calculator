<template>
  <div class="col-md-12" id="recruitingrow">

    <table class="table">
      <thead>
      <tr v-show="segments == 1">
        <th>Consumer Segments</th>
        <th>Geography</th>
        <th>No. of Participants</th>
        <th>Translator?</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td style="width:400px;">Segment #{{segments}}</td>
        <td style="width:100px;"><select v-model="selected" id="skuSelect"><option v-for="(sku, index) in skus" v-if='sku["Product Family"] == "Recruiting"' :value="+index">{{ sku["Product Name"] }}</option></select></td>
        <td style="width:50px;"><input v-model="quantity" type="number" min="1"/></td>
        <td><select v-model="translator"><option value="199">Yes</option><option value="0">No</option></select></td>
        <td style="width:50px;">${{ calcPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', '') }}</td>
      </tr>
      </tbody>

      </table>
  </div>
  <!-- End Consumer Recruiting Quotas -->

</template>

<script>
import skus from '../assets/skus.js'
import eventHub from '../main.js'
const holdSkus = skus;
export default {
  name: 'recruitingrow',
  props: ['segments'],
  data () {
    return {
      skus: skus,
      quantity: 0,
      rowPrice: 0,
      selectedSku: 0,
      translator: 0,
      selected: 2
          }
  },
  methods: {
    geoPricing: function (event) {
      console.log(event.target);

    },
    getName: function(index) {
      // return JSON.stringify(this.skus[index]['Product Name']);
      return +index;
    },
    priceEvent: function (price) {
    eventHub.$emit('recruitingPrice', {id: this.segments, atts: [{ price: price, node: this.segments, participantQty: this.quantity, time: new Date().getTime()}] });
    },
    quantityEvent: function (quantity) {
    eventHub.$emit('participantQty', {id: this.segments, atts: [{ price: null, node: this.segments, participantQty: quantity, time: new Date().getTime()}] });
    },
    selected: function () {
    return true;
    }

  },
  watch: {
    selected: function(newVal) {

      if (typeof newVal === 'number') {
      console.log(newVal);
      this.selectedSku = newVal;
      }
      // return document.getElementById('skuSelect')[+newVal].selected = 'selected';
      // return this.skus = holdSkus;
      // return this.skus;
    },

    rowPrice: function (newVal) {
          console.log(newVal);
          this.priceEvent(newVal);

    },
    quantity: function (newVal) {
    console.log('quantity: ' + newVal)
      this.quantityEvent(newVal);
    }

  },
  computed: {

    returnName: function () {
      return this.skus;
    },
    calcPrice: function() {
      if (this.selectedSku) {
      var price = (skus[this.selectedSku]["List Price"] + +this.translator) * this.quantity;
      this.rowPrice = price;
      return price;
      } else {
       return 0;
      }

    }

  }
}

</script>
