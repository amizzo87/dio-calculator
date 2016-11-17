<template>

  <div class="container-fluid" id="servicesrow">

<table class="table">
  <thead>
<tr>
  <th>Add-on Services</th>
  <th>Include?</th>
  <th></th>
  <th>Price (per session)</th>
</tr>
</thead>
  <tbody>

  <tr>
  <td>Survey Programming</td><td><select v-model="surveyProgramming"><option value="999">Yes</option><option value="0">No</option></select></td><td></td><td>${{surveyProgramming}}</td>
</tr>
<tr>
  <td>Report Writing</td><td><select v-model="reportWriting"><option value="1500">Yes</option><option value="0">No</option></select></td><td></td><td>${{reportWriting}}</td>
</tr>
<tr>
  <td>Discussion Guide</td><td><select v-model="discussionGuide"><option value="500">Yes</option><option value="0">No</option></select></td><td></td><td>${{discussionGuide}}</td>
</tr>
<tr>
  <td>Moderator Briefing</td><td><select v-model="moderatorBriefing"><option value="500">Yes</option><option value="0">No</option></select></td><td></td><td>${{moderatorBriefing}}</td>
</tr>
<tr>
  <td>Human Transcription</td><td><select v-model="humanTranscription"><option value="135">Yes</option><option value="0">No</option></select></td><td></td><td>${{humanTranscription}}</td>
</tr>
<tr>
  <td>Moderation</td><td><select v-model="moderation"><option value="500">Yes</option><option value="0">No</option></select></td><td></td><td>${{moderation}}</td>
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


