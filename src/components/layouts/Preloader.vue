<template>
    <div class="preloader" :class="{'preloader--none' : isLoad}">
        <img class="preloader__img" src="~@/assets/img/logo-min.svg">
    </div>
</template>

<script>

    export default {
        name: "Preloader",
        props: {
            isLoad: {
                type: Boolean,
                default() {
                    return false
                }
            }
        }
    }
</script>

<style lang="scss">
    @keyframes rotation {
        0% {
            transform:rotate(0deg);
        }
        100% {
            transform:rotate(360deg);
        }
    }
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(#fff, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;

        &__img {
            animation-name: rotation;
            animation-duration: 5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }

        &--none {
            display: none;
        }
    }
</style>