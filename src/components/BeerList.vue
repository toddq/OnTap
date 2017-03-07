<template>
<div>
    <hr/>
    <!-- :data="beer.data" -->
    <beer v-for="beer in beers" :beer="beer" :key="beer.id"></beer>
    <nav class="nav">
        <div class="nav-left">
            <button class="button is-success is-medium" role="button" @click="addBeer()">
                <span class="icon-plus"></span>
            </button>
        </div>
    </nav>
</div>
</template>

<script>
import Beer from './Beer'
import eventBus from '@/EventBus'

export default {
    name: 'beer-list',
    components: {
        'beer': Beer
    },
    data () {
        return {
            beers: []
        }
    },
    created () {
        eventBus.$on('delete-beer', this.deleteBeer)
    },
    destroyed () {
        eventBus.$off('delete-beer', this.deleteBeer)
    },
    mounted () {
        this.fetchBeers()
    },
    methods: {
        fetchBeers () {
            // faking it out for now
            this.beers.push({id: 1, data: {name: 'Beer 1', srm: 5, glass: 'nonic', description: 'A crisp refreshing German Lager', abv: 4.9, ibu: 28}})
            this.beers.push({id: 2, data: {name: 'Beer 2', srm: 12, glass: 'shaker', description: 'A hoppy American Pale Ale', abv: 5.4, ibu: 36}})
            this.beers.push({id: 3, data: {name: 'Beer 3', srm: 35, glass: 'tulip', description: 'Robust Porter', abv: 6.7, ibu: 32}})
        },
        addBeer () {
            // should beer have it's own object?
            // edit mode....
            this.beers.push({id: undefined, isEditing: true, data: { priority: this.beers.length }})
        },
        deleteBeer (beer) {
            console.log('delete beer', beer)
            var index = this.beers.indexOf(beer)
            console.log('found beer at index', index)
            this.beers.splice(index, 1)
        }
    }
}
</script>

<style scoped>
.icon-plus:before {
    content: "\2795";
}
</style>
