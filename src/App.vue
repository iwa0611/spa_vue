<template>
  <div id="app">
    <hr />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/search">Search</router-link>
    </div>
    <hr />
    <router-view/>
  </div>
</template>

<style>
html {
  width: 800px;
  margin: 0 auto;
}
body {
  margin: -5px 10px;
  padding: 0 10px;
  background-color: rgb(32, 32, 32);
  border: solid #494949;
  border-width: 0 0.5px;
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
li {
  list-style: none;
}
</style>
