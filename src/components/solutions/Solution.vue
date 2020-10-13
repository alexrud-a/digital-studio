<template>
    <div class="solution">
        <Banner :banner="banner"/>
        <section class="section section--gray">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-12">
                        <span class="subtitle subtitle--left">
                            {{section1.subtitle}}
                        </span>
                        <h2 class="title title--section title--left title--mini">
                            {{section1.title}}
                        </h2>
                        <p class="text text--mini columns-2">
                            {{section1.text}}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            {{section2.subtitle}}
                        </span>
                        <h2 class="title title--section">
                            {{section2.title}}
                        </h2>
                        <p class="text text--center">
                            {{section2.text}}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <FooterTop/>
        <Preloader :isLoad="isLoad"/>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";
    import FooterTop from "../layouts/FooterTop";
    import Preloader from "../layouts/Preloader";

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
                banner: {
                    title: '',
                    subtitle: '',
                    bgImg: '',
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
            };
        },
        methods: {
            loading: function () {
                let self = this;
                self.isLoad = true
            },
            getContent () {
                let self = this;
                self.$prismic.client.query(
                    self.$prismic.Predicates.at('document.tags', [self.$route.params.name])
                )
                    .then((response) => {
                        self.banner.title = response.results[0].data.title[0].text;
                        self.banner.subtitle = response.results[0].data.subtitle[0].text;
                        self.banner.bgImg = response.results[0].data.bgImg.url;
                        self.section1 = {
                            title: response.results[0].data.section[0].title[0].text,
                            subtitle: response.results[0].data.section[0].subtitle[0].text,
                            text: response.results[0].data.section[0].text[0].text
                        };
                        self.section2 = {
                            title: response.results[0].data.section[1].title[0].text,
                            subtitle: response.results[0].data.section[1].subtitle[0].text,
                            text: response.results[0].data.section[1].text[0].text
                        };
                        setTimeout(this.loading, 1000);
                    });
            },
        },
        created() {
            this.getContent();
        }
    }
</script>

<style lang="scss">
</style>