<template>
<div class="columns is-gapless">
    <div class="column">{{ beer.srm }} SRM<br>{{ beer.glass }} glass</div>
    <div class="column is-half">{{ beer.name }}<br>{{ beer.description }}</div>
    <div class="column">{{ beer.abv }}% abv<br>{{ beer.ibu }} IBU</div>
</div>
</template>

<script>
export default {
    name: 'beer-view',
    props: ['beer']
}
</script>

<style >
.columns.is-gapless > .column {
    padding: 10px;
}
</style>
