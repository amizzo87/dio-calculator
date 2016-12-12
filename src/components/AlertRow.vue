<template name="alertrow">
    <div :class="alertObj.class" role="alert" v-show="alertObj.participantCount != 0">
      {{ alertObj.content }}
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
