<template>
    <header class="header">
        <router-link :to="{name: 'Home'}">
            Главная
        </router-link>
        <router-link :to="{name: 'Projects'}">
            Проекты
        </router-link>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>