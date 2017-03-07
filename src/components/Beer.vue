<template>
<div>
    <beer-edit v-if="beer.isEditing" :beer="beer"></beer-edit>
    <beer-view v-else :beer="beer"></beer-view>
</div>
</template>

<script>
import BeerView from './BeerView'
import BeerEdit from './BeerEdit'

export default {
    name: 'beer',
    props: ['beer'],
    components: {
        'beer-view': BeerView,
        'beer-edit': BeerEdit
    }
}
</script>

<style scoped>
div {
    border: 1px solid;
}
</style>
