<template>
    <div class="home">
        <Banner :banner="banner"/>
        <section class="section section--gray pb-0">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            {{section1.subtitle[0].text}}
                        </span>
                        <h2 class="title title--section">
                            {{section1.title[0].text}}
                        </h2>
                        <p class="text text--center">
                            {{section1.text[0].text}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="container-fluid p-0">
                <div class="icons">
                    <div v-for="(icon, index) in icons" :key="index" class="icons__item">
                        <a :href="icon.link.tags[0]" class="link">
                            <svg>
                                <use :href="'img/icons.svg#icon'+index"></use>
                            </svg>
                            <h4 class="icons__title">
                                {{icon.title[0].text}}
                            </h4>
                            <span class="icons__text">
                                    {{icon.text[0].text}}
                                </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 col-sm-12">
                        <span class="subtitle subtitle--left">
                            {{section2.subtitle[0].text}}
                        </span>
                        <h2 class="title title--section title--left title--mini">
                            {{section2.title[0].text}}
                        </h2>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <p class="text text--mini">
                            {{section2.text[0].text}}
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mini-banner">
                            <img src="/img/banner_bg.jpeg" class="mini-banner__img">
                            <a href="#" class="mini-banner__link">
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            {{section3.subtitle[0].text}}
                        </span>
                        <h2 class="title title--section">
                            {{section3.title[0].text}}
                        </h2>
                        <p class="text text--center">
                            {{section3.text[0].text}}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";

    export default {
        name: "Home",
        data () {
            return {
                banner: {
                    title: null,
                    subtitle: null,
                    bgImg: null,
                    bgVideo1: null,
                    bgVideo2: null,
                },
                section1: null,
                section2: null,
                section3: null,
                icons: null,
            };
        },
        methods: {
            getContent () {
                this.$prismic.client.getSingle('home')
                    .then((document) => {
                        this.banner.title = document.data.title[0].text;
                        this.banner.subtitle = document.data.subtitle[0].text;
                        this.banner.bgImg = document.data.bgImg.url;
                        this.banner.bgVideo1 = document.data.bgVideo1.url;
                        this.banner.bgVideo2 = document.data.bgVideo2.url;
                        this.section1 = document.data.section[0];
                        this.section2 = document.data.section[1];
                        this.section3 = document.data.section[2];
                        this.icons = document.data.icons;
                    })
                }
        },
        created () {
            this.getContent();
        },
        components: {
            Banner
        }
    }
</script>

<style lang="scss">
    .icons {
        display: flex;
        flex-wrap: wrap;
        margin: 40px 0 0;

        &__item {
            width: 50%;
            text-align: center;
            padding: 20px 20px 40px;
            transition: all .3s linear;

            &:first-child,
            &:nth-child(3) {
                border-right: 1px solid #c8c8c8;
            }

            &:first-child,
            &:nth-child(2) {
                border-bottom: 1px solid #c8c8c8;
            }

            &:hover {
                background-color: $base-color;

                .icons__text {
                    color: #fff;
                }
            }

            svg {
                padding: 15px;
                max-width: 100px;
                max-height: 100px;

                @media screen and (min-width: $desktop) {
                    max-width: 150px;
                    max-height: 150px;
                }
            }

            @media screen and (min-width: $tablet) {
                padding: 60px 40px 80px;
            }

            @media screen and (min-width: $desktop) {
                width: 25%;
                padding: 100px 20px 40px;

                &:first-child,
                &:nth-child(2) {
                    border-bottom: none;
                    border-right: 1px solid #c8c8c8;
                }

                &:hover {
                    padding: 60px 20px 80px;

                    .icons__text {
                        opacity: 1;
                    }
                }
            }
        }

        &__title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;

            @media screen and (min-width: $desktop) {
                font-size: 20px;
                margin-bottom: 20px;
            }
        }

        &__text {
            font-weight: 400;
            color: $base-color;

            @media screen and (min-width: $desktop) {
                opacity: 0;
                font-size: 20px;
            }
        }
    }

    .mini-banner {
        margin: 40px 0 0;
        overflow: hidden;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("~@/assets/banners/pix.png");
            background-repeat: repeat;
            background-position: center;
        }

        &__link {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;
            text-transform: uppercase;
            font-weight: 700;
            color: #fff;
            font-size: 24px;
            transition: all .3s linear;

            &:hover {
                color: $accent-color;
            }
        }

        &__img {
            transition: all .2s ease-in-out;
        }

        &:hover .mini-banner__img {
            transform: scale(1.05);
        }
    }

</style>