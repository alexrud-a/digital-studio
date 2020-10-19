<template>
    <transition name="slide-fade">
        <div class="solutions">
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
                        <p class="text text--mini columns-2">
                            <prismic-rich-text :field="section1.text"/>
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
                            {{ $prismic.richTextAsPlain(section2.subtitle) }}
                        </span>
                        <h2 class="title title--section">
                            {{ $prismic.richTextAsPlain(section2.title) }}
                        </h2>
                        <prismic-rich-text :field="section2.text" class="text text--center"/>
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
        name: "Solutions",
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
                icons: {},
            };
        },
        metaInfo: {
            title: 'Digital studio - Solutions',
            meta: [
                { name: 'description', content: 'Digital studio' }
            ],
        },
        methods: {
            loading: function () {
                let self = this;
                self.isLoad = true
            },
            getContent () {
                let self = this;
                self.$prismic.client.getSingle('solutions')
                    .then((document) => {
                        self.banner.title = document.data.title;
                        self.banner.subtitle = document.data.subtitle;
                        self.banner.bgImg = document.data.bgImg.url;
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
                        setTimeout(this.loading, 1000);
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

<style>

</style>