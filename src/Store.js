// temporary stopgap, recommended by https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
// until I try out Vuex
export default {
    debug: true,
    state: {
        isEditMode: false,
        currentlyEditing: false
    },
    isEditing (newValue) {
        if (newValue !== undefined) {
            this.debug && console.log('currently editing is now', newValue)
            this.state.currentlyEditing = newValue
        }
        return this.state.currentlyEditing
    },
    canEdit () {
        return this.isEditMode() && !this.state.currentlyEditing
    },
    isEditMode (editMode) {
        if (editMode !== undefined) {
            this.state.isEditMode = !!editMode
        }
        return this.state.isEditMode
    }
}
