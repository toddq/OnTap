<template>
<div>
    <hr/>
    <draggable v-model="beers" :options="dragOptions"
               :class="{draggable: sharedState.canEdit()}"
               @start="onSortStart" @end="onSortEnd">
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
import Data from '@/Data'

export default {
    name: 'beer-list',
    components: {
        'beer': Beer,
        draggable
    },
    data () {
        return {
            beers: [],
            sharedState: store
        }
    },
    computed: {
        dragOptions () {
            return {
                // filter: '.row-header',
                disabled: !store.canEdit()
            }
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
            this.beers.push.apply(this.beers, Data.load())
        },
        addBeer () {
            // should beer have it's own object?
            var newBeer = {id: undefined, data: { priority: this.beers.length }}
            console.log('new beer', newBeer)
            this.beers.push(newBeer)
            // hmmm, the definition of children changed on me...
            // TODO: this definitely needs some work.  event?
            this.$nextTick(() => {
                var $beerChildren = this.$children[0].$children
                console.log('all children', $beerChildren)
                newBeer = $beerChildren[$beerChildren.length - 1]
                console.log('new beer component', newBeer)
                newBeer.editBeer()
            })
        },
        deleteBeer (beer) {
            console.log('delete beer', beer)
            var index = this.beers.indexOf(beer)
            console.log('found beer at index', index)
            Data.delete(beer)
            this.beers.splice(index, 1)
            this.sharedState.isEditing(false)
        },
        onSortStart (evt) {
            console.log('sort start, current order')
            this.beers.forEach((beer, index) => {
                console.log(index, beer.data.name)
            })
        },
        onSortEnd (evt) {
            console.log('on sort end, ending order', arguments)
            this.beers.forEach((beer, index) => {
                console.log(index, beer.data.name)
                // save the new index as an attribute on the beer
                this._setOrder(beer, index)
            })
        },
        _setOrder (beer, value) {
            // so... $priority is kind of a Firebase thing
            if (beer.data.$priority !== value) {
                beer.data.$priority = value
                Data.save(beer)
            }
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
.draggable {
    cursor: move;
}
.sortable-chosen,
.sortable-drag {
    color: white;
    background-color: #666;
}
.sortable-ghost {
    opacity: .3;
    color: initial;
    background-color: #ccc;
}
</style>
