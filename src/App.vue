<template>
  <div id="app">
    <!-- トースト用コンポーネント -->
    <Message ref="child"></Message>
    <transition appear>
      <div>
        <hr />
        <div id="nav">
          <router-link to="/">Home</router-link>
          | <router-link to="/favorite">Favorite</router-link>
          <div class="user-menu" v-if="$store.state.loggedIn">
            | <router-link to="/search">Search</router-link>
            | <router-link to="/login">LogOut</router-link>
          </div>
        </div>
        <hr />
        <router-view/>
        <p class="footer-logo">Annict様のAPIを使用しています : 
          <a href="https://annict.com/">Annict</a>
        </p>
      </div>
    </transition>  
  </div>
</template>

<script>
import Message from './components/ResMessage.vue'

export default {
  components: {
    Message
  },
  // トースト用に値を監視
  computed: {
    userData: function() {
      return this.$store.state.userData.status
    },
    loggedIn: function() {
      return this.$store.state.loggedIn
    }
  },
  // トースト表示
  watch: {
    userData(e) {
      e == 200 ?
      this.$refs.child.toastMessage('ログインしました') :
      this.$refs.child.toastMessage('ログアウトしました')
    }
  },
}
</script>

<style>
html {
  position: relative;
  width: 800px;
  margin: 0 auto;
  background-color: rgb(24, 24, 24);
}
@media screen and (max-width:767px) {
  html {
    width: 700px;
  }
}
body {
  min-height: 100vh;
  margin: 10px 0;
  padding: 0 10px;
  background-color: rgb(32, 32, 32);
  border: 2px solid #494949;
  border-radius: 15px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e7e7e7;
  padding: 30px;
}
#nav {
  padding: 30px;
  transition: opacity 1s;
}
#nav a {
  font-weight: bold;
  color: #4e80b3;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
li {
  list-style: none;
}
.v-enter-active {
  transition: 3s ease;
}
.v-enter {
  opacity: 0;
}
.toasted-style {
  background-color: #42b983c9 !important;
  border: 2px solid rgba(245, 222, 179, 0.637);
  border-radius: 5px !important;
}
.user-menu {
  display: inline;
}
.footer-logo {
  position: absolute;
  right: 40%;
  bottom: 15px;
  font-size: 10px;
}
.footer-logo > a{
  text-decoration: none;
  color: white;
}
.footer-logo > a:hover {
  background: #42b983;
}
/* scopedの関係で適用されないので此方に移動 */
.pagination > .active {
  border-bottom: 3px solid #42b983c9;
}
.pagination > li {
  margin: 0 10px;
}
.pagination li > a {
  padding: 0 5px;
}
.pagination li > a:hover {
  background: #42b983;
}
</style>
