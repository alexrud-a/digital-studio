<template>
    <header class="header">
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <span @click="toggleMenu">
                    <router-link
                            class="header__logo"
                            :to="{name: 'Home'}">
                    <img src="@/assets/img/logo.svg">
                </router-link>
                </span>
                <button class="header__toggle" @click="toggleMenu">
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
                isActive: false
            }
        },
        methods: {
            toggleMenu() {
                let self = this;
                self.isActive = !self.isActive;
            }
        }
    }
</script>

<style lang="scss">
    .header {
        padding: 50px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;

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
            padding: 40px;
            width: 100%;
            max-width: 100%;
            height: 100%;
            box-shadow: 0 0 5px rgba(0,0,0,.3);
            list-style: none;

            @media screen and (min-width: $tablet) {
                width: 30vw;
                padding: 125px 75px;
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