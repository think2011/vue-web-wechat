<template>
  <div class="chat-list-container">
    <virtual-list :item-height="64" :items='$store.getters.chatList'>
      <template scope="props">
        <div class="ext">
        </div>
        <div class="avatar">
          <img
              :src="'/api/wx2'+props.item.HeadImgUrl"
              alt="">
        </div>
        <div class="info">
          <h3 class="name">{{props.item.RemarkName || props.item.NickName}}</h3>
          <p class="msg">暂无</p>
        </div>
      </template>
    </virtual-list>

    <ul class="chat-list">
      <li class="chat-list-item" v-for="item,index in $store.getters.chatList">
      </li>
    </ul>
  </div>
</template>

<script>
  import types from '../store/mutation-types'
  import api from '../api'
  import virtualList from './VirtualList.vue'

  window.COUNT = 1;
  export default {
    components: {
      virtualList
    },

    props: {
      value: Number
    },

    data() {
      return {
        list: [],
        data: {}
      }
    },

    created(){
      for (var i = 0; i < 200; i++) {
        this.list.push({
          title: 'item ' + COUNT++
        });
      }
    },


    methods: {
      setData(data) {
        this.data = data;
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .virtual-item {
    overflow: hidden;
    padding: 12px 18px 11px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    position: relative;

    .avatar {
      float: left;
      margin-right: 10px;
      position: relative;

      img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 2px;
      }
    }

    .info {
      float: left;

      .name {
        font-weight: 400;
        font-size: 13px;
        color: #fff;
        line-height: 20px;
      }

      .msg {
        color: #989898;
        font-size: 13px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        height: 1.5em;
      }
    }
  }
</style>
