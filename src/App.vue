<template>
    <div id='app'>
        <help></help>
        <router-view></router-view>
        <notifications></notifications>
    </div>
</template>

<script>
import Help from '@/components/Help'
import Notifications from '@/components/Notifications'
import { data } from '@/Data'
import Firebase from 'firebase'

var firebaseConfig = {
    apiKey: 'AIzaSyDMC7_SnUSS6qxi44iU6vFgjVFUub8iScw',
    authDomain: 'ontap-a835d.firebaseapp.com',
    databaseURL: 'https://ontap-a835d.firebaseio.com',
    storageBucket: 'ontap-a835d.appspot.com',
    messagingSenderId: '1069253184483'
}

var app = Firebase.initializeApp(firebaseConfig)
data.setDb(app.database())

export default {
    name: 'app',
    components: {
        Help,
        Notifications
    }
}
</script>

<style lang='scss'>
@import '~bulma';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
