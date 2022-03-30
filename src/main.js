import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'
import VueScrollTo from 'vue-scrollto'
import Paginate from 'vuejs-paginate'
import StarRating from 'vue-star-rating'

Vue.config.productionTip = false

Vue.use(Toasted,{
  position: 'top-right',
  duration: 2500,
  className: ['toasted-style'],
});
Vue.component('PagiNate', Paginate)
Vue.use(VueAxios, axios)
Vue.use(StarRating)
Vue.use(VueScrollTo)

// ベースURL指定
axios.defaults.baseURL = process.env.VUE_APP_API_URL

// アプリの起動
new Vue({
  router,
  store,
  render: h => h(App) // App.vueを描画する
}).$mount('#app')
