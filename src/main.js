import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false

Vue.use(Toasted,{
  position: 'top-right',
  duration: 2500,
  className: ['toasted-style'],
});
Vue.use(VueAxios, axios)

// アプリの起動
new Vue({
  router,
  store,
  render: h => h(App) // App.vueを描画する
}).$mount('#app')
