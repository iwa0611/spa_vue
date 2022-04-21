import Vue  from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default {
  state: {
  },
  mutations: {
    // 取得したreview情報を代入
    setShow(state, res) {
      state.rate = res.data
    },
    setKawaii (state, rate) {
      state.rate.kawaii = rate
    },
    setOmosiroi (state, rate) {
      state.rate.omosiroi = rate
    },
    setSakuga (state, rate) {
      state.rate.sakuga = rate
    },
    setNakeru (state, rate) {
      state.rate.nakeru = rate
    },
    setAtui (state, rate) {
      state.rate.atui = rate
    },
    setComment (state, rate) {
      state.rate.comment = rate
    },
    setFavorite (state, favo) {
      state.rate.favorite = favo
    },
  },
  actions: {
    // review情報の取得
    async show({ commit }, id) {
      let res = await axios.get('/contents/' + id)
      commit('setShow', res)
    }
  }
}

