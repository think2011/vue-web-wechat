<template>
  <div v-bar="{useScrollbarPseudo:true}" class="chat-list-container">
    <ul class="chat-list">
      <li class="chat-list-item" v-for="item in $store.state.contactList">
        <div class="ext">
        </div>
        <div class="avatar">
          <img
              :src="'/api/wx2/cgi-bin/mmwebwx-bin/webwxgeticon?seq=446987438&username=@ef92f43056fdbea9ea769fd7ce9a19fd9a76edaedff85d1321820aeb3fdfc81e&skey=@crypt_cf81dc07_f237f0bbeff506f5d0f3f1e34b2b4e16'"
              alt="">
        </div>
        <div class="info">
          <h3 class="name">{{item.NickName}}</h3>
          <p class="msg">暂无</p>
        </div>
      </li>
    </ul>
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
      return {}
    },

    created(){
    },


    methods: {}
  }
</script>

<style lang="scss" type="text/scss">
  .chat-list-container {
    height: 100%;
  }

  .chat-list {
    &-item {
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
  }
</style>
