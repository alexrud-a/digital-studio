<template>
    <transition name="slide-fade">
        <div class="solution">
        <Banner :banner="banner"/>
        <section class="section section--gray">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-sm-12">
                        <span class="subtitle subtitle--left">
                            {{ $prismic.richTextAsPlain(section1.subtitle) }}
                        </span>
                        <h2 class="title title--section title--left title--mini">
                            {{ $prismic.richTextAsPlain(section1.title) }}
                        </h2>
                        <prismic-rich-text :field="section1.text" class="text text--mini columns-2"/>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            {{ $prismic.richTextAsPlain(section2.subtitle) }}
                        </span>
                        <h2 class="title title--section">
                            {{ $prismic.richTextAsPlain(section2.title) }}
                        </h2>
                        <prismic-rich-text :field="section2.text" class="text text--center"/>
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
                metaTitle: '',
                metaDescription: '',
            };
        },
        metaInfo() {
            return {
                title: 'Digital Elements - ' + this.metaTitle,
                meta: [
                    { name: 'description', content: this.metaDescription },
                    {property: 'og:title', content: 'Digital Elements - ' + this.metaTitle},
                    {property: 'og:type', content: 'article'},
                    {property: 'og:url', content: window.location.hostname + this.$route.fullPath },
                    {property: 'og:description', content: this.metaDescription },
                    {property: 'og:image', content: this.banner.bgImg },
                    {property: 'og:site_name', content: 'Digital Elements'}
                ],
            }
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
                        self.metaTitle = response.results[0].data.title[0].text;
                        self.metaDescription = response.results[0].data.section[0].text[0].text;
                        self.banner.title = response.results[0].data.title;
                        self.banner.subtitle = response.results[0].data.subtitle;
                        self.banner.bgImg = response.results[0].data.bgImg.url;
                        self.section1 = {
                            title: response.results[0].data.section[0].title,
                            subtitle: response.results[0].data.section[0].subtitle,
                            text: response.results[0].data.section[0].text
                        };
                        self.section2 = {
                            title: response.results[0].data.section[1].title,
                            subtitle: response.results[0].data.section[1].subtitle,
                            text: response.results[0].data.section[1].text
                        };
                        setTimeout(this.loading, 1000);
                    });
            },
        },
        created() {
            this.getContent();
        },
    }
</script>

<style lang="scss">
</style>