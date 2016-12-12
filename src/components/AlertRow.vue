<template name="alertrow">
    <div :class="(alertObj.participantCount == 0 ? alertObj.defaultClass : alertObj.class)" role="alert">
      {{ alertObj.participantCount == 0 ? alertObj.defaultContent : alertObj.content }}
    </div>
</template>

<script>
  import eventHub from '../main.js'

  export default {
    name: 'alertrow',
    props: ['alertObj'],
    data () {
      return {
      test : 'test'
      }
    }
  }
</script>
