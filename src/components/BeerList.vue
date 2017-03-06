<template>
<div>
    <hr/>
    <li v-for="beer in beers">
        {{ beer.name }}
    </li>
</div>
</template>

<script>
export default {
    name: 'beer-list',
    data () {
        return {
            beers: []
        }
    },
    mounted () {
        this.beers.push({name: 'Beer 1'})
        this.beers.push({name: 'Beer 2'})
        this.beers.push({name: 'Beer 3'})
    }
}
</script>

<style scoped>

</style>
