<template>
<div>
    <hr/>
    <beer v-for="beer in beers" :data="beer.data"></beer>
</div>
</template>

<script>
import Beer from './Beer'

export default {
    name: 'beer-list',
    components: {
        'beer': Beer
    },
    data () {
        return {
            beers: []
        }
    },
    mounted () {
        this.fetchBeers()
    },
    methods: {
        fetchBeers () {
            // faking it out for now
            this.beers.push({id: 1, data: {name: 'Beer 1', srm: 5, glass: 'nonic', description: 'A crisp refreshing German Lager', abv: 4.9, ibu: 28}})
            this.beers.push({id: 2, data: {name: 'Beer 2', srm: 12, glass: 'shaker', description: 'A hoppy American Pale Ale', abv: 5.4, ibu: 36}})
            this.beers.push({id: 3, data: {name: 'Beer 3', srm: 35, glass: 'tulip', description: 'Robust Porter', abv: 6.7, ibu: 32}})
        }
    }
}
</script>

<style scoped>

</style>
