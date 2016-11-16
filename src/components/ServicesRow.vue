<template>

  <div class="container-fluid" id="servicesrow">

<table class="table">
  <thead>
<tr>
  <th><div class="col-md-4">Add-on Services</div></th>
  <th><div class="col-md-3">Add?</div></th>
  <th><div class="col-md-3"></div></th>
  <th><div class="col-md-2">Price</div></th>
</tr>
</thead>
  <tbody>

  <tr>
  <td><div class="col-md-4">Survey Programming</div></td><td><div class="col-md-3"><select v-model="surveyProgramming"><option value="999">Yes</option><option value="0">No</option></select></div></td><td><div class="col-md-3"></div></td><td><div class="col-md-2">${{surveyProgramming}}</div></td>
</tr>
<tr>
  <td><div class="col-md-4">Report Writing</div></td><td><div class="col-md-3"><select v-model="reportWriting"><option value="1500">Yes</option><option value="0">No</option></select></div></td><td><div class="col-md-3"></div></td><td><div class="col-md-2">${{reportWriting}}</div></td>
</tr>
<tr>
  <td><div class="col-md-4">Discussion Guide</div></td><td><div class="col-md-3"><select v-model="discussionGuide"><option value="500">Yes</option><option value="0">No</option></select></div></td><td><div class="col-md-3"></div></td><td><div class="col-md-2">${{discussionGuide}}</div></td>
</tr>
<tr>
  <td><div class="col-md-4">Moderator Briefing</div></td><td><div class="col-md-3"><select v-model="moderatorBriefing"><option value="500">Yes</option><option value="0">No</option></select></div></td><td><div class="col-md-3"></div></td><td><div class="col-md-2">${{moderatorBriefing}}</div></td>
</tr>
<tr>
  <td><div class="col-md-4">Human Transcription</div></td><td><div class="col-md-3"><select v-model="humanTranscription"><option value="135">Yes</option><option value="0">No</option></select></div></td><td><div class="col-md-3"></div></td><td><div class="col-md-2">${{humanTranscription}}</div></td>
</tr>
<tr>
  <td><div class="col-md-4">Moderation</div></td><td><div class="col-md-3"><select v-model="moderation"><option value="500">Yes</option><option value="0">No</option></select></div></td><td><div class="col-md-3"></div></td><td><div class="col-md-2">${{moderation}}</div></td>
</tr>
</tbody>
  </table>
{{ sumServices }}
  </div>


</template>

<script>
import eventHub from '../main.js'
export default {
  name: 'servicesrow',
  data () {
    return {
      surveyProgramming: 0,
      reportWriting: 0,
      discussionGuide: 0,
      moderatorBriefing: 0,
      humanTranscription: 0,
      moderation: 0,
      totalServices: 0,
      sessionQty: 1
    }
  },
  methods: {
  priceEvent: function (price) {
    eventHub.$emit('servicesRowPrice', {id: "servicesRow", atts: [{ price: price, node: 0, time: new Date().getTime()}]});
    },
  adjSessionQty: function (sessionQty) {
  this.sessionQty = sessionQty;
  }
  },
  watch: {
  totalServices: function() {
        /*
        var sessionPrice = this.sessionQty * 299;
        this.techPrice = sessionPrice;
        this.priceEvent(sessionPrice);
        */

  }
  },
  computed: {
  sumServices: function() {
    var total = +this.surveyProgramming + +this.reportWriting + +this.discussionGuide + +this.moderatorBriefing + +this.humanTranscription + +this.moderation;
    this.priceEvent(total*this.sessionQty);

  }
  },
  created() {

    eventHub.$on('sessionQty', this.adjSessionQty);
  }
}
</script>


