import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import BeerList from '@/components/BeerList'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'BeerList',
            component: BeerList
        },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        }
    ]
})
