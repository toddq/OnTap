import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TapHouse from '@/components/TapHouse'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/(edit)?', component: TapHouse },
        { path: '/:id?', component: TapHouse },
        { path: '/:id/(edit)?', component: TapHouse },
        // TODO: sub-nodes of id
        // { path: '/:id/:sub' },
        // { path: '/:id/:sub/edit' },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        }
    ]
})
