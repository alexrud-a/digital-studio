<template>
    <div class="projects">
        <Preloader isLoad="isLoad"/>
        <Banner :banner="banner"/>
        <FooterTop/>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";
    import FooterTop from "../layouts/FooterTop";
    import Preloader from "../layouts/Preloader";

    export default {
        name: "Projects",
        data () {
            return {
                isLoad: false,
                banner: {
                    title: '',
                    subtitle: '',
                    bgImg: '',
                }
            };
        },
        methods: {
            loading: function () {
                let self = this;
                self.isLoad = true
            },
            getContent () {
                let self = this;
                self.$prismic.client.getSingle('projects')
                    .then((document) => {
                        self.banner.title = document.data.title[0].text;
                        self.banner.subtitle = document.data.subtitle[0].text;
                        self.banner.bgImg = document.data.bgImg.url;
                        setTimeout(this.loading, 1000);
                    })
            }
        },
        created () {
            this.getContent();
        },
        components: {
            Banner,
            FooterTop,
            Preloader
        }
    }
</script>

<style lang="scss">

</style>