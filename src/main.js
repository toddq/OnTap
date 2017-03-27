// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'
import router from './router'
import Icon from 'vue-awesome/components/Icon.vue'

// render a svg sprite containing all icons
// this should be its own component
// const files = require.context('!svg-sprite-loader!./assets/svg', true, /.*\.svg$/)
// files.keys().forEach(files)

Vue.use(VueFire)
Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
