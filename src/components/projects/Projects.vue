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