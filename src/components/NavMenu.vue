<template>
  <div class="nav-menu">
    <div class="head">
      <div class="avatar">
        <img :src="'/api/wx2'+ user.HeadImgUrl" alt="">
      </div>
      <div class="info">
        <span class="name">{{user.NickName}}</span>
        <a href="javascript:" class="opts">
          <i class="web_wechat_add"></i>
        </a>
      </div>
    </div>

    <div class="search">
      <i class="web_wechat_search"></i>
      <input type="text" placeholder="搜索">
    </div>

    <tabs class="skin-nav">
      <tab head="<i class='web_wechat_tab_chat'></i>"
           head-active="<i class='web_wechat_tab_chat web_wechat_tab_chat-hl'></i>"
           title="聊天">
        <chat-list/>
      </tab>
      <tab head="<i class='web_wechat_tab_public'></i>"
           head-active="<i class='web_wechat_tab_public web_wechat_tab_public-hl'></i>"
           title="阅读">
        <article-list/>
      </tab>
      <tab head="<i class='web_wechat_tab_friends'></i>"
           head-active="<i class='web_wechat_tab_friends web_wechat_tab_friends-hl'></i>"
           title="通讯录">
        <all-contacts/>
      </tab>
    </tabs>
  </div>
</template>

<script>
  import types from '../store/mutation-types'
  import {mapState} from 'vuex'
  import api from '../api'
  import tabs from '../components/Tabs'
  import tab from '../components/Tab'
  import ChatList from '../components/ChatList'
  import ArticleList from '../components/ArticleList'
  import AllContacts from '../components/AllContacts'

  export default {
    components: {
      tabs,
      tab,
      ChatList,
      ArticleList,
      AllContacts
    },

    data() {
      return {}
    },

    computed: {
      ...mapState(['user'])
    },

    mounted() {
    },

    methods: {}
  }
</script>

<style lang="scss" type="text/scss">
  .nav-menu {
    width: 280px;
    height: 100%;
    background: #2e3238;
    position: relative;

    .head {
      padding: 18px;

      .avatar {
        width: 40px;
        height: 40px;
        display: table-cell;
        vertical-align: middle;
        padding-right: 10px;

        img {
          border-radius: 2px;
          display: block;
        }
      }

      .info {
        display: table-cell;
        vertical-align: middle;
      }

      .name {
        display: inline-block;
        font-weight: 400;
        width: 156px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        color: #fff;
        font-size: 18px;
        line-height: 30px;
        vertical-align: middle;
        text-decoration: none;
      }

      .opts {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .search {
      width: 244px;
      margin: 0 auto 6px;
      position: relative;

      i {
        position: absolute;
        z-index: 101;
        top: 1px;
      }

      input {
        width: 214px;
        height: 32px;
        line-height: 32px;
        border: 0;
        border-radius: 2px;
        background-color: #26292e;
        color: #fff;
        padding-left: 30px;
        font-size: 12px;
      }
    }

    .tab-container {
      width: 100%;
      position: absolute;
      top: 153px;
      bottom: 0;

      > div:first-child {
        height: 100%;
      }
    }
  }
</style>
