<template>
    <transition name="slide-fade">
        <div class="solutions">
        <Banner :banner="content.banner"/>
        <section v-for="(section, i) in content.section"
                 :key="i"
                class="section"
                 :class="{'section--gray' : i === 0, 'pb-0' : i === 1}"
        >
            <div class="container">
                <div class="row"
                     :class="{'align-items-center' : i === 0}"
                >
                    <div class="col-sm-12">
                        <span class="subtitle"
                              :class="{'subtitle--left' : i === 0}"
                        >
                            {{ section.subtitle }}
                        </span>
                        <h2 class="title title--section"
                            :class="{'title--left title--mini' : i === 0}"
                        >
                            {{ section.title }}
                        </h2>
                        <div class="text text--mini"
                             :class="{'columns-2' : i === 0, 'text--center' : i === 1}"
                             v-html="section.text">
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid p-0" v-if="i === 1">
                <div class="icons">
                    <div v-for="(icon, index) in content.uslugi" :key="index" class="icons__item">
                        <router-link
                                :to="{name: 'Solution', params: { name: icon.link.post_name }}"
                                class="link"
                        >
                            <svg>
                                <use :href="'img/icons.svg#icon'+index"></use>
                            </svg>
                            <h4 class="icons__title">
                                {{ icon.title }}
                            </h4>
                            <span class="icons__text">
                                    {{ icon.desc }}
                                </span>
                        </router-link>
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
    import Banner from "../layouts/Banner";
    import FooterTop from "../layouts/FooterTop";
    import Preloader from "../layouts/Preloader";

    import axios from 'axios'

    export default {
        name: "Solutions",
        components: {
            Banner,
            FooterTop,
            Preloader,
        },
        data () {
            return {
                isLoad: false,
                content: [],
                meta: [],
                metaTitle: ''
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
                return axios('https://admin.studio-elements.ru/wp-json/wp/v2/pages/13', {
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
            }
        },
        created() {
            this.getContent();
        }
    }
</script>

<style>

</style>