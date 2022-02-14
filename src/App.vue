<template>
  <div id="app">
    <hr />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/search">Search</router-link>
    </div>
    <router-view/>
    <hr />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations} from 'vuex'

export default {
  name: "app",
  computed: mapState([ 'count'] ),
  methods: mapMutations([ 'plus', 'minus' ]),
}
</script>
<style>
html {
  background-color: rgb(32, 32, 32);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e7e7e7;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #4e80b3;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
