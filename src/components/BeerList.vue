<template>
<div>
    <hr/>
    <draggable v-model="beers" :options="sortConfig" @start="dragging=true" @end="dragging=false" :class="{dragging: dragging}">
         <beer v-for="beer in beers" :beer="beer" :key="beer.id"></beer>
    </draggable>
    <nav class="nav">
        <div class="nav-left" v-if="sharedState.canEdit()">
            <button class="button is-success is-medium" role="button" @click="addBeer()">
                <span class="icon-plus"></span>
            </button>
        </div>
    </nav>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import Beer from './Beer'
import eventBus from '@/EventBus'
import store from '@/Store'

export default {
    name: 'beer-list',
    components: {
        'beer': Beer,
        draggable
    },
    data () {
        return {
            beers: [],
            dragging: false,
            sortConfig: {
                filter: '.row-header',
                // tie disabled into sharedState.canEdit()
                disabled: false,
                // disabled: !store.canEdit(),
                onSort: this.onItemReorder
            },
            sharedState: store
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
            // isEditing: true,
            var newBeer = {id: undefined, data: { priority: this.beers.length }}
            console.log('new beer', newBeer)
            this.beers.push(newBeer)
            // a lookup would be better than just poking the last one
            this.$nextTick(() => {
                console.log(this.$children)
                newBeer = this.$children[this.$children.length - 1]
                console.log(newBeer)
                newBeer.editBeer()
            })
        },
        deleteBeer (beer) {
            console.log('delete beer', beer)
            var index = this.beers.indexOf(beer)
            console.log('found beer at index', index)
            this.beers.splice(index, 1)
            this.sharedState.isEditing(false)
        },
        onItemReorder () {
            console.log('on item reorder')
        }
    }
}
</script>

<style scoped>
.nav {
    margin-top: 15px;
}
.icon-plus:before {
    content: "\2795";
}
.dragging {
    /* unfortunately this doesn't seem to currently work */
    cursor: move !important;
}
</style>
