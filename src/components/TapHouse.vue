<template>
<div class="taphouse">
    <div class="header">
        <img src="../assets/logo.png" class="logo">
        <span class="title">Beers on tap</span>
    </div>
    <beer-list></beer-list>
</div>
</template>

<script>
import BeerList from './BeerList'
export default {
    name: 'taphouse',
    components: {
        'beer-list': BeerList
    }
}
</script>

<style scoped lang="scss">
.taphouse {
    .header {
        margin-bottom: 20px;
    }
    img.logo {
        height: 40px;
        padding-right: 10px;
    }
    .title {
        font-size: 3em;
        text-transform: uppercase;
    }

}
</style>
