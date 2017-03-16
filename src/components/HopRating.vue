<template>
<div class="star-rating" :class="{disabled: disabled}">
    <label class="star-rating__star"
        v-for="rating in ratings"
        :class="{'is-selected': rating_value >= rating}"
        @mouseover="mouseover(rating)" @mouseout="mouseout" @click="set(rating)">
        <input class="star-rating star-rating__checkbox"
            type="radio" v-model="rating_value"
            :value="rating" :disabled="disabled" >
            <span class="hop-icon"></span>
    </label>
</div>
</template>

<script>
export default {
    name: 'HopRating',
    data () {
        return {
            rating_value: this.value,
            temp_value: null,
            ratings: [1, 2, 3, 4, 5]
        }
    },
    props: {
        value: null,
        disabled: Boolean
    },
    methods: {
        mouseover (index) {
            this.rating_value = index
        },
        mouseout () {
            this.rating_value = this.temp_value
        },
        set (value) {
            this.temp_value = value
            this.rating_value = value
            this.$emit('change', this.rating_value)
        }
    }
}
</script>

<style lang="scss" scoped>

.star-rating {

    &:disabled, &.disabled {
        pointer-events: none;
    }

    &__star {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 25px;
        background-size: contain;
        background-repeat: no-repeat;
        // TODO
        // background-image: url('../assets/hop_white_empty.svg');

        &:hover {
            cursor: pointer;
        }

        &.is-selected {
            width: 23px;
            height: 30px;
            // TODO
            // background-image: url('../assets/hop_green.svg');
        }
    }

    &__checkbox {
        display: none;
    }
}
</style>
