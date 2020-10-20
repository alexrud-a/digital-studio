<template>
    <div class="main">
        <keep-alive :exclude="'Solution'">
            <router-view :key="key"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data(){
            return {
                key: null,
            }
        },
        watch: {
            $route(to) {
                this.key = to.path;
            }
        },
    }
</script>

<style lang="scss">
    .main {
        flex: 1 0 auto;
    }
</style>