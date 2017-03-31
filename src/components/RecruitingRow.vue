<template>
  <div class="col" id="recruitingrow">

    <table class="table table-sm" :table-id="segments">
      <!-- <thead v-show="segments == 1">
      <tr>
        <th>Consumer Segments</th>
        <th>Geography</th>
        <th>No. of Participants</th>
        <th>Translator?</th>
        <th>Price</th>
      </tr>
      </thead> -->
      <tbody>
      <tr>
        <td style="/*width:400px;*/">Group #{{segments}}</td>
        <td style="/*width:100px;*/"><select v-model="selected" id="skuSelect" class="geography"><option name="disabled" disabled>Select geography</option><option v-for="(sku, index) in skus" v-if='sku["Product Family"] == "Recruiting"' :value="+index">{{ sku["Product Name"].replace("Recruiting - ", '') }}</option></select></td>
        <td style="/*width:100px;*/"><input v-model="quantity" type="number" min="1" placeholder="# of Participants"/></td>
        <td><select id="translation" v-model="translator"><option name="translation" disabled>Translation</option><option v-for="(sku, index) in skus" v-if='sku["Product Family"] == "Translation"' :value='sku["List Price"]'>{{ sku["Product Name"] }}</option></select></td>
        <td style="min-width:50px;">${{ calcPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', '') }}</td>
      </tr>
      </tbody>

      </table>
  </div>
  <!-- End Consumer Recruiting Quotas -->
</template>

<script>
var _ = require('lodash');
import paygSkus from '../assets/paygSkus.js'
import subSkus from '../assets/subSkus.js'

import eventHub from '../main.js'
export default {
  name: 'recruitingrow',
  props: ['segments', 'priceSetting', 'currentSessionQty'],
  data () {
    return {
      quantity: null,
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
          // console.log(newVal);

          this.priceEvent(newVal);

    },
    quantity: function (newVal) {
      this.quantityEvent(newVal);
    }

  },
  computed: {

    returnName: function () {
      return this.skus;
    },
    calcPrice: function() {
      if (this.selectedSku) {
      var price = (this.skus[this.selectedSku]["List Price"] * this.quantity) + (+this.translator * +this.currentSessionQty);
      this.rowPrice = price;
      return price;
      } else {
       return 0;
      }

    },
    skus: function () {
      return _.sortBy((this.priceSetting == 0 ? paygSkus : subSkus), ['Product Name']);

    }

  },
  created() {
  /*$("#skuSelect option[name='disabled']").each.attr()
  if (document.getElementById("skuSelect")) {
  document.querySelectorAll("#skuSelect").options.namedItem("disabled").selected=true;
  }
  var elements = document.getElementsByClassName("geography");
  for(var i=0; i<elements.length; i++) {
      elements[i].options.namedItem("disabled").selected=true;
  }
  */
  // $("#skuSelect option[name='disabled']").attr("selected", "selected");
  },
  mounted() {

  $("table[table-id='"+this.segments+"'] #skuSelect option[name='disabled']").attr("selected", "selected");
    $("table[table-id='"+this.segments+"'] #translation option[name='translation']").attr("selected", "selected");
  // $("#translation option[name='translation']").attr("selected", "selected");
  }
}

</script>
