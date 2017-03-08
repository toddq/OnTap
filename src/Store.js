// temporary stopgap, recommended by https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
// until I try out Vuex
export default {
    debug: true,
    state: {
        canEdit: true
    },
    isEditing (newValue) {
        this.debug && console.log('currently editing is now', newValue)
        this.state.canEdit = !newValue
    },
    canEdit () {
        return this.state.canEdit
    }
}
