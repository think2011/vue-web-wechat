<template>
  <div v-show="active" class="tab-container">
    <slot/>
  </div>
</template>

<script>
  import types from '../store/mutation-types'
  import api from '../api'

  export default {
    components: {},

    props: {
      head      : String,
      headActive: String,
      title     : String,
    },

    data() {
      return {
        active: false
      }
    },

    methods: {}
  }
</script>

<style lang="scss" type="text/scss">
</style>
