import eventBus from '@/EventBus'

class Data {
    constructor () {
        this.route = 'beers'
        this.db = undefined

        eventBus.$on('save-beer', this.save.bind(this))
        eventBus.$on('delete-beer', this.delete.bind(this))
    }
    setDb (db) {
        this.db = db
    }
    getDb () {
        return this.db
    }
    setRoute (route) {
        var _route = `${route || ''}/beers`
        if (this.route !== _route) {
            console.log('Data: setting route to', _route)
            this.route = _route
            eventBus.$emit('route-changed', this.route)
        }
    }
    loadBeers () {
        return this._getRef().orderByChild('sort-order')
    }
    save (beer) {
        if (this._hasKey(beer)) {
            this.update(beer)
        } else {
            this.add(beer)
        }
    }
    add (beer) {
        console.log(`Data: saving new beer '${beer.name}'`, beer)
        this._getRef().push(beer)
            .then((response) => {
                eventBus.$emit('beer-added', beer)
            })
            .catch((error) => {
                this._notifyError(`Error adding beer '${beer.name}'`, error)
            })
    }
    update (beer) {
        console.log(`Data: saving changes to beer '${beer.name}'`, beer)
        // can't 'set' a value with a .key in it, and it's easiest to replace the whole thing
        var beerCopy = Object.assign({}, beer)
        delete beerCopy['.key']
        this._getNode(beer).set(beerCopy)
            .then(() => {
                eventBus.$emit('beer-updated', beer)
            })
            .catch((error) => {
                this._notifyError(`Error updating beer '${beer.name}'`, error)
            })
    }
    delete (beer) {
        console.log(`Data: deleting beer '${beer.name}'`, beer)
        if (this._hasKey(beer)) {
            this._getNode(beer).remove()
                .then(() => {
                    eventBus.$emit('beer-deleted', beer)
                })
                .catch((error) => {
                    this._notifyError(`Error deleting beer '${beer.name}'`, error)
                })
        }
    }
    _getRoute () {
        return this.route
    }
    _getKey (beer) {
        return beer['.key']
    }
    _hasKey (beer) {
        return !!this._getKey(beer)
    }
    _getNode (beer) {
        return this._getRef().child(this._getKey(beer))
    }
    _getRef () {
        return this.getDb().ref(this._getRoute())
    }
    _notifyError (msg, error) {
        this.eventBus.$emit('error', msg, error)
    }
}

// design pattern for es6 singleton object
export let data = new Data()
