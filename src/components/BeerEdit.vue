<template>
<div class="is-editing">
    <div class="columns is-gapless">
        <div class="column is-2">
            <div class="control">
                <input type="text" class="input" v-show="false" v-model.number="editedBeer.srm" placeholder="Color (SRM)">
                <div class="color-swatch"
            </div>
            <div>
                <srm-picker :srm="editedBeer.srm" :show-swatch="true" @change-color="onColorChange"></srm-picker>
            </div>
            <div class="control">
                <input type="text" class="input" v-model="editedBeer.glass" placeholder="Glass">
            </div>
        </div>
        <div class="column">

            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label has-text-left">Name</label>
                </div>
                <div class="control is-expanded">
                    <input class="input" type="text" ref="name" placeholder="Beer name"
                           v-model="editedBeer.name" @blur="validateName" :class="{'invalid': nameInvalid}">
                </div>
            </div>

            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label has-text-left">Style</label>
                </div>
                <div class="control is-expanded">
                    <input type="text" class="input" v-model="editedBeer.style" placeholder="Beer style">
                </div>
            </div>

            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label has-text-left">Description</label>
                </div>
                <div class="control is-expanded">
                    <input type="text" class="input" v-model="editedBeer.description" placeholder="Beer description">
                </div>
            </div>

        </div>

        <div class="column is-3 abv-ibu">

            <div class="control is-horizontal">
                <input type="text" class="input" v-model.number="editedBeer.abv" placeholder="ABV">
                <div class="control-label">
                    <label class="label has-text-left">% abv</label>
                </div>
            </div>

            <div class="control is-horizontal" v-show="false">
                <input type="text" class="input" v-model.number="editedBeer.ibu" placeholder="IBUs">
                <div class="control-label">
                    <label class="label has-text-left">IBUs</label>
                </div>
            </div>

            <div>
                 <hop-rating :value="editedBeer.hops" @change="editedBeer.hops = arguments[0]"></hop-rating>
            </div>

        </div>
    </div>
    <div class="container hero-buttons button-container">
        <button class="button is-success is-medium" @click="onSave()">Save</button>
        <button class="button is-medium" @click="onCancel()">Cancel</button>
        <button class="button is-danger is-medium" @click="onDelete()" v-if="beer['.key']">Delete</button>
    </div>
</div>
</template>

<script>
import SrmPicker from './SrmPicker'
import HopRating from './HopRating'

export default {
    name: 'beer-edit',
    components: {
        SrmPicker,
        HopRating
    },
    props: ['beer'],
    data () {
        return {
            editedBeer: {},
            nameInvalid: false
        }
    },
    created () {
        // make a copy of the prop so we can cancel and ditch changes
        Object.assign(this.editedBeer, this.beer)
    },
    mounted () {
        this.$el.scrollIntoView()
        this.$refs.name.focus()
    },
    methods: {
        onColorChange (newColor) {
            this.editedBeer.srm = newColor.srm
        },
        validate () {
            if (this.nameInvalid) {
                this.$refs.name.focus()
                return false
            }
            return true
        },
        validateName () {
            this.nameInvalid = !(this.editedBeer.name && this.editedBeer.name.length)
        },
        onSave () {
            if (this.validate()) {
                // copy changes back
                Object.assign(this.beer, this.editedBeer)
                this.$emit('save')
            }
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

<style scoped lang="scss">
.is-editing {
    border: 2px solid #fff;
    background-color: rgba(0, 100, 150, .4);
}
.button-container {
    position: relative;
    top: -18px;
    height: 0px;
    z-index: 99;

    button {
        width: 100px;
    }
}
.is-editing .column {
    padding: 10px 30px 10px 10px;
}
.control {
    .control-label {
        margin: 0;
    }
    .label {
        color: #fff;
    }
    .input:focus, .input.is-focused, .input:active, .input.is-active {
        border: 2px solid #23d160;
    }
    .input.invalid {
        border: 2px solid #ff3860;
    }
}
.column.abv-ibu {
    .input {
        width: 60px;
    }
    .label {
        padding-left: 10px;
    }
}
</style>
