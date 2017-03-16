<template>
<div class="glass-picker">
    <div class="current-glass">
        <!-- <PubPint class="icon" /> -->
        <!-- <svg :id="currentGlass"></svg> -->
        <icon width="75" height="75" :glyph="PubPint"></icon>
        <svg class="svg-icon">
            <use xlink:href="#pub_pint"></use>
        </svg>
    </div>
</div>
</template>

<script>
import Icon from './Icon'
import PubPint from '../assets/pub_pint.svg'

var glasses = [
    'pub_pint',
    'goblet',
    'bottle',
    'carboy'
]
export default {
    name: 'GlassPicker',
    props: {
        glass: {
            default: 'pub_pint'
        }
    },
    data () {
        return {
            glasses: glasses,
            currentGlass: this.glass
        }
    },
    components: {
        Icon
    }
}
</script>

<style scoped>
.icon {
    width: 75px;
    height: 75px;
}
</style>
