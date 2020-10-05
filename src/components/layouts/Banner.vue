<template>
    <section class="banner">
        <video class="banner__video" autoplay="" preload="metadata" loop="" muted="" playsinline="" :poster="require('../../assets/video/'+ banner.bgImg)">
            <source :src="require('../../assets/video/' + banner.bgVideo1)" type="video/mp4">
            <source :src="require('../../assets/video/' + banner.bgVideo2)" type="video/webm">
        </video>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <span class="subtitle banner__subtitle">
                        {{banner.subtitle}}
                    </span>
                    <h1 class="title banner__title">
                        {{banner.title}}
                    </h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Banner",
        props: {
            banner: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
    }
</script>

<style lang="scss">
    .banner {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        color: #fff;

        &::before {
            content: "";
            position: absolute;
            z-index: 0;
            background-image: url("~@/assets/video/pix.png");
            background-repeat: repeat;
            background-position: center;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

        &__video {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
        }

        &__poster {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }
</style>