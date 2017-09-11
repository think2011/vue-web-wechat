<template>
  <div v-bar="{useScrollbarPseudo:true}" class="article-list-container">
    <ul class="article-list">
      <li class="article-list-item" v-for="item in $store.state.articleList">
        <div class="hd">
          <div class="time">{{item.Time | moment('HH:mm')}}</div>
          <div class="avatar">
            <!-- TODO ZH 9/11/17  -->
            <img
                :xsrc="'/api/wx2/cgi-bin/mmwebwx-bin/webwxgeticon?username='+ item.UserName"
                alt="">
          </div>
          <div class="name">{{item.NickName.substr(0, 4)}}</div>
        </div>
        <ul v-for="article in item.MPArticleList" class="read-list">
          <li>
            <a href="javascript:">
              <h3 class="title">{{article.Title}}</h3>
              <span class="cover">
                <img :src="article.Cover" alt="">
              </span>
            </a>
          </li>
        </ul>
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
  .article-list-container {
    height: 100%;
    background: #292d32;
  }

  .article-list {
    &-item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }

      .time {
        float: right;
        font-size: 12px;
        color: #888;
        line-height: 20px;
      }

      .hd {
        overflow: hidden;
        padding: 10px 20px;
        background-color: #2f3239;

        .avatar {
          float: left;
          margin-right: 10px;

          img {
            width: 20px;
            height: 20px;
            display: block;
            border-radius: 50%;
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
          }
        }

        .name {
          font-size: 12px;
          color: #888;
          overflow: hidden;
          line-height: 20px;
        }
      }

      .read-list {
        padding: 10px 18px 9px;
        border-bottom: 1px solid #292c33;
        cursor: pointer;
        overflow: hidden;
        background-color: #2f3239;

        .title {
          overflow: hidden;
          display: table-cell;
          vertical-align: middle;
          word-wrap: break-word;
          word-break: break-all;
          font-weight: 400;
          font-size: 13px;
          color: #fff;
          max-height: 40px;
          padding-right: 10px;
          width: 204px;
        }

        .cover {
          width: 40px;
          min-width: 40px;
          height: 40px;
          display: table-cell;
          vertical-align: middle;
          word-wrap: break-word;
          word-break: break-all;
          white-space: nowrap;
          position: relative;
          overflow: hidden;

          img {
            display: block;
            width: 40px;
            height: 40px;
            object-fit: cover;
          }
        }
      }
    }
  }
</style>
