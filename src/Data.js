import eventBus from '@/EventBus'

export default {
    load () {
        console.log('loading fake beer list')
        return [{
            id: Math.floor(Math.random() * 100),
            data: {
                name: 'Beer 1', srm: 5, glass: 'nonic', description: 'A crisp refreshing German Lager', abv: 4.9, ibu: 28
            }
        }, {
            id: Math.floor(Math.random() * 100),
            data: {
                name: 'Beer 2', srm: 12, glass: 'shaker', description: 'A hoppy American Pale Ale', abv: 5.4, ibu: 36
            }
        }, {
            id: Math.floor(Math.random() * 100),
            data: {
                name: 'Beer 3', srm: 35, glass: 'tulip', description: 'Robust Porter', abv: 6.7, ibu: 32
            }
        }]
    },
    save (beer) {
        console.log('Data: saving beer', beer)
        eventBus.$emit('beer-saved', beer)
    },
    delete (beer) {
        console.log('Data: deleting beer', beer)
        eventBus.$emit('beer-deleted', beer)
    }
}
