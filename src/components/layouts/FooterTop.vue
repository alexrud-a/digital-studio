<template>
    <div class="footer-top">
        <div class="footer-top__form-wrap">
            <div class="container">
                <div class="footer-top__form">
                    <p class="text">
                        Получи бесплатную консультацию
                    </p>
                    <router-link :to="{name: 'Contact'}"
                                 class="btn btn--white"
                    >
                        Записаться
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FooterTop"
    }
</script>

<style lang="scss">
    .footer-top {
        position: relative;

        &__form-wrap {
            margin: 100px auto -100px;
            width: 100%;
        }

        &__form {
            background-color: $accent-color;
            color: #fff;
            padding: 60px 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
        }
    }
</style>