<template>
    <div class="projects">
        <Banner :banner="banner"/>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";
    export default {
        name: "Projects",
        data() {
            return {
                banner: {
                    title: 'Наши проекты',
                    subtitle: 'Клиенты и проекты',
                    bgVideo1: 'web-bg.mp4',
                    bgVideo2: 'web-bg.webm',
                    bgImg: 'web-bg.jpg',
                }
            }
        },
        components: {
            Banner,
        }
    }
</script>

<style lang="scss">

</style>