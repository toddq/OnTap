<!-- Application toast notification lib      -->
<!-- Currently wraps the the vue-toasted lib -->

<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
Vue.use(Toasted, {duration: 2000})

export default {
    success (msg) {
        Vue.toasted.success(msg)
    },
    error (msg) {
        var toast = Vue.toasted.error(msg, {duration: 60000})
        // the library should be doing this
        toast.addEventListener('click', function () {
            toast.remove()
        })
    }
}
</script>

<style lang="scss">
// wish there was a better way to override these than important?
.toasted {
    top: 20px !important;
    padding: 20px 40px !important;
    font-size: 1.5em !important;
    border-radius: 5px !important;
    min-width: 200px;
}
</style>
