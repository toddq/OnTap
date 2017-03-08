<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <help></help>
    <router-view></router-view>
    <notifications></notifications>
  </div>
</template>

<script>
import Help from '@/components/Help'
import Notifications from '@/components/Notifications'

export default {
    name: 'app',
    components: {
        Help,
        Notifications
    }
}
</script>

<style lang="scss">
@import '~bulma';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
