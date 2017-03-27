<template>
<div class="glass-picker">
    <div class="current-glass" @click="showPicker()">
        <svg-icon :type="type"></svg-icon>
    </div>
</div>
</template>

<script>
import SvgIcon from './SvgIcon'
import PubPint from '!svg-sprite-loader!@/assets/svg/pub_pint.svg'
import Bottle from '!svg-sprite-loader!@/assets/svg/bottle.svg'
import Carboy from '!svg-sprite-loader!@/assets/svg/carboy.svg'
console.log('pint: ', PubPint, Bottle, Carboy)

export default {
    name: 'GlassPicker',
    components: {
        SvgIcon
    },
    props: {
        glass: String,
        disabled: Boolean
    },
    data () {
        return {
            type: this.glass
        }
    },
    methods: {
        showPicker () {
            console.log('show picker')
        }
    }
}
</script>

<style  scoped>
svg {
    height: 50px;
    width: 50px;
    fill: white;
}
</style>
