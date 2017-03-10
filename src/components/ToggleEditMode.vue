<template>
<div>
    <button class="button" @click="toggleEditMode" :class="{'is-warning': sharedState.isEditMode()}">

        <span v-if="sharedState.isEditMode()">
            <icon name="pencil" class="icon"></icon>
            <span>Editing</span>
        </span>
        <span v-else>
            <icon name="eye" class="icon"></icon>
            <!-- <span>View Mode</span> -->
        </span>
    </button>
</div>
</template>

<script>
import store from '@/Store'
import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/pencil'

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
                path = path.replace(/edit$/, '')
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
