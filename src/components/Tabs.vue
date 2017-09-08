<template>
  <div class="tabs-container">
    <ul class="tab-list">
      <li v-for="item in tabs"
          :class="{active:item.active}"
          :title="item.title">
        <a v-html="item.active ? (item.headActive || item.head) : item.head"
           @click="selectTab(item)"
           href="javascript:"></a>
      </li>
    </ul>

    <div class="tab-content">
      <slot/>
    </div>
  </div>
</template>

<script>
  import types from '../store/mutation-types'
  import api from '../api'

  export default {
    components: {},

    props: {
      value: Number
    },

    data() {
      return {
        tabs: []
      }
    },

    created(){
      this.tabs = this.$children
    },

    mounted(){
      this.selectTab(this.tabs[this.value || 0])
    },

    methods: {
      selectTab(tab) {
        this.tabs.forEach((item) => item.active = false)
        tab.active = true

        this.$emit('input', this.tabs.indexOf(tab))
        this.$emit('change', tab)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .tabs-container {
    &.skin-nav {
      .tab-list {
        padding-bottom: 4px;
        position: relative;
        overflow: hidden;

        &:after {
          content: '';
          position: absolute;
          border-bottom: 1px solid #24272c;
          height: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        li {
          float: left;
          width: 33.3333%;
          text-align: center;
          position: relative;

          &:not(:last-child):after {
            content: '';
            position: absolute;
            top: 7px;
            right: 0;
            width: 0;
            height: 20px;
            border-right: 1px solid #24272c;
          }

          a {
            display: block;
          }
        }
      }
    }
  }
</style>
