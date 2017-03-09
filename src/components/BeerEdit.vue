<template>
<div class="is-editing">
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
    <div class="container hero-buttons button-container">
        <button class="button is-success is-large" @click="onSave()">Save</button>
        <button class="button is-large" @click="onCancel()">Cancel</button>
        <button class="button is-danger is-large" @click="onDelete()" v-if="beer['.key']">Delete</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'beer-edit',
    props: ['beer'],
    data () {
        return {
            editedBeer: {}
        }
    },
    created () {
        // make a copy of the prop so we can cancel and ditch changes
        Object.assign(this.editedBeer, this.beer)
    },
    methods: {
        onSave () {
            console.log('saving', this.beer)
            // copy changes back
            Object.assign(this.beer, this.editedBeer)
            this.$emit('save')
        },
        onCancel () {
            console.log('cancel edit of', this.beer)
            this.$emit('cancel')
        },
        onDelete () {
            this.$emit('delete')
        }
    }
}
</script>

<style scoped>
.is-editing {
    border: 2px solid #fff;
    background-color: rgba(0, 100, 150, .4);
}
.button-container {
    position: relative;
    top: -18px;
    height: 0px;
    z-index: 99;
}
</style>
