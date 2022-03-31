import Vue  from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import review from './review.js'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: '',
    err: '',
    loggedIn: false
  },
  mutations: {
    setSession(state, res) {
      state.userData = res
      state.loggedIn = true
      // ストレージにstateを保存
      sessionStorage.setItem('userData', JSON.stringify(state))
    },
    destroySession(state) {
      // ストレージ情報削除
      sessionStorage.removeItem('userData')
      // ストアの値リセット
      state.userData = '', state.err = '', state.loggedIn = false
      router.push('/')
    },
    setError(state, e) {
      // エラーメッセージ出力
      state.err = e.response.data.errors
    }
  },
  actions: {
    // login時の処理
    async login({ commit }, {email, passWord}) {
      await axios.post('/auth/sign_in', { email: email, password: passWord })
      .then(res => (commit('setSession', res)))
      .catch(e => (commit('setError', e)))
    },
    // logout時の処理
    async logout({ commit }, {token, client, expiry, uid, type}) {
      await axios.delete('/auth/sign_out', { headers: { 'access-token': token,                              
                                                        client: client,
                                                        expiry: expiry,
                                                        uid: uid,
                                                        'token-type': type
                                                      }})
     .then(() =>(commit('destroySession')))
     .catch(e => (commit('setError', e)))
    }
  },
  modules: {
    review: review
  },
  plugins: [createPersistedState(
    { key: 'userData',
      storage: window.sessionStorage // 保存先をsessionに変更
    } 
  )] 
})
