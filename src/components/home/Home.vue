<template>
    <div class="home">
        <Banner :banner="banner"/>
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
                }
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