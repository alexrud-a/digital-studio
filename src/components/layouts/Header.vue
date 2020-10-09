<template>
    <header class="header">
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <router-link
                        class="header__logo"
                        :to="{name: 'Home'}">
                    <picture>
                        <source media="(min-width: 768px)" srcset="@/assets/img/logo.svg">
                        <img src="@/assets/img/logo-min.svg" alt="logo">
                    </picture>
                </router-link>
                <button class="header__toggle" @click="toggleMenu" :class="{'header__toggle--open': isActive}">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav class="header__menu-wrap" :class="{'header__menu-wrap--open': isActive}">
                    <ul class="header__menu">
                        <li class="header__menu-item">
                            <span @click="toggleMenu">
                                <router-link
                                        class="header__menu-link"
                                        :to="{name: 'Home'}">
                                    Главная
                                </router-link>
                            </span>
                        </li>
                        <li class="header__menu-item">
                            <span @click="toggleMenu">
                                <router-link
                                        class="header__menu-link"
                                        :to="{name: 'Projects'}">
                                    Проекты
                                </router-link>
                            </span>
                        </li>
                        <li class="header__menu-item">
                            <span @click="toggleMenu">
                                <router-link
                                        class="header__menu-link"
                                        :to="{name: 'Solutions'}">
                                    Решения
                                </router-link>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                isActive: false,
                isVisible: true,
            }
        },
        methods: {
            toggleMenu() {
                let self = this;
                self.isActive = !self.isActive;
            },
        },
        created() {
            this.isVisible = false;
        }
    }
</script>

<style lang="scss">
    .header {
        padding: 20px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;

        @media screen and (min-width: $tablet) {
            padding: 50px;
        }

        &__logo {
            position: relative;
            z-index: 99;
        }

        &__toggle {
            position: relative;
            border: none;
            background-color: transparent;
            width: 30px;
            height: 20px;
            z-index: 99;
            transition: all .4s ease-in-out;

            &:not(&--open):hover {
                height: 24px;
            }

            span {
                position: absolute;
                height: 4px;
                border-radius: 4px;
                width: 100%;
                left: 0;
                right: 0;
                background-color: $accent-color;
                transition: all .4s ease-in-out;

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

            &--open {
                transform: rotate(-90deg);

                span:nth-child(1){
                    left:3px;
                    top: 12px;
                    width: 30px;
                    transform: rotate(90deg);
                }
                span:nth-child(2){
                    left:2px;
                    top: 20px;
                    width: 20px;
                    transform: rotate(45deg);
                }
                span:nth-child(3){
                    left:14px;
                    top: 20px;
                    width: 20px;
                    transform: rotate(-45deg);
                }
            }
        }

        &__menu-wrap {
            position: fixed;
            right: -100%;
            width: 100%;
            top: 0;
            bottom: 0;
            background-color: rgba(#fff, 0.3);
            z-index: 98;
            transition: all .5s ease-in-out;

            &--open {
                right: 0;
            }
        }

        &__menu {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: #fff;
            padding: 60px 20px;
            width: 100%;
            max-width: 100%;
            height: 100%;
            box-shadow: 0 0 5px rgba(0,0,0,.3);
            list-style: none;

            @media screen and (min-width: $tablet) {
                width: 50vw;
                padding: 125px 75px;
            }

            @media screen and (min-width: $desktop) {
                width: 30vw;
            }

            &-item {
                padding: 10px 0;
            }

            &-link {
                font-size: 25px;
                font-weight: 700!important;
                color: $base-color!important;
                text-transform: uppercase;
            }
        }
    }
</style>