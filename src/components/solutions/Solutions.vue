<template>
    <div class="solutions">
        <Banner :banner="banner"/>
        <section class="section section--gray">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-12">
                        <span class="subtitle subtitle--left">
                            {{section1.subtitle[0].text}}
                        </span>
                        <h2 class="title title--section title--left title--mini">
                            {{section1.title[0].text}}
                        </h2>
                        <p class="text text--mini">
                            {{section1.text[0].text}}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section pb-0">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            {{section2.subtitle[0].text}}
                        </span>
                        <h2 class="title title--section">
                            {{section2.title[0].text}}
                        </h2>
                        <p class="text text--center">
                            {{section2.text[0].text}}
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
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";

    export default {
        name: "Solutions",
        components: {
            Banner
        },
        data () {
            return {
                banner: {
                    title: '',
                    subtitle: '',
                    bgImg: '',
                },
                section1: {},
                section2: {},
                icons: {},
            };
        },
        methods: {
            getContent () {
                let self = this;
                self.$prismic.client.getSingle('solutions')
                    .then((document) => {
                        self.banner.title = document.data.title[0].text;
                        self.banner.subtitle = document.data.subtitle[0].text;
                        self.banner.bgImg = document.data.bgImg.url;
                        self.section1 = document.data.section[0];
                        self.section2 = document.data.section[1];
                    });
            },
            getIcons () {
                this.$prismic.client.getSingle('home')
                    .then((document) => {
                        this.icons = document.data.icons;
                    });
            }
        },
        created() {
            this.getContent();
            this.getIcons();
        }
    }
</script>

<style scoped>

</style>