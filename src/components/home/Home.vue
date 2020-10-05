<template>
    <div class="home">
        <Banner :banner="banner"/>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";

    export default {
        name: "Home",
        data() {
            return {
                banner: {
                    title: 'We love digital Marketing',
                    subtitle: 'We are elements',
                    bgVideo1: 'web-bg.mp4',
                    bgVideo2: 'web-bg.webm',
                    bgImg: 'web-bg.jpg',
                }
            }
        },
        components: {
            Banner
        }
    }
</script>

<style scoped>

</style>