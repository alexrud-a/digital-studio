<template>
    <section class="banner">
        <video
                v-if="banner.bgVideo1"
                class="banner__video"
                autoplay=""
                preload="metadata"
                loop=""
                muted=""
                playsinline=""
                :poster="banner.bgImg"
        >
            <source
                    :src="banner.bgVideo1"
                    type="video/mp4"
            >
            <source
                    :src="banner.bgVideo2"
                    type="video/webm"
            >
        </video>
        <div v-else class="banner__video">
            <img
                    :src="banner.bgImg"
            >
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <span class="subtitle banner__subtitle">
                        {{ $prismic.richTextAsPlain(banner.subtitle) }}
                    </span>
                    <h1 class="title banner__title">
                        {{ $prismic.richTextAsPlain(banner.title) }}
                    </h1>
                    <router-link
                            class="btn btn--banner btn-lg mt-5 mb-5"
                            :to="{name: 'Contact'}">
                        Бесплатная консультация
                    </router-link>
                </div>
            </div>
        </div>
        <div class="scrollDown">
            <div class="scrollDown__mouse">
                <div class="scrollDown__wheel"></div>
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
            }
        },
    }
</script>

<style lang="scss">
    .banner {
        min-height: 65vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        color: #fff;
        padding: 15px;

        @media screen and (min-width: $tablet) {
            min-height: 60vh;
        }

        &::before {
            content: "";
            position: absolute;
            z-index: 0;
            background-image: url("~@/assets/banners/pix.png");
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

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
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

        .scrollDown {
            position: absolute;
            bottom: 15px;
            padding: 25px;
            padding-bottom: 10px;
            left: 50%;
            z-index: 3;
            margin-left: -33px;
            animation: scrollDown 3s infinite;
            animation-timing-function: ease-out;

            &__mouse {
                position: relative;
                border: 2px solid #fff;
                border-radius: 8px;
                height: 30px;
                width: 18px;
                box-shadow: 0 0 5px rgba(0,0,0,.3);
                animation: mouseFade 2s infinite;
            }

            &__wheel {
                background: #fff;
                position: absolute;
                left: 50%;
                width: 2px;
                border-radius: 2px;
                margin-left: -1px;
                margin-top: 5px;
                height: 6px;
                box-shadow: 0 0 5px rgba(0,0,0,.3);
                animation: wheelScroll 3s infinite;
            }
        }
        @keyframes scrollDown {
            0% {
                transform:translateY(0);
            }
            75% {
                transform:translateY(10%);
            }
            100% {
                transform:translateY(0);
            }
        }

        @keyframes mouseFade {
            0% {
                opacity:1;
            }
            50% {
                opacity:.75;
            }
            100% {
                opacity:1;
            }
        }

        @keyframes wheelScroll {
            0% {
                margin-top:5px;
                opacity:1;
            }
            75% {
                margin-top:15px;
                opacity:0;
            }
            80% {
                margin-top:5px;
                opacity:0;
            }
            100% {
                opacity:1;
            }
        }
    }
</style>