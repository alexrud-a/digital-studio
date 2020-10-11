<template>
    <div class="contact">
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <span class="subtitle">
                            WE LOVE TO HEAR FROM YOU!
                        </span>
                        <h1 class="title title--section">
                            WHAT CAN WE DO FOR YOU?
                        </h1>
                        <p class="text text--center text--mini">
                            We are already excited, but things are getting even more exciting. Just fill out the form, ideally with your name, e-mail address and message. Click on “send” and we will get back to you with extraordinary ideas and projects. See you soon!
                        </p>
                    </div>
                    <div class="col-sm-12">
                        <form class="contact__form" @submit.prevent="submit">
                            <div class="container">
                                <div class="row">
                                    <div class="contact__form-item">
                                        <div class="contact__form-control">
                                            <input class="inp-control" type="text" placeholder="Представьтесь" v-model="name">
                                            <div class="message">
                                                {{ validation.firstError('name') }}
                                            </div>
                                        </div>
                                        <div class="contact__form-control">
                                            <input class="inp-control" type="tel" placeholder="Ваш Телефон" v-mask="'+7 (###) ###-##-##'" v-model="phone">
                                            <div class="message">
                                                {{ validation.firstError('phone') }}
                                            </div>
                                        </div>
                                        <div class="contact__form-control">
                                            <input class="inp-control" type="email" placeholder="Ваш Email" v-model="email">
                                            <div class="message">
                                                {{ validation.firstError('email') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="contact__form-item">
                                        <div class="contact__form-control">
                                            <textarea class="inp-control" placeholder="Что вас интересует?"></textarea>
                                            <button class="btn" type="submit">
                                                Отправить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="message">
                            {{message}}
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <p class="text text--mini">
                            After submitting the contact form, the personal data enterd by you, will be processed by elements.at New Media Solutions GmbH, Söllheimer Straße 16, 5020 Salzburg, info@elements.at responsible for data protection and for the purpose of processing your request on the basis of your consent given by submitting the form. There is no legal or contractual obligation to provide personal information. The non-provision of such information means that you do not submit your request and therefore, that we can not process it. You have the right to revoke your consent at any time by written notice without affecting the legality of the processing carried out on the basis of the consent given until the revocation.
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
                                <div class="contact__info-item">
                                    <span>Телефон: </span>
                                    <a href="#" class="link">
                                        8 (999) 999-99-99
                                    </a>
                                </div>
                                <div class="contact__info-item">
                                    <span>Телефон: </span>
                                    <a href="#" class="link">
                                        8 (999) 999-99-99
                                    </a>
                                </div>
                                <div class="contact__info-item">
                                    <span>Email: </span>
                                    <a href="#" class="link">
                                        test@test.ru
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import SimpleVueValidator from 'simple-vue-validator';
    const Validator = SimpleVueValidator.Validator;
    import { loadYmap } from 'vue-yandex-maps'

    export default {
        mixins: [SimpleVueValidator.mixin],
        name: "Contact",
        data() {
            return {
                name: '',
                phone: '',
                email: '',
                message: '',
            }
        },
        async mounted() {
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
                    center: [55.76, 37.64],
                    zoom: 15,
                    controls: []
                });

                let myPlacemark = new ymaps.Placemark([55.76, 37.64], {
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
                return Validator.value(value).required('Поле обязательно для заполнения').minLength(5, 'Введите не менее 5 символов');
            },
            phone: function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения').length(18, 'Поле телефон должно содержать 10 цифр');
            },
            email: function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения').email('Некорректный email');
            },
        },
        methods: {
            submit: function() {
                let self = this;
                this.$validate()
                    .then(function(success) {
                        if (success) {
                            self.name = '';
                            self.phone = '';
                            self.email = '';
                            self.message = 'Спасибо! Мы скоро свяжемся с Вами!'
                        }
                    });
            },
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
    }
</style>