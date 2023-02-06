<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> Homepage </router-link>
      <router-link to="/login" v-if="!loggedIn"> | Login </router-link>
	    <router-link to="/register" v-if="!loggedIn"> | Register </router-link>  
      <router-link to="/dashboard" v-if="loggedIn"> | Dashboard </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    data () {
      return {
        loggedIn: this.$store.state.loggedIn
      }
    },
    created () {
      //
    }
  }
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
