<template>
    <div class="team">
        <Banner :banner="banner"/>
        <section class="section">
            <div class="container-fluid p-0">
                <div class="icons icons--no-hover">
                    <div v-for="(icon, index) in icons" :key="index" class="icons__item">
                        <svg>
                            <use :href="'img/icons-team.svg#icon'+index"></use>
                        </svg>
                        <h4 class="icons__title">
                            {{icon.title[0].text}}
                        </h4>
                        <span class="icons__text">
                            {{icon.text[0].text}}
                        </span>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-12 columns-2">
                        <span class="subtitle subtitle--left">
                            {{section.subtitle}}
                        </span>
                        <h2 class="title title--section title--left title--mini">
                            {{section.title}}
                        </h2>
                        <p class="text text--mini">
                            {{section.text}}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="team__slider">
            <div class="container-fluid">
                <div class="row d-flex align-items-center flex-wrap-reverse">
                    <div class="col-lg-6 col-md-12">
                        <template v-if="slider.length > 0">
                            <VueAgile ref="main" :as-nav-for="[$refs.thumbnails]" :options="sliderOpt" class="team__slider-one" @before-change="showCurrentSlide($event)">
                                <div v-for="(slide, index) in slider" :key="index">
                                    <span class="subtitle">
                                        {{slide.subtitle[0].text}}
                                    </span>
                                    <h2 class="title">
                                        {{slide.title[0].text}}
                                    </h2>
                                    <p class="text text--center">
                                        {{slide.text[0].text}}
                                    </p>
                                </div>
                            </VueAgile>
                            <div class="container">
                                <div class="team__slider-dots">
                                    <span class="team__slider-dot" v-for="(dot, index) in slider" :key="index" @click="slideGo(index)" :class="{'team__slider-dot--active' : index === activeSlide }">
                                        {{dot.nameSlide[0].text}}
                                    </span>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="col-lg-6 col-md-12 p-0">
                        <template v-if="slider.length > 0">
                            <VueAgile ref="thumbnails" :as-nav-for="[$refs.main]" :options="sliderOpt" class="team__slider-two">
                                <div v-for="(slideThumb, index) in slider" :key="index">
                                    <img :src="slideThumb.img.url">
                                </div>
                            </VueAgile>
                        </template>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";
    import { VueAgile } from 'vue-agile';
    export default {
        name: "Team",
        components: {
            Banner,
            VueAgile
        },
        data () {
            return {
                banner: {
                    title: '',
                    subtitle: '',
                    bgImg: '',
                    bgVideo1: '',
                    bgVideo2: '',
                },
                section: {
                    subtitle: '',
                    title: '',
                    text: ''
                },
                icons: {},
                slider: {},
                sliderOpt: {
                    slideToShow: 1,
                    SlideToScroll: 1,
                    navButtons: true,
                    dots: false,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                navButtons: false
                            }
                        },
                    ]
                },
                activeSlide: 0,
            };
        },
        methods: {
            getContent () {
                let self = this;
                self.$prismic.client.getSingle('team')
                    .then((document) => {
                        self.banner.title = document.data.title[0].text;
                        self.banner.subtitle = document.data.subtitle[0].text;
                        self.banner.bgImg = document.data.bgImg.url;
                        self.section = {
                            title: document.data.section[0].title[0].text,
                            subtitle: document.data.section[0].subtitle[0].text,
                            text: document.data.section[0].text[0].text
                        };
                        self.icons = document.data.icons;
                        self.slider = document.data.slider;
                    })
            },
            slideGo(index) {
                this.$refs.main.goToNext(index);
                //this.$refs.thumbnails.goToNext(index);
            },
            showCurrentSlide (event) {
                this.activeSlide = event.currentSlide;
            }
        },
        created () {
            this.getContent();
        },
    }
</script>

<style lang="scss">
    #app {
        .team {
            .icons {
                &--no-hover {
                    .icons__item {
                        &:hover {
                            background-color: transparent;

                            .icons__text {
                                color: $base-color;
                            }
                        }

                        @media screen and (min-width: $tablet) {
                            padding: 60px 40px 80px;
                        }

                        @media screen and (min-width: $desktop) {
                            width: 25%;
                            padding: 60px 40px 80px;
                        }

                        .icons__text {
                            @media screen and (min-width: $desktop) {
                                opacity: 1;
                            }
                        }
                    }
                }
            }

            &__slider {
                background-color: #000;
                color: #fff;
            }

            &__slider-one {
                padding: 40px 0;

                @media screen and (min-width: $tablet) {
                    padding: 60px 40px;
                }

                .title {
                    color: $accent-color;
                    font-size: 36px;
                    margin-bottom: 40px;

                    @media screen and (min-width: $tablet) {
                        font-size: 48px;
                    }

                    @media screen and (min-width: $desktop) {
                        font-size: 72px;
                    }
                }

                .text {
                    font-size: 14px;
                    color: #999;
                    margin-bottom: 20px;

                    @media screen and (min-width: $tablet) {
                        font-size: 18px;
                    }

                    @media screen and (min-width: $desktop) {
                        font-size: 20px;
                    }
                }

                .agile__actions {
                    display: none;
                }
            }

            &__slider-two {
                .agile__slide {
                    width: 100%;
                    height: 100%;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .agile__actions {
                    justify-content: center;
                    z-index: 1;
                    position: relative;
                    transform: translateY(-50%);
                }

                .agile__nav-button {
                    border: none;
                    background-color: $base-color;
                    color: #fff;
                    width: 45px;
                    height: 45px;
                    font-size: 25px;
                    margin: 1px;
                }
            }

            &__slider-dots {
                display: none;

                @media screen and (min-width: $tablet) {
                    text-align: center;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 40px;
                    padding: 0 40px;
                }
            }

            &__slider-dot {
                cursor: pointer;
                font-size: 20px;
                border-bottom: 1px solid #fff;
                width: 25%;
                padding-bottom: 20px;

                &--active {
                    color: $accent-color;
                    border-bottom: 1px solid $accent-color;
                }
            }
        }
    }
</style>