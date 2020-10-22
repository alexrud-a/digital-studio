<template>
    <transition name="slide-fade">
        <div class="home">
        <Banner :banner="banner" :isHome="isHome"/>
        <section class="section section--gray pb-0">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            {{ $prismic.richTextAsPlain(section1.subtitle) }}
                        </span>
                        <h2 class="title title--section">
                            {{ $prismic.richTextAsPlain(section1.title) }}
                        </h2>
                        <prismic-rich-text :field="section1.text" class="text text--center"/>
                    </div>
                </div>
            </div>
            <div class="container-fluid p-0">
                <div class="icons">
                    <div v-for="(icon, index) in icons" :key="index" class="icons__item">
                        <router-link
                                :to="{name: 'Solution', params: { name: icon.link.tags[0] }}"
                                class="link"
                        >
                            <svg>
                                <use :href="'img/icons.svg#icon'+index"></use>
                            </svg>
                            <h4 class="icons__title">
                                {{ $prismic.richTextAsPlain(icon.title) }}
                            </h4>
                            <span class="icons__text">
                                {{ $prismic.richTextAsPlain(icon.text) }}
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-4 col-sm-12">
                        <span class="subtitle subtitle--left">
                            {{ $prismic.richTextAsPlain(section2.subtitle) }}
                        </span>
                        <h2 class="title title--section title--left title--mini">
                            {{ $prismic.richTextAsPlain(section2.title) }}
                        </h2>
                    </div>
                    <div class="col-md-8 col-sm-12">
                        <prismic-rich-text :field="section2.text" class="text text--mini"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mini-banner">
                            <img src="/img/banner_bg.jpeg" class="mini-banner__img">
                            <router-link
                                    class="mini-banner__link"
                                    :to="{name: 'Solutions'}">
                                Выбрать услугу
                            </router-link>
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
                            {{ $prismic.richTextAsPlain(section3.subtitle) }}
                        </span>
                        <h2 class="title title--section">
                            {{ $prismic.richTextAsPlain(section3.title) }}
                        </h2>
                        <prismic-rich-text :field="section3.text" class="text text--center"/>
                    </div>
                </div>
            </div>
            <div class="container p-0">
                <div class="clients">
                    <div class="clients__item" v-for="(cat, index) in categories" :key="index">
                        <svg>
                            <use :href="'/img/clients.svg#'+cat.icon[0].text"></use>
                        </svg>
                        <span>
                            {{cat.cat[0].text}}
                        </span>
                    </div>
                </div>
            </div>
        </section>
        <FooterTop/>
        <Preloader :isLoad="isLoad"/>
    </div>
    </transition>
</template>

<script>
    import Banner from "../layouts/Banner"
    import FooterTop from "../layouts/FooterTop";
    import Preloader from "../layouts/Preloader";

    export default {
        name: "Home",
        data () {
            return {
                isHome: true,
                isLoad: false,
                banner: {
                    title: '',
                    subtitle: '',
                    bgImg: '',
                    bgVideo1: '',
                    bgVideo2: '',
                },
                section1: {
                    subtitle: '',
                    title: '',
                    text: ''
                },
                section2: {
                    subtitle: '',
                    title: '',
                    text: ''
                },
                section3: {
                    subtitle: '',
                    title: '',
                    text: ''
                },
                icons: {},
                categories: {},
            };
        },
        metaInfo: {
            title: 'Digital Elements - Разработка и продвижение сайтов',
            meta: [
                { name: 'description', content: 'Разработка сайтов под ключ, сопровождение и поддержка сайтов. Продвижение и реклама' }
            ],
        },
        components: {
            Preloader,
            FooterTop,
            Banner,
        },
        methods: {
            loading: function () {
                let self = this;
                self.isLoad = true
            },
            getContent () {
                let self = this;
                self.$prismic.client.getSingle('home')
                    .then((document) => {
                        self.banner.title = document.data.title;
                        self.banner.subtitle = document.data.subtitle;
                        self.banner.bgImg = document.data.bgImg.url;
                        self.banner.bgVideo1 = document.data.bgVideo1.url;
                        self.banner.bgVideo2 = document.data.bgVideo2.url;
                        self.section1 = {
                            title: document.data.section[0].title,
                            subtitle: document.data.section[0].subtitle,
                            text: document.data.section[0].text
                        };
                        self.section2 = {
                            title: document.data.section[1].title,
                            subtitle: document.data.section[1].subtitle,
                            text: document.data.section[1].text
                        };
                        self.section3 = {
                            title: document.data.section[2].title,
                            subtitle: document.data.section[2].subtitle,
                            text: document.data.section[2].text
                        }
                        self.icons = document.data.icons;
                        self.categories = document.data.categories;
                        setTimeout(this.loading, 1000);
                    })
                },
        },
        created () {
            this.getContent();
        },
    }
</script>

<style lang="scss">
    .slide-fade-enter-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        filter: grayscale(1);
    }
    .slide-fade-leave-active {
        transition: all .10s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        filter: grayscale(1);
        opacity: 0;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        opacity: 0;
    }
    .home {
        .banner {
            height: 100vh;
        }
    }

    .icons {
        display: flex;
        flex-wrap: wrap;
        margin: 40px 0 0;

        &__item {
            width: 50%;
            text-align: center;
            padding: 20px 10px 40px;
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
            font-size: 14px;

            @media screen and (min-width: $tablet) {
                font-size: 18px;
            }

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

    .clients {
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;

        &__item {
            width: 33.3333%;
            padding: 10px;
            border-right: 1px solid #c8c8c8;
            border-bottom: 1px solid #c8c8c8;
            transition: all .3s linear;
            max-height: 125px;
            text-align: center;

            &:nth-of-type(3n) {
                border-right: none;
            }

            &:nth-last-of-type(-n+3) {
                border-bottom: none;
            }

            @media screen  and (min-width: $tablet) {
                max-height: 165px;
                padding: 20px;
            }
            @media screen and (min-width: $desktop) {
                width: 16.6666%;

                &:nth-of-type(3n) {
                    border-right: 1px solid #c8c8c8;
                }

                &:nth-last-of-type(-n+3) {
                    border-bottom: 1px solid #c8c8c8;
                }

                &:nth-of-type(6n) {
                    border-right: none;
                }

                &:nth-last-of-type(-n+6) {
                    border-bottom: none;
                }
            }

            span {
                display: block;
                font-weight: 700;
                font-size: 12px;

                @media screen  and (min-width: $tablet) {
                    font-size: 14px;
                }
            }

            svg {
                width: 60px;
                height: 60px;
                max-width: 100%;
                max-height: 100%;
                margin-bottom: 10px;

                @media screen  and (min-width: $tablet) {
                    width: 80px;
                    height: 80px;
                }
            }

            &:hover {
                background-color: $base-color;

                svg {
                    fill: #fff;
                }

                span {
                    color: #fff;
                }
            }
        }
    }

</style>