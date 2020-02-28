<template>
  <div id="app">
    <div id="nav">
      <b-nav tabs>
        <!-- Main navigation -->
        <b-nav-item router-link to="/">Home</b-nav-item>
        <b-nav-item router-link to="/guestbook">View guestbook</b-nav-item>
        <b-nav-item router-link to="/add">Add entry</b-nav-item>
      </b-nav>
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from "@/plugins/axios"
export default {
  name: 'App',
  mounted () {
    // Load guestbook json data to Vuex when initializing app
    axios.getGuestbook()
      .then(res => {
        this.$store.state.guestbook = res.data
        this.$store.state.busy = false
      })
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

#nav {
  padding: 30px;
}

#nav a {
  /* font-weight: bold; */
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
