<template>
<div>
    <div class="columns is-gapless">
        <div class="column">
        <input type="text" name="srm" v-model="editedBeer.srm" placeholder="Color (SRM)"><br>
        <input type="text" name="glass" v-model="editedBeer.glass" placeholder="Glass">
        </div>
        <div class="column is-half">
            <input type="text" name="name" v-model="editedBeer.name" placeholder="Beer name"><br>
            <input type="text" name="style" v-model="editedBeer.style" placeholder="Beer style"><br>
            <input type="text" name="description" v-model="editedBeer.description" placeholder="Beer description">
        </div>
        <div class="column">
            <input type="text" name="abv" v-model="editedBeer.abv" placeholder="ABV"><br>
            <input type="text" name="ibu" v-model="editedBeer.ibu" placeholder="IBUs">
        </div>
    </div>
    <div class="container hero-buttons">
        <button class="button is-success is-medium" @click="onSave()">Save</button>
        <button class="button is-medium" @click="onCancel()">Cancel</button>
        <button class="button is-danger is-medium" @click="onDelete()" v-if="beer.id">Delete</button>
    </div>
</div>
</template>

<script>
import eventBus from '@/EventBus'

export default {
    name: 'beer-edit',
    props: ['beer'],
    data () {
        return {
            editedBeer: {}
        }
    },
    created () {
        // make a copy of the prop so we can cancel
        Object.assign(this.editedBeer, this.beer.data)
    },
    methods: {
        onSave () {
            console.log('saving', this.beer)
            // copy changes back.  pretty sure there's a better way to do this, but don't know what it is
            Object.assign(this.beer.data, this.editedBeer)
            this.$emit('save')
        },
        onCancel () {
            console.log('cancel edit of', this.beer)
            // on cancel of new beer creation, don't save anything
            if (!this.beer.id) {
                this.onDelete()
            }
            this.$emit('cancel-edit')
        },
        onDelete () {
            console.log('deleting', this.beer)
            eventBus.$emit('delete-beer', this.beer)
        }
    }
}
</script>
