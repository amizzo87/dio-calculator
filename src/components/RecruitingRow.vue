<template>
  <div class="container-fluid" id="recruitingrow">
    <!-- <ul>
      <li v-for="(sku, index) in skus">
        {{ index }} - {{ sku["Product Name"] }}
      </li>
    </ul> -->

    <!-- Start Consumer Recruiting Quotas -->
    <div class="row">
      <div class="col-md-3">Segment {{segments}}</div>
      <div class="col-md-3"><select v-model="selected" id="skuSelect"><option v-for="(sku, index) in skus" v-if='sku["Product Family"] == "Recruiting"' :value="+index">{{ sku["Product Name"] }}</option></select></div>
      <div class="col-md-2"><input v-model="quantity" type="number" min="1"/></div>
      <div class="col-md-2"><select v-model="translator"><option value="199">Yes</option><option value="0">No</option></select></div>
      <div class="col-md-2">${{ calcPrice }}</div>

    </div>
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
      quantity: 1,
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
    eventHub.$emit('calculatedPrice', { price: price, node: this.segments, time: new Date().getTime()});
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
