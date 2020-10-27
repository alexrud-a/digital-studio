<template>
    <transition name="slide-fade">
        <div class="solution">
        <Banner :banner="content.banner"/>
        <section class="section"
                 :class="{'section--gray' : (i === 0)}"
                 v-for="(section, i) in content.section"
                 :key="i"
        >
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-12">
                        <span class="subtitle"
                              :class="{'subtitle--left' : (i === 0)}"
                        >
                            {{ section.subtitle }}
                        </span>
                        <h2 class="title title--section"
                            :class="{'title--left title--mini' : (i === 0)}"
                        >
                            {{ section.title }}
                        </h2>
                        <div class="text"
                             :class="{'columns-2 text--mini' : i === 0, 'text--center' : i === 1}"
                             v-html="section.text">
                        </div>
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
    import axios from "axios";

    export default {
        name: "Solution",
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
                let self = this;
                return axios('https://admin.studio-elements.ru/wp-json/wp/v2/pages', {
                    method: "GET",
                })
                    .then((response) => {
                        let page = response.data.filter(function (item) {
                            return item.slug === self.$route.params.name
                        });
                        this.content = page[0].acf;
                        this.meta = page[0].yoast_meta;
                        this.metaTitle = page[0].yoast_title;
                        setTimeout(this.loading, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                        return error;
                    })
            },
        },
        created() {
            this.getContent();
        },
    }
</script>

<style lang="scss">
</style>