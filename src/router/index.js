import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TapHouse from '@/components/TapHouse'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/edit', component: TapHouse },
        { path: '/:id/edit', component: TapHouse },
        { path: '/:id/:subnode+/edit', component: TapHouse },
        { path: '/:id?', component: TapHouse },
        { path: '/:id/:subnode+', component: TapHouse },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        }
    ]
})
