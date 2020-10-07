<template>
    <div class="home">
        <Banner :banner="banner"/>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle banner__subtitle">
                            {{section1.subtitle[0].text}}
                        </span>
                        <h2 class="title">
                            {{section1.title[0].text}}
                        </h2>
                        <p class="text">
                            {{section1.text[0].text}}
                        </p>
                    </div>
                    <div v-for="(icon, index) in icons" :key="index" class="col-lg-3 col-sm-6">
                        <a :href="icon.link.tags[0]">
                            <svg>
                                <use :href="'img/icons.svg#icon'+index"></use>
                            </svg>
                            <h4>
                                {{icon.title[0].text}}
                            </h4>
                            <span>
                                {{icon.text[0].text}}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <span class="subtitle banner__subtitle">
                            {{section2.subtitle[0].text}}
                        </span>
                        <h2 class="title">
                            {{section2.title[0].text}}
                        </h2>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <p class="text">
                            {{section2.text[0].text}}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle banner__subtitle">
                            {{section3.subtitle[0].text}}
                        </span>
                        <h2 class="title">
                            {{section3.title[0].text}}
                        </h2>
                        <p class="text">
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

<style scoped>

</style>