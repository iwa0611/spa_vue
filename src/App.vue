<template>
  <div id="app">
    <transition appear>
      <div>
        <hr />
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/search">Search</router-link> |
          <router-link to="/login">Login</router-link>
        </div>
        <hr />
        <router-view/>
      </div>
    </transition>  
  </div>
</template>

<style>
html {
  width: 800px;
  margin: 0 auto;
  background-color: rgb(24, 24, 24);
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
</style>
