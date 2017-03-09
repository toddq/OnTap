<template>
<div class="taphouse">
    <div class="header">
        <img src="/static/favicon.png" class="logo">
        <span class="title">Beers on tap</span>
    </div>
    <beer-list></beer-list>
</div>
</template>

<script>
import BeerList from './BeerList'
import {data} from '@/Data'
import store from '@/Store'
import {includes} from 'lodash'

export default {
    name: 'taphouse',
    components: {
        'beer-list': BeerList
    },
    created () {
        console.log('initializing TapHouse')
        this.setRouteId(this.$route)
        this.setEditMode(this.$route)
    },
    watch: {
        '$route' (to, from) {
            console.log('route has changed from', from.params, 'to', to.params)
            this.setRouteId(to)
            this.setEditMode(to)
        }
    },
    methods: {
        setRouteId (route) {
            data.setRoute(route.params.id)
        },
        setEditMode (route) {
            var editMode = includes(route.params, 'edit')
            store.isEditMode(editMode)
        }
    }
}
</script>

<style scoped lang="scss">
.taphouse {
    .header {
        text-align: center;
        margin-bottom: 20px;
    }
    img.logo {
        height: 40px;
        padding-right: 10px;
    }
    .title {
        font-size: 3em;
        text-transform: uppercase;
    }

}
</style>
