<template>
    <div class="projects">
        <Banner :banner="banner"/>
        <FooterTop/>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";
    import FooterTop from "../layouts/FooterTop";

    export default {
        name: "Projects",
        data () {
            return {
                banner: {
                    title: '',
                    subtitle: '',
                    bgImg: '',
                }
            };
        },
        methods: {
            getContent () {
                let self = this;
                self.$prismic.client.getSingle('projects')
                    .then((document) => {
                        self.banner.title = document.data.title[0].text;
                        self.banner.subtitle = document.data.subtitle[0].text;
                        self.banner.bgImg = document.data.bgImg.url;
                    })
            }
        },
        created () {
            this.getContent();
        },
        components: {
            Banner,
            FooterTop
        }
    }
</script>

<style lang="scss">

</style>