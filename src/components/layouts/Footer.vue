<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__copyright">
                Все права защищены © 2010 - {{getYear}} <router-link :to="{name: 'Home'}" class="link">Digital Elements</router-link>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                getYear: new Date().getFullYear()
            }
        }
    }
</script>

<style lang="scss">
    .footer {
        background-color: #000;
        color: #fff;
        padding: 160px 40px 60px;
        text-align: center;
        flex: 0 0 auto;
    }
</style>