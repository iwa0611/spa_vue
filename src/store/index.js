import Vue  from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: '',
    err: ''
  },
  mutations: {
    // login時の処理
    login: async function( state, {email, passWord}) {
      axios.defaults.baseURL = process.env.VUE_APP_API_URL
      await axios.post('/auth/sign_in', { email: email, password: passWord })
      // ストレージにresを保存
      .then(res => {(state.userData = res)
            sessionStorage.setItem('userData', JSON.stringify({ userData: state.userData }))
            })
      // エラーメッセージ出力
      .catch(e => state.err = e.response.data.errors)
    },
    // logout時の処理
    logout: async function( state, {token, client, expiry, uid, type}) {
      axios.defaults.baseURL = process.env.VUE_APP_API_URL
      await axios.delete('/auth/sign_out', { headers: { 'access-token': token,                              
                                                        client: client,
                                                        expiry: expiry,
                                                        uid: uid,
                                                        'token-type': type
                                                      }})
      .then(() => {
            // ストレージ情報削除
            sessionStorage.removeItem('userData')
            // ストアの値リセット
            state.userData = '', state.err = ''
            })
      .catch(e => state.err = e.response.data.errors)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState(
    { key: 'userData',
      storage: window.sessionStorage
    } // 保存先をsessionに変更
  )] 
})
