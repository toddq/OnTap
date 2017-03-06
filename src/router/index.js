import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// import BeerList from '@/components/BeerList'
import TapHouse from '@/components/TapHouse'

Vue.use(Router)

// maybe this could be used for edit mode
export default new Router({
    routes: [
        {
            path: '/',
            name: 'TapHouse',
            component: TapHouse
        },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        }
    ]
})
