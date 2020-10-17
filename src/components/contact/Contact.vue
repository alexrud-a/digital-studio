<template>
    <transition name="slide-fade">
        <div class="contact">
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            {{ $prismic.richTextAsPlain(info.subtitle) }}
                        </span>
                        <h1 class="title title--section">
                            {{ $prismic.richTextAsPlain(info.title) }}
                        </h1>
                        <p class="text text--center text--mini">
                            <prismic-rich-text :field="info.text"/>
                        </p>
                    </div>
                    <div class="col-sm-12">
                        <form class="contact__form" method="post" action="mail.php" @submit.prevent="submit">
                            <div class="container">
                                <div class="row">
                                    <div class="contact__form-item">
                                        <div class="contact__form-control">
                                            <input class="inp-control" type="text" placeholder="Представьтесь" v-model="name" name="name">
                                            <div v-if="!message.length" class="message">
                                                {{ validation.firstError('name') }}
                                            </div>
                                        </div>
                                        <div class="contact__form-control">
                                            <input class="inp-control" type="tel" placeholder="Ваш Телефон" v-mask="'+7 (###) ###-##-##'" v-model="phone" name="phone">
                                            <div v-if="!message.length" class="message">
                                                {{ validation.firstError('phone') }}
                                            </div>
                                        </div>
                                        <div class="contact__form-control">
                                            <input class="inp-control" type="email" placeholder="Ваш Email" v-model="email" name="email">
                                            <div v-if="!message.length" class="message">
                                                {{ validation.firstError('email') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="contact__form-item">
                                        <div class="contact__form-control">
                                            <textarea class="inp-control" placeholder="Чем можем Вам помочь?" v-model="text" name="text"></textarea>
                                            <button class="btn" type="submit">
                                                Отправить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="message-form">
                            {{message}}
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <p class="text text--mini">
                            <prismic-rich-text :field="info.text_after_form"/>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section pb-0">
            <div class="container-fluid">
                <div class="row flex-wrap-reverse">
                    <div class="col-md-6 col-sm-12 p-0">
                        <div class="contact__map" id="map"></div>
                    </div>
                    <div class="col-md-6 col-sm-12 p-0">
                        <div class="contact__info-wrap">
                            <div class="contact__info">
                                <h2 class="contact__info-title">
                                    Контакты
                                </h2>
                                <p>
                                    Вы можете связаться с нами любым удобным способом
                                </p>
                                <div class="contact__info-item" v-for="(link, index) in info.links" :key="index">
                                    <span>{{link.type[0].text}}: </span>
                                    <a :href="link.link[0].text+':'+link.text[0].text" class="link">
                                        {{link.text[0].text}}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Preloader :isLoad="isLoad"/>
    </div>
    </transition>
</template>

<script>
    import SimpleVueValidator from 'simple-vue-validator';
    const Validator = SimpleVueValidator.Validator;
    import { loadYmap } from 'vue-yandex-maps'
    import axios from "axios";
    import Preloader from "../layouts/Preloader";

    export default {
        mixins: [SimpleVueValidator.mixin],
        name: "Contact",
        data() {
            return {
                isLoad: false,
                name: '',
                phone: '',
                email: '',
                text: '',
                message: '',
                info: {
                    title: '',
                    subtitle: '',
                    text: '',
                    text_after_form: '',
                    coordinate_map: '',
                    links: [],
                },
            }
        },
        metaInfo: {
            title: 'Digital studio - Contacts',
            meta: [
                { name: 'description', content: 'Digital studio' }
            ],
        },
        components: {
            Preloader
        },
        async mounted() {
            let self = this;
            const settings = {
                apiKey: 'f252d86c-c0f0-4472-af94-a3f815c7fb37',
                lang: 'ru_RU',
                version: '2.1'
            }

            await loadYmap(settings);

            let ymaps = window.ymaps;
            ymaps.ready(init);

            function init() {
                let myMap = new ymaps.Map("map", {
                    center: [self.info.coordinate_map.latitude, self.info.coordinate_map.longitude],
                    zoom: 15,
                    controls: []
                });

                let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                        balloonContent: 'г. Москва'
                    },
                    {
                        iconLayout: 'default#image',
                        iconImageHref: require('../../assets/img/map.svg'),
                        iconImageSize: [30, 42],
                        iconImageOffset: [-5, -38]
                    })

                myMap.geoObjects.add(myPlacemark)
            }

        },
        validators: {
            name: function (value) {
                return Validator.value(value).minLength(5, 'Введите не менее 5 символов');
            },
            phone: function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения').length(18, 'Поле телефон должно содержать 10 цифр');
            },
            email: function (value) {
                return Validator.value(value).email('Некорректный email');
            },
        },
        methods: {
            loading: function () {
                let self = this;
                self.isLoad = true
            },
            mail: function() {
                let self = this;
                axios({
                    method: 'post',
                    url: 'mail.php',
                    data: {
                        name: self.name,
                        phone: self.phone,
                        email: self.email,
                        text: self.text
                    },
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(function (response) {
                    self.message = response.data;
                    self.name = '';
                    self.phone = '';
                    self.email = '';
                    self.text = '';
                });
            },
            submit: function() {
                let self = this;
                self.$validate()
                    .then(function(success) {
                        if (success) {
                            self.mail();
                        }
                    });
            },
            getContent () {
                let self = this;
                self.$prismic.client.getSingle('contacts')
                    .then((document) => {
                        self.info = {
                            title: document.data.title,
                            subtitle: document.data.subtitle,
                            text: document.data.text,
                            text_after_form: document.data.text_after_form,
                            coordinate_map: document.data.coordinate_map,
                            links: document.data.links
                        },
                        setTimeout(this.loading, 1000);
                    })
            },
        },
        created() {
            this.getContent();
        }
    }
</script>

<style lang="scss">
    .contact {
        padding: 100px 0 0;

        &__form {
            margin: 40px 0;
            width: 100%;
        }

        &__form-item {
            width: 100%;

            textarea {
                height: 134px;
            }

            @media screen and (min-width: $tablet) {
                margin: 20px 0;
                width: calc(50% - 40px);
                margin-right: 40px;
            }
        }

        &__form-control {
            position: relative;

            .message {
                position: absolute;
                bottom: 0;
                left: 0;
                color: $accent-color;
            }
        }

        .inp-control {
            width: 100%;
            box-sizing: border-box;
            padding: 15px 30px;
            border: 1px solid #ccc;
            color: #ccc;
            border-radius: 0;
            resize: none;
            box-shadow: none;
            margin-bottom: 20px;

            &:focus {
                border-color: $base-color;
                color: $base-color;
            }
        }

        &__map {
            width: 100%;
            height: 500px;
        }

        &__info-wrap {
            padding: 60px 20px;
            background-color: #000;
            color: #fff;
            height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        [class*="ymaps-2"][class*="-ground-pane"] {
            filter: grayscale(1);
            -ms-filter: grayscale(1);
            -webkit-filter: grayscale(1);
            -moz-filter: grayscale(1);
            -o-filter: grayscale(1);
        }

        .message-form {
            text-align: center;
            color: $accent-color;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 30px;
        }
    }
</style>