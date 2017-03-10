<template>
<div class="columns is-gapless">
    <!-- these will eventually be their own sub-components -->
    <div class="column is-2">{{ srm }}<br>{{ glass }}</div>
    <div class="column">
        <div class="beer-name">{{ beer.name }}</div>
        <div class="beer-style">{{ beer.style }}</div>
        <div class="beer-description">{{ beer.description }}</div>
    </div>
    <div class="column is-3">{{ beer.abv }}% abv<br>{{ beer.ibu }} IBU</div>
</div>
</template>

<script>
export default {
    name: 'beer-view',
    props: ['beer'],
    computed: {
        srm () {
            return this.beer.srm && `${this.beer.srm} SRM`
        },
        glass () {
            return this.beer.glass && `${this.beer.glass} glass`
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
</style>
