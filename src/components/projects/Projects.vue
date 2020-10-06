<template>
    <div class="projects">
        <Banner :banner="banner"/>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";
    export default {
        name: "Projects",
        data () {
            return {
                banner: {
                    title: null,
                    subtitle: null,
                    bgImg: null,
                    bgVideo1: null,
                    bgVideo2: null,
                }
            };
        },
        methods: {
            getContent () {
                this.$prismic.client.getSingle('projects')
                    .then((document) => {
                        this.banner.title = document.data.title[0].text;
                        this.banner.subtitle = document.data.subtitle[0].text;
                        this.banner.bgImg = document.data.bgImg.url;
                    })
            }
        },
        created () {
            this.getContent();
        },
        components: {
            Banner,
        }
    }
</script>

<style lang="scss">

</style>