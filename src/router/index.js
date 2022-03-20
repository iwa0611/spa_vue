import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'
import Home from '../components/MyHome.vue'
import Watch from '../components/WatchList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, Watch
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../components/AnimeSearch.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.loggedIn){
        next();
      }else{
        next('/');
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/LoginForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
