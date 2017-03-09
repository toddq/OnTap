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
                {'beer-added': this.onBeerAdded},
                {'beer-updated': this.onBeerSaved},
                {'beer-deleted': this.onBeerDeleted},
                {'error': this.onError}
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
        onBeerAdded (beer) {
            console.log('beer saved', beer.name)
            Toast.success('Added ' + beer.name)
        },
        onBeerSaved (beer) {
            console.log('beer saved', beer.name)
            Toast.success('Saved ' + beer.name)
        },
        onBeerDeleted (beer) {
            console.log('beer deleted', beer.name)
            Toast.success('Deleted ' + beer.name)
        },
        onError (msg, error) {
            console.error(msg, error)
            Toast.error(msg)
        }
    }
}
</script>
