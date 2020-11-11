<template>
  <transition name="slide-fade">
    <div class="home">
      <Banner :banner="content.banner"/>
      <section class="section"
               v-for="(section, i) in content.section"
               :key="i"
               :class="{'section--gray pb-0' : (i === 0), 'section--gray pricelist' : (i === 2)}"
      >
        <div class="container" v-if="i === 0">
          <div class="row">
            <div class="col-sm-12">
              <span class="subtitle">
                {{ section.subtitle }}
              </span>
              <h2 class="title title--section">
                {{ section.title }}
              </h2>
              <div class="text text--center"
                   v-html="section.text">
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid p-0" v-if="i === 0">
          <div class="icons">
            <div v-for="(icon, index) in content.uslugi" :key="index" class="icons__item">
              <router-link
                  :to="{name: 'Solution', params: { name: icon.link.post_name }}"
                  class="link"
              >
                <svg>
                  <use :href="'img/icons.svg#icon'+index"></use>
                </svg>
                <h4 class="icons__title">
                  {{ icon.title }}
                </h4>
                <span class="icons__text">
                  {{ icon.desc }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="container" v-if="i === 1">
          <div class="row align-items-center">
            <div class="col-md-4 col-sm-12">
              <span class="subtitle subtitle--left">
                {{ section.subtitle }}
              </span>
              <h2 class="title title--section title--left title--mini">
                {{ section.title }}
              </h2>
            </div>
            <div class="col-md-8 col-sm-12">
              <div class="text text--mini"
                   v-html="section.text">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="mini-banner">
                <img src="/img/banner_bg.jpeg" class="mini-banner__img">
                <router-link
                    class="mini-banner__link"
                    :to="{name: 'Solutions'}">
                  Выбрать услугу
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="container" v-if="i === 2">
          <div class="row">
            <div class="col-sm-12">
              <span class="subtitle">
                {{ section.subtitle }}
              </span>
              <h2 class="title title--section">
                {{ section.title }}
              </h2>
            </div>
          </div>
        </div>
        <div class="container mt-5" v-if="i === 2">
          <div class="row">
            <div class="col-xl-4 col-lg-6 col-xs-12 d-flex"
                 v-for="(card, ind) in content.priceItem"
                 :key="ind"
            >
              <div class="card" itemscope="" itemtype="http://schema.org/Product">
                <div class="card-header">
                  <span class="card__count">{{ind+1}}</span>
                  <h3 class="card__title" itemprop="name">
                    {{ card.title }}
                  </h3>
                </div>
                <div class="card-body">
                  <div class="card__desc" itemprop="description">
                    {{ card.text }}
                  </div>
                  <div class="card__price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
                    <meta itemprop="price" :content="card.price">
                    <meta itemprop="priceCurrency" content="RUB">
                    <template v-if="(ind === 4)">
                      {{ card.price }}
                    </template>
                    <template v-else>
                      от {{ card.price }} ₽
                    </template>
                  </div>
                  <button type="button" class="btn" v-b-modal="'modal-'+ind">
                    Заказать
                  </button>
                  <b-modal :id="'modal-'+ind" centered hide-footer :title="card.title">
                    <Order/>
                  </b-modal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container" v-if="i === 3">
          <div class="row">
            <div class="col-sm-12">
              <span class="subtitle">
                {{ section.subtitle }}
              </span>
              <h2 class="title title--section">
                {{ section.title }}
              </h2>
              <div class="text text--center"
                   v-html="section.text">
              </div>
            </div>
          </div>
        </div>
        <div class="container p-0" v-if="i === 3">
          <div class="clients">
            <div class="clients__item" v-for="(cat, index) in content.categories" :key="index">
              <svg>
                <use :href="'/img/clients.svg#'+cat.icon"></use>
              </svg>
              <span>
                {{ cat.title }}
              </span>
            </div>
          </div>
        </div>
      </section>
      <FooterTop/>
      <Preloader :isLoad="isLoad"/>
    </div>
  </transition>
</template>

<script>
    import Banner from "../layouts/Banner";
    import FooterTop from "../layouts/FooterTop";
    import Preloader from "../layouts/Preloader";
    import Order from "../layouts/Order";
    import axios from 'axios'

    export default {
        name: "Home",
        data () {
            return {
                isLoad: false,
                content: [],
                meta: [],
                metaTitle: ''
            };
        },
        metaInfo() {
            return {
                title: this.metaTitle,
                meta: this.meta,
            }
        },
        components: {
          Order,
          Preloader,
          FooterTop,
          Banner,
        },
        methods: {
          loading: function () {
            let self = this;
            self.isLoad = true
          },
          getContent() {
            return axios('https://admin.studio-elements.ru/wp-json/wp/v2/pages/9', {
              method: "GET"
            })
                .then((response) => {
                  this.content = response.data.acf;
                  this.meta = response.data.yoast_meta;
                  this.metaTitle = response.data.yoast_title;
                  setTimeout(this.loading, 1000);
                })
                .catch((error) => {
                  console.log(error);
                  return error;
                })
            },
        },
        created () {
          this.getContent();
        },
    }
</script>

<style lang="scss">
    .slide-fade-enter-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        filter: grayscale(1);
    }
    .slide-fade-leave-active {
        transition: all .10s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        filter: grayscale(1);
        opacity: 0;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        opacity: 0;
    }
    .home {
        .banner {
            height: 100vh;
        }
    }

    .icons {
        display: flex;
        flex-wrap: wrap;
        margin: 40px 0 0;

        &__item {
            width: 50%;
            text-align: center;
            padding: 20px 10px 40px;
            transition: all .3s linear;

            &:first-child,
            &:nth-child(3) {
                border-right: 1px solid #c8c8c8;
            }

            &:first-child,
            &:nth-child(2) {
                border-bottom: 1px solid #c8c8c8;
            }

            &:hover {
                background-color: $base-color;

                .icons__text {
                    color: #fff;
                }
            }

            svg {
                padding: 15px;
                max-width: 100px;
                max-height: 100px;

                @media screen and (min-width: $desktop) {
                    max-width: 150px;
                    max-height: 150px;
                }
            }

            @media screen and (min-width: $tablet) {
                padding: 60px 40px 80px;
            }

            @media screen and (min-width: $desktop) {
                width: 25%;
                padding: 100px 20px 40px;

                &:first-child,
                &:nth-child(2) {
                    border-bottom: none;
                    border-right: 1px solid #c8c8c8;
                }

                &:hover {
                    padding: 60px 20px 80px;

                    .icons__text {
                        opacity: 1;
                    }
                }
            }
        }

        &__title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;

            @media screen and (min-width: $desktop) {
                font-size: 20px;
                margin-bottom: 20px;
            }
        }

        &__text {
            font-weight: 400;
            color: $base-color;
            font-size: 14px;

            @media screen and (min-width: $tablet) {
                font-size: 18px;
            }

            @media screen and (min-width: $desktop) {
                opacity: 0;
                font-size: 20px;
            }
        }
    }

    .mini-banner {
        margin: 40px 0 0;
        overflow: hidden;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("~@/assets/banners/pix.png");
            background-repeat: repeat;
            background-position: center;
        }

        &__link {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;
            text-transform: uppercase;
            font-weight: 700;
            color: #fff;
            font-size: 24px;
            transition: all .3s linear;

            &:hover {
                color: $accent-color;
            }
        }

        &__img {
            transition: all .2s ease-in-out;
        }

        &:hover .mini-banner__img {
            transform: scale(1.05);
        }
    }

    .clients {
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;

        &__item {
            width: 33.3333%;
            padding: 10px;
            border-right: 1px solid #c8c8c8;
            border-bottom: 1px solid #c8c8c8;
            transition: all .3s linear;
            max-height: 125px;
            text-align: center;

            &:nth-of-type(3n) {
                border-right: none;
            }

            &:nth-last-of-type(-n+3) {
                border-bottom: none;
            }

            @media screen  and (min-width: $tablet) {
                max-height: 165px;
                padding: 20px;
            }
            @media screen and (min-width: $desktop) {
                width: 16.6666%;

                &:nth-of-type(3n) {
                    border-right: 1px solid #c8c8c8;
                }

                &:nth-last-of-type(-n+3) {
                    border-bottom: 1px solid #c8c8c8;
                }

                &:nth-of-type(6n) {
                    border-right: none;
                }

                &:nth-last-of-type(-n+6) {
                    border-bottom: none;
                }
            }

            span {
                display: block;
                font-weight: 700;
                font-size: 12px;

                @media screen  and (min-width: $tablet) {
                    font-size: 14px;
                }
            }

            svg {
                width: 60px;
                height: 60px;
                max-width: 100%;
                max-height: 100%;
                margin-bottom: 10px;

                @media screen  and (min-width: $tablet) {
                    width: 80px;
                    height: 80px;
                }
            }

            &:hover {
                background-color: $base-color;

                svg {
                    fill: #fff;
                }

                span {
                    color: #fff;
                }
            }
        }
    }

    .pricelist {

      .card {
        margin-bottom: 30px;
        box-shadow: 0 14px 28px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.05);
        padding: 15px 15px 20px;
        justify-content: space-between;

        &-header {
          display: flex;
          align-items: center;
          background-color: transparent;
          border-bottom: none;
        }

        &-body {
          justify-content: space-between;
          display: flex;
          flex-direction: column;
        }

        &__count {
          font-weight: 900;
          font-size: 40px;
          margin-right: 15px;
          color: $accent-color;
        }

        &__title {
          margin-bottom: 0;
          font-weight: 900;
        }

        &__desc {
          margin-bottom: 15px;
        }

        &__price {
          font-weight: 700;
          font-size: 24px;
          color: $accent-color;
          margin-bottom: 15px;
        }
      }
    }

</style>