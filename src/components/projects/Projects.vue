<template>
    <transition name="slide-fade">
        <div class="projects">
        <Preloader :isLoad="isLoad"/>
        <Banner :banner="content.banner"/>
        <section class="section"
                 v-for="(section, i) in content.section"
                 :key="i"
        >
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            {{ section.subtitle }}
                        </span>
                        <h2 class="title title--section">
                            {{ section.title }}
                        </h2>
                    </div>
                    <div class="col-sm-12">
                        <div class="projects__filter">
                            <div class="projects__filter-item"
                                 :class="{'projects__filter-item--active': activeCat === 'all' }"
                                 @click="sortByCat('all')"
                            >
                                Все
                            </div>
                            <div class="projects__filter-item"
                                 :class="{'projects__filter-item--active': activeCat === cat.id }"
                                 v-for="cat in categories"
                                 :key="cat.id"
                                 @click="sortByCat(cat.id)"
                            >
                                {{cat.name}}
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="projects__wrap">
                            <a v-for="project in filtered"
                               :key="project.id"
                               class="projects__item"
                               :href="project.acf.link"
                               target="_blank"
                            >
                                <img :src="project.better_featured_image.source_url" :alt="project.better_featured_image.alt_text">
                                <div class="projects__title">
                                    {{ project.title.rendered }}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <FooterTop/>
    </div>
    </transition>
</template>

<script>
    import Banner from "../layouts/Banner";
    import FooterTop from "../layouts/FooterTop";
    import Preloader from "../layouts/Preloader";
    import axios from "axios";

    export default {
        name: "Projects",
        data () {
            return {
                activeCat: 'all',
                isLoad: false,
                content: [],
                projects: [],
                categories: [],
                filtered: [],
                meta: [],
                metaTitle: '',
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
            sortByCat(cat) {
                this.filtered = this.projects;
                if (cat && cat != 'all') {
                    this.activeCat = cat;
                    this.filtered = this.projects.filter(function (item) {
                        return item.categories[0] == cat;
                    });
                }
                else {
                    this.activeCat = 'all';
                    this.filtered = this.projects;
                }
            },
            getContent() {
                return axios('https://admin.studio-elements.ru/wp-json/wp/v2/pages/25', {
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
            getProjects() {
                let self = this;
                return axios('https://admin.studio-elements.ru/wp-json/wp/v2/posts', {
                    method: "GET",
                    params: {
                        'per_page': 12
                    }
                })
                    .then((response) => {
                        self.projects = response.data;
                        self.sortByCat();
                    });
            },
            getCategories() {
                let self = this;
                return axios('https://admin.studio-elements.ru/wp-json/wp/v2/categories', {
                    method: "GET"
                })
                    .then((response) => {
                        self.categories = response.data;
                    });
            },
        },
        created () {
            this.getContent();
            this.getProjects();
            this.getCategories()
        },
        components: {
            Banner,
            FooterTop,
            Preloader
        }
    }
</script>

<style lang="scss">
    .projects {
        &__wrap {
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            @media screen and (min-width: $tablet) {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        &__item {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;

            &:before {
                position: absolute;
                content: "";
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%);
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                transition: all .5s linear;
            }

            &:hover {
                img {
                    transform: scale(1.05);
                }
            }
        }

        &__title {
            position: absolute;
            color: #fff;
            bottom: 15px;
            left: 15px;
            font-weight: 700;
            font-size: 18px;

            @media screen and (min-width: $tablet) {
                bottom: 30px;
                left: 30px;
                font-size: 24px;
            }
        }

        &__filter {
            display: flex;
            flex-wrap: wrap;
            margin: 40px 0;
        }

        &__filter-item {
            background-color: rgba($base-color, 0.4);
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 14px;
            line-height: 14px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;

            &--active {
                background-color: $base-color;
            }
        }
    }
</style>