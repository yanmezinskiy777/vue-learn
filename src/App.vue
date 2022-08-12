<template>
  <navbar-component></navbar-component>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script>
import NavbarComponent from "./components/Navbar.vue";
export default {
  components: {
    NavbarComponent,
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
