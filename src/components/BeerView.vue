<template>
<div class="columns is-gapless">
    <div class="column">{{ beer.data.srm }} SRM<br>{{ beer.data.glass }} glass</div>
    <div class="column is-half">{{ beer.data.name }}<br>{{ beer.data.description }}</div>
    <div class="column">{{ beer.data.abv }}% abv<br>{{ beer.data.ibu }} IBU</div>
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
