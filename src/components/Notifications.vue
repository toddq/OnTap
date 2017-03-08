<template></template>

<!-- Map application events to user notifications -->

<script>
import eventBus from '@/EventBus'
import Toast from '@/components/Toast'

export default {
    name: 'notifications',
    data () {
        return {
            subscriptions: [
                {'beer-saved': this.onBeerSaved},
                {'beer-deleted': this.onBeerDeleted}
            ]
        }
    },
    created () {
        this.subscriptions.forEach((subscription) => {
            var key = Object.keys(subscription)[0]
            eventBus.$on(key, subscription[key])
        })
    },
    destroyed () {
        this.subscriptions.forEach((subscription) => {
            var key = subscription.keys()[0]
            eventBus.$off(key, subscription[key])
        })
    },
    methods: {
        onBeerSaved (beer) {
            console.log('beer saved', beer.data.name)
            Toast.success('Saved ' + beer.data.name)
        },
        onBeerDeleted (beer) {
            console.log('beer deleted', beer.data.name)
            Toast.success('Deleted ' + beer.data.name)
        }
    }
}
</script>
