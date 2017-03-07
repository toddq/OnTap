<template>
<div class="columns is-gapless">
    <div class="column">{{ data.srm }} SRM<br>{{ data.glass }} glass</div>
    <div class="column is-half">{{ data.name }}<br>{{ data.description }}</div>
    <div class="column">{{ data.abv }}% avb<br>{{ data.ibu }} IBU</div>
</div>
</template>

<script>
export default {
    name: 'beer',
    props: ['data']
}
</script>

<style scoped>
div {
    border: 1px solid;
}
</style>
