<template>
<v-app>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
    <Footer></Footer>
    <v-card></v-card>
  </div>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from './components/Footer.vue';
export default {
  components: {
    NavBar: NavBar,
    Footer: Footer
  },
};
</script>

<style>
#app {
  color: black;
}
</style>
