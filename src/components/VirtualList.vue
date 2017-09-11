<template>
  <div class="virtual-list-container" @scroll="handleScroll">
    <ul class="virtual-list" :style="{
      paddingTop: aboveHeight +'px',
      paddingBottom: belowHeight +'px'
    }">
      <li v-for="(item,index) in virtualItems" class="virtual-item">
        <slot
            :item="item"
            :index="index">
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
  import types from '../store/mutation-types'
  import api from '../api'

  export default {
    props: {
      items     : {type: Array, required: true},
      itemHeight: {type: Number, required: true}
    },

    data() {
      return {
        lastScrollTop: null,
        aboveHeight  : 0,
        belowHeight  : 0,
        virtualItems : []
      }
    },

    watch: {
      items() {
        this.handleScroll()
      }
    },

    mounted(){
      this.$nextTick(() => {
        this.init()
        this.handleScroll()
      })
    },

    methods: {
      init(){
        this._screenNum = Math.ceil(this.$el.offsetHeight / this.itemHeight)
        this._aboveNum  = this._screenNum * 2
        this._belowNum  = this._screenNum
      },

      handleScroll(){
        let itemHeight = this.itemHeight
        let _scrollTop = this.$el.scrollTop

        let _form = parseInt(_scrollTop / itemHeight) - this._aboveNum
        if (_form < 0) {
          _form = 0
        }

        let _to = _form + this._aboveNum + this._belowNum + this._screenNum
        if (_to > this.items.length) {
          _to = this.items.length
        }

        this.aboveHeight  = _form * itemHeight
        this.belowHeight  = (this.items.length - _to) * itemHeight
        this.virtualItems = this.items.slice(_form, _to)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .virtual-list-container {
    height: 100%;
    overflow: auto;
  }
</style>
