import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types'
import api from '../api'

import _state from './_state'

Vue.use(Vuex)

let state = {
  wxParams   : {},
  user       : {},
  contactList: []
}

state = _state

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
    commit(types.UPDATE_USER, res.User)
  }
}

const mutations = {
  [types.UPDATE_WX_PARAMS](state, params) {
    state.wxParams = params
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
