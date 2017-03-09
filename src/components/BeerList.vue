<template>
<div>
    <hr/>
    <draggable v-model="beers" :options="dragOptions"
               :class="{draggable: sharedState.canEdit()}"
               @end="onSortEnd">
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
import {data} from '@/Data'

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
        this.loadData()
        eventBus.$on('beer-added', this.loadData)
        eventBus.$on('beer-deleted', this.onBeerDeleted)
        eventBus.$on('cancel-edit', this.onCancelEdit)
        eventBus.$on('route-changed', this.loadData)
    },
    destroyed () {
        eventBus.$off('beer-added', this.loadData)
        eventBus.$off('beer-deleted', this.onBeerDeleted)
        eventBus.$off('cancel-edit', this.onCancelEdit)
        eventBus.$off('route-id-changed', this.loadData)
    },
    methods: {
        loadData () {
            console.log('BeerList: LOADING DATA')
            this.$bindAsArray('beers', data.loadBeers())
        },
        addBeer () {
            var newBeer = {'sort-order': this.beers.length}
            // pushing to the array does not push it to Firebase
            this.beers.push(newBeer)
            this.$nextTick(() => {
                eventBus.$emit('edit-beer', newBeer)
            })
        },
        onCancelEdit (beer) {
            if (!beer['.key']) {
                console.log('removing local add cancel')
                var index = this.beers.indexOf(beer)
                console.log('found beer at index', index)
                this.beers.splice(index, 1)
            }
        },
        onBeerDeleted () {
            this.onSortEnd()
        },
        onSortEnd () {
            console.log('on sort end, updating orders')
            var hasChanged = false
            this.beers.forEach((beer, index) => {
                // save the new index as an attribute on the beer
                hasChanged = hasChanged || this._setOrder(beer, index)
            })

            // workaround: once drag-n-drop sorting is used, vuefire loses the ability
            // to track changes coming from the server, so force a reload
            if (hasChanged) {
                console.log('sorting has resulted in changed data')
                this.$nextTick(this.loadData)
            }
        },
        _setOrder (beer, sortOrder) {
            if (beer['sort-order'] !== sortOrder) {
                beer['sort-order'] = sortOrder
                eventBus.$emit('save-beer', beer)
                return true
            }
            return false
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
