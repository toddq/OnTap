<template>
<div>
    <button class="button" @click="toggleEditMode" :class="{'is-warning': sharedState.isEditMode()}">
        <span v-if="sharedState.isEditMode()">EditMode</span>
        <span v-else>View Mode</span>
    </button>
</div>
</template>

<script>
import store from '@/Store'

export default {
    name: 'toggle-edit-mode',
    data () {
        return {
            sharedState: store
        }
    },
    methods: {
        toggleEditMode () {
            var path = this.$route.path.replace(/\/$/, '')
            if (this.sharedState.isEditMode()) {
                path = path.replace(/\/edit$/, '')
            } else {
                path += '/edit'
            }
            this.$router.push({path: path})
        }
    }
}
</script>

<style scoped>
button {
    position: absolute;
    margin-left: 10px;
}
</style>
