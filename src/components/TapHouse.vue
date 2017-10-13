<template>
<div class="taphouse">
    <div class="header">
        <div class="logo-background">
            <img src="../../static/favicon.png" class="logo">
        </div>
        <span class="title">Beers on tap</span>
    </div>
    <beer-list></beer-list>
</div>
</template>

<script>
import BeerList from './BeerList'
import {data} from '@/Data'
import store from '@/Store'

export default {
    name: 'taphouse',
    components: {
        'beer-list': BeerList
    },
    created () {
        console.log('initializing TapHouse', this.$route)
        this.setRouteId(this.$route)
        this.setEditMode(this.$route)
    },
    watch: {
        '$route' (to, from) {
            console.log('route has changed from', from, 'to', to)
            this.setRouteId(to)
            this.setEditMode(to)
        }
    },
    methods: {
        // route id will become relevent when auth is introduced
        setRouteId (route) {
            var path = route.params.id
            if (path && route.params.subnode) {
                path += '/' + route.params.subnode
            }
            data.setRoute(path)
        },
        setEditMode (route) {
            var editMode = route.path.endsWith('/edit')
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
    .title {
        font-size: 3em;
        text-transform: uppercase;
        color: #fff;
    }
    // this is mostly temporary
    .logo-background {
        display: inline-block;
        background-color: #fff;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        vertical-align: bottom;
    }
    img.logo {
        height: 65%;
        width: 65%;
        position: relative;
        top: 15%;
    }
}
</style>
