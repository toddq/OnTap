<template>
<div>
    <div class="columns is-gapless">
        <div class="column">
        <input type="text" name="srm" v-model="beer.data.srm" placeholder="Color (SRM)"><br>
        <input type="text" name="glass" v-model="beer.data.glass" placeholder="Glass">
        </div>
        <div class="column is-half">
            <input type="text" name="name" v-model="beer.data.name" placeholder="Beer name"><br>
            <input type="text" name="style" v-model="beer.data.style" placeholder="Beer style"><br>
            <input type="text" name="description" v-model="beer.data.description" placeholder="Beer description">
        </div>
        <div class="column">
            <input type="text" name="abv" v-model="beer.data.abv" placeholder="ABV"><br>
            <input type="text" name="ibu" v-model="beer.data.ibu" placeholder="IBUs">
        </div>
    </div>
    <div class="container hero-buttons">
        <button class="button is-success is-medium" @click="onSave()">Save</button>
        <button class="button is-medium" @click="onCancel()">Cancel</button>
        <!-- TODO: don't show delete when creating a new one -->
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
        return {}
    },
    created () {
        // TODO: need to make a copy of beer so that cancel will discard changes
    },
    methods: {
        onSave () {
            console.log('saving', this.beer)
            // need a data model
            this.beer.isEditing = false
        },
        onCancel () {
            console.log('cancel edit of', this.beer)
            // on cancel of new beer creation, don't save anything
            if (!this.beer.id) {
                this.onDelete()
            } else {
                this.beer.isEditing = false
            }
        },
        onDelete () {
            console.log('deleting', this.beer)
            eventBus.$emit('delete-beer', this.beer)
        }
    }
}
</script>
