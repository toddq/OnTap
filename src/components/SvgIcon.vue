<template>
<svg>
    <use :xlink:href="href"></use>
</svg>
</template>

<script>
export default {
    name: 'svg-icon',
    props: {
        type: String
    },
    computed: {
        href () {
            return `#${this.type}`
        }
    }
}
</script>
