<template>
<div>
    <beer-edit v-if="isEditing" :beer="beer" @cancel-edit="cancelEdit" @save="saveBeer"></beer-edit>
    <beer-view v-else :beer="beer" @dblclick.native="editBeer"></beer-view>
</div>
</template>

<script>
import BeerView from './BeerView'
import BeerEdit from './BeerEdit'
import Data from '@/Data'
import store from '@/Store'

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
    methods: {
        editBeer () {
            if (this.sharedState.canEdit()) {
                console.log('edit beer', this.beer.data.name)
                this._setEditState(true)
            }
        },
        cancelEdit () {
            console.log('cancel edit beer', this.beer.data.name)
            this._setEditState(false)
        },
        saveBeer () {
            console.log('saving beer changes', this.beer.data.name)
            // TODO:
            if (!this.beer.id) {
                this.beer.id = Math.floor(Math.random() * 100)
            }
            Data.save(this.beer) // who's responsible for this?
            this._setEditState(false)
        },
        _setEditState (newState) {
            this.isEditing = newState
            this.sharedState.isEditing(this.isEditing)
        }
    }
}
</script>

<style scoped>
div {
    border: 1px solid;
}
</style>
