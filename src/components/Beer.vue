<template>
<div class="beer-row">
    <beer-edit v-if="isEditing" :beer="beer" @cancel="cancelEdit" @save="saveBeer" @delete="deleteBeer"></beer-edit>
    <beer-view v-else :beer="beer" @dblclick.native="editBeer"></beer-view>
</div>
</template>

<script>
import BeerView from './BeerView'
import BeerEdit from './BeerEdit'
import store from '@/Store'
import eventBus from '@/EventBus'

export default {
    name: 'beer',
    props: ['beer'],
    components: {
        'beer-view': BeerView,
        'beer-edit': BeerEdit
    },
    data () {
        return {
            isEditing: false,
            sharedState: store
        }
    },
    created () {
        eventBus.$on('edit-beer', this.editBeer)
    },
    methods: {
        editBeer (arg) {
            if (this.sharedState.canEdit()) {
                if (arg instanceof Event || arg === this.beer) {
                    console.log('edit beer', this.beer.name)
                    this._setEditState(true)
                }
            }
        },
        cancelEdit () {
            console.log(`cancel edit beer '${this.beer.name}'`)
            this._setEditState(false)
            eventBus.$emit('cancel-edit', this.beer)
        },
        saveBeer () {
            console.log('saving beer changes', this.beer.name)
            eventBus.$emit('save-beer', this.beer)
            this.cancelEdit()
        },
        deleteBeer () {
            console.log(`deleting '${this.beer.name}'`)
            eventBus.$emit('delete-beer', this.beer)
            this._setEditState(false)
        },
        _setEditState (newState) {
            this.isEditing = newState
            this.sharedState.isEditing(this.isEditing)
        }
    }
}
</script>

<style lang="scss">
.beer-row {
    .column {
        border-right: 1px #fff dashed;
    }
    .column:last-child {
        border-right: none;
    }
}
.beer-row:nth-child(odd) {
    background-color: rgba(84, 84, 84, .5);
}
</style>
