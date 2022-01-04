<template>
  <div id="app">
    <Header v-if="!$route.meta.hideNavbar"/>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut">
      <router-view/>
    </transition>
    <Footer v-if="!$route.meta.hideNavbar"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    Header,Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  height: 100vh;
}
</style>
