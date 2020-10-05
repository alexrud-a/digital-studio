<template>
    <header class="header">
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <router-link
                        class="header__logo"
                        :to="{name: 'Home'}">
                    <img src="@/assets/img/logo.svg">
                </router-link>
                <button class="header__toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav class="header__menu-wrap">
                    <ul class="header__menu">
                        <li class="header__menu-item">
                            <router-link
                                    class="header__menu-link"
                                    :to="{name: 'Home'}">
                                Главная
                            </router-link>
                        </li>
                        <li class="header__menu-item">
                            <router-link
                                    class="header__menu-link"
                                    :to="{name: 'Projects'}">
                                Проекты
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="scss">
    .header {
        padding: 50px;

        &__toggle {
            position: relative;
            border: none;
            background-color: transparent;
            width: 30px;
            height: 20px;

            span {
                position: absolute;
                height: 4px;
                border-radius: 4px;
                width: 100%;
                left: 0;
                right: 0;
                background-color: $accent-color;

                &:first-child {
                    top: 0;
                }

                &:nth-child(2) {
                    top: calc(50% - 2px);
                }

                &:last-child {
                    bottom: 0;
                }
            }
        }

        &__menu-wrap {
            position: fixed;
            right: -100%;
            width: 100%;
        }
    }
</style>