import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'
import Home from '../components/MyHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
