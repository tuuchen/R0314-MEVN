<template>
  <div class="home">
    <b-container>
      <!-- Show loading if image is not loaded -->
      <div v-show="!isLoaded">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>
      <div v-show="isLoaded">
        <img alt="Vue logo" src="../assets/express.png" @load="onImgLoad" />
      </div>
      <HelloWorld msg="Welcome to Vue.js Express app" />
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      isLoaded: false,
    }
  },
  methods: {
    // Loaded state
    onImgLoad () {
      this.isLoaded = true
    }
  }
}
</script>
<style scoped>
.home {
  text-align: center;
}
</style>
