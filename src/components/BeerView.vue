<template>
<div class="columns is-gapless">
    <!-- these will eventually be their own sub-components -->
    <div class="column is-2">
        <div>
            <srm :srm="beer.srm" :show-swatch="true" :disabled="true" v-show="beer.srm"></srm>
            <!-- {{ srm }} -->
        </div>
        <div>
            <glass-picker :glass="beer.glass"></glass-picker>
            <!-- {{ glass }} -->
        </div>
    </div>
    <div class="column">
        <div class="beer-name">{{ beer.name }}</div>
        <div class="beer-style">{{ beer.style }}</div>
        <div class="beer-description">{{ beer.description }}</div>
    </div>
    <div class="column is-3">
        <div>{{ beer.abv }}% abv</div>
        <div v-show="false">{{ beer.ibu }} IBU</div>
        <div>
             <hop-rating :value="beer.hops" :disabled="true" v-if="beer.hops"></hop-rating>
        </div>
    </div>
</div>
</template>

<script>
import Srm from './SrmPicker'
import GlassPicker from './GlassPicker'
import HopRating from './HopRating'

export default {
    name: 'beer-view',
    components: {
        Srm,
        GlassPicker,
        HopRating
    },
    props: ['beer'],
    computed: {
        srm () {
            return this.beer.srm && `${this.beer.srm} SRM`
        }
    }
}
</script>

<style scoped>
.columns.is-gapless > .column {
    padding: 10px;
}
.beer-name {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 5px;
}
.beer-style {
    font-style: italic;
}
.column:first-child  div {
    display: inline-block;
}
</style>
