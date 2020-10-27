<template>
    <transition name="slide-fade">
        <div class="team">
            <Banner :banner="content.banner"/>
            <section v-for="(section, i) in content.section"
                     :key="i"
                    class="section section--gray pb-0"
            >
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-sm-12 columns-2">
                            <span class="subtitle subtitle--left">
                                {{ section.subtitle }}
                            </span>
                            <h2 class="title title--section title--left">
                                {{ section.title }}
                            </h2>
                            <div class="text text--mini"
                                 v-html="section.text">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid p-0">
                    <div class="icons icons--no-hover">
                        <div v-for="(icon, index) in content.uslugi" :key="index" class="icons__item">
                            <svg>
                                <use :href="'img/icons-team.svg#icon'+index"></use>
                            </svg>
                            <h4 class="icons__title">
                                {{ icon.title }}
                            </h4>
                            <span class="icons__text">
                                {{ icon.desc }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="team__slider" v-if="content.slider.length > 0">
                <div class="container-fluid">
                    <div class="row d-flex align-items-center flex-wrap-reverse">
                        <div class="col-lg-6 col-md-12">
                            <VueAgile ref="main" :as-nav-for="[$refs.thumbnails]" :options="sliderOpt" class="team__slider-one" @before-change="showCurrentSlide($event)">
                                <div v-for="(slide, index) in content.slider" :key="index">
                                    <span class="subtitle">
                                        {{ slide.position }}
                                    </span>
                                    <h2 class="title">
                                        {{ slide.name }}
                                    </h2>
                                    <div class="text text--center"
                                         v-html="slide.text">
                                    </div>
                                </div>
                            </VueAgile>
                            <div class="container">
                                <div class="team__slider-dots">
                                    <span class="team__slider-dot" v-for="(dot, index) in content.slider" :key="index" @click="slideGo(index)" :class="{'team__slider-dot--active' : index === activeSlide }">
                                        {{ dot.title }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 p-0">
                            <VueAgile ref="thumbnails" :as-nav-for="[$refs.main]" :options="sliderOpt" class="team__slider-two">
                                <div v-for="(slideThumb, index) in content.slider" :key="index">
                                    <img :src="slideThumb.img">
                                </div>
                            </VueAgile>
                        </div>
                    </div>
                </div>
            </section>
            <Preloader :isLoad="isLoad" />
        </div>
    </transition>
</template>

<script>
    import Banner from "../layouts/Banner";
    import { VueAgile } from 'vue-agile';
    import Preloader from "../layouts/Preloader";
    import axios from "axios";

    export default {
        name: "Team",
        components: {
            Banner,
            VueAgile,
            Preloader
        },
        data () {
            return {
                isLoad: false,
                content: [],
                meta: [],
                metaTitle: '',
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
        metaInfo() {
            return {
                title: this.metaTitle,
                meta: this.meta,
            }
        },
        methods: {
            loading: function () {
                let self = this;
                self.isLoad = true
            },
            getContent() {
                return axios('https://admin.studio-elements.ru/wp-json/wp/v2/pages/23', {
                    method: "GET"
                })
                    .then((response) => {
                        this.content = response.data.acf;
                        this.meta = response.data.yoast_meta;
                        this.metaTitle = response.data.yoast_title;
                        setTimeout(this.loading, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                        return error;
                    })
            },
            slideGo(index) {
                this.$refs.main.goTo(index);
            },
            showCurrentSlide (event) {
                this.activeSlide = event.nextSlide;
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
                    max-height: 900px;
                    object-fit: cover;
                    object-position: center top;
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