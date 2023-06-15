<template>
  <div id="app">
    <top-nav v-show="$route.meta.showTopNav"></top-nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopNav from '@/views/TopNav.vue';

@Component({
  components: {
    'top-nav': TopNav
  }
})
export default class App extends Vue {}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-image: url('assets/images/bg/nav-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
