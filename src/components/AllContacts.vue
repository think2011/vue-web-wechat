<template>
  <div v-bar="{useScrollbarPseudo:true}" class="contacts-container">
    <div>
      <div v-for="item in $store.getters.allContactsByOrder">
        <div class="hd">
          {{item.key}}
        </div>

        <ul class="item-list">
          <li>
            <a v-for="contact in item.items" href="javascript:">
              <div class="avatar">
                <img
                    :src="'/api/wx2'+contact.HeadImgUrl"
                    alt="">
              </div>
              <div class="info">
                <h3 class="name">{{contact.RemarkName || contact.NickName}}</h3>
              </div>
            </a>
          </li>
        </ul>
      </div>
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
      return {}
    },

    created(){
    },


    methods: {}
  }
</script>

<style lang="scss" type="text/scss">
  .contacts-container {
    height: 100%;

    .hd {
      padding: 1px 18px;
      font-weight: 400;
      color: #787b87;
      background: #292d32;
      font-size: 14px;
    }

    .item-list {
      a {
        overflow: hidden;
        padding: 10px 18px 9px;
        border-bottom: 1px solid #292c33;
        cursor: pointer;
        display: block;
      }
    }

    .avatar {
      float: left;
      margin-right: 10px;

      img {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 2px;
      }
    }

    .info {
      overflow: hidden;
      line-height: 30px;

      .name {
        color: #fff;
        font-weight: 400;
        font-size: 13px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
    }
  }

</style>
