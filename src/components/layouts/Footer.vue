<template>
    <footer class="footer">
        <div class="container">
            <div class="copyright">
                Все права защищены © {{getYear}} <router-link :to="{name: 'Home'}" class="link">Digital-studio</router-link>
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
        padding: 60px 40px;
        text-align: center;
    }
</style>