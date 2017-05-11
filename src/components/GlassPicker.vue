<template>
<div class="glass-picker">
    <div class="current-glass" @click="showPicker()">
        <svg-icon :type="type" :style="{color: color}"></svg-icon>
    </div>
</div>
</template>

<script>
import SvgIcon from './SvgIcon'
import PubPint from '!svg-sprite-loader!@/assets/svg/pub_pint.svg'
import Goblet from '!svg-sprite-loader!@/assets/svg/goblet.svg'
import Bottle from '!svg-sprite-loader!@/assets/svg/bottle.svg'
import Carboy from '!svg-sprite-loader!@/assets/svg/carboy.svg'
console.log('pint: ', PubPint, Bottle, Carboy, Goblet)
import SRM from '@/lib/srm'

export default {
    name: 'GlassPicker',
    components: {
        SvgIcon
    },
    props: {
        glass: String,
        srm: Number,
        disabled: Boolean
    },
    data () {
        return {
            type: this.glass
        }
    },
    computed: {
        color () {
            return SRM.toHex(this.srm)
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
    fill: #ffffff;
    color: transparent;
}
</style>
