import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types'
import filters from '../filters'
import api from '../api'

import _state from './_state'

Vue.use(Vuex)

let state = {
  chatSet    : [],
  wxParams   : {},
  user       : {},
  contactList: [],
  articleList: []
}

// state = {...state, ..._state}

const getters = {
  baseRequest(state){
    const wxParams = state.wxParams

    return {
      BaseRequest: {
        DeviceID: wxParams.DeviceID,
        Sid     : wxParams.Sid,
        Skey    : wxParams.Skey,
        Uin     : wxParams.Uin
      }
    }
  },

  allContactsByOrder({contactList}) {
    let map    = {}
    let result = []

    contactList.forEach((item) => {
      if (!item.PYInitial || !filters.isContact(item.ContactFlag)) return

      let aHead = item.RemarkPYInitial[0] || item.PYInitial[0]

      // 非字母
      aHead = /[a-z]/i.test(aHead) ? aHead.toUpperCase() : '~'
      // 星标
      aHead = item.StarFriend ? '星标好友' : aHead

      map[aHead] = map[aHead] || (map[aHead] = [])
      map[aHead].push(item)
    })

    result = Object
      .keys(map)
      .sort()
      .map((key) => {
        return {
          key,
          items: map[key]
        }
      })


    if (result.length && result[result.length - 1].key === '星标好友') {
      result.unshift(result.pop())
    }

    return result
  },

  chatList({chatSet, contactList}) {
    let result = []

    contactList.forEach((item) => {
      let idx = chatSet.indexOf(item.UserName)

      if (idx === -1 && !filters.isContact(item.ContactFlag)) return

      result.splice(idx, 0, item)
    })

    return result
  }
}

const actions = {
  async initPage({commit, state, getters}){
    let res = await api.login.initPage(
      {pass_ticket: state.wxParams.pass_ticket},
      getters.baseRequest
    )

    commit(types.UPDATE_WX_PARAMS, {...state.wxParams, SyncKey: res.SyncKey})
    commit(types.UPDATE_CONTACT_LIST, res.ContactList)
    commit(types.UPDATE_ARTICLE_LIST, res.MPSubscribeMsgList)
    commit(types.UPDATE_USER, res.User)
    commit(types.UPDATE_CHAT_SET, [...new Set(res.ChatSet.split(','))])

    let contactsRes = await api.login.getRemainContacts({
      pass_ticket: state.wxParams.pass_ticket,
      skey       : res.SKey
    })

    commit(types.UPDATE_CONTACT_LIST, contactsRes.MemberList)
  }
}

const mutations = {
  [types.UPDATE_WX_PARAMS](state, params) {
    state.wxParams = params
  },
  [types.UPDATE_CHAT_SET](state, items) {
    state.chatSet = items
  },
  [types.UPDATE_ARTICLE_LIST](state, items) {
    state.articleList = items
  },
  [types.UPDATE_CONTACT_LIST](state, items) {
    state.contactList = items
  },
  [types.UPDATE_USER](state, user) {
    state.user = user
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
