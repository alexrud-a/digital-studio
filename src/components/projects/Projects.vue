<template>
    <div class="projects">
        <Preloader isLoad="isLoad"/>
        <Banner :banner="banner"/>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="projects__wrap">
                            <a v-for="project in projects"
                               :key="project.id"
                               class="projects__item"
                               :href="project.data.link.url"
                               :target="project.data.link.target"
                            >
                                <img :src="project.data.img_project.url">
                                <div class="projects__title">
                                    {{project.data.title[0].text}}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <FooterTop/>
    </div>
</template>

<script>
    import Banner from "../layouts/Banner";
    import FooterTop from "../layouts/FooterTop";
    import Preloader from "../layouts/Preloader";

    export default {
        name: "Projects",
        data () {
            return {
                isLoad: false,
                banner: {
                    title: '',
                    subtitle: '',
                    bgImg: '',
                },
                projects: {}
            };
        },
        methods: {
            loading: function () {
                let self = this;
                self.isLoad = true
            },
            getContent () {
                let self = this;
                self.$prismic.client.getSingle('projects')
                    .then((document) => {
                        self.banner.title = document.data.title[0].text;
                        self.banner.subtitle = document.data.subtitle[0].text;
                        self.banner.bgImg = document.data.bgImg.url;
                        setTimeout(this.loading, 1000);
                    })
            },
            getProjects () {
                let self = this;
                self.$prismic.client.query(
                    self.$prismic.Predicates.at('document.type', 'project')
                )
                    .then((response) => {
                        self.projects = response.results;
                        console.log(self.projects);
                        setTimeout(this.loading, 1000);
                    });
            }
        },
        created () {
            this.getContent();
            this.getProjects();
        },
        components: {
            Banner,
            FooterTop,
            Preloader
        }
    }
</script>

<style lang="scss">
    .projects {
        &__wrap {
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            @media screen and (min-width: $tablet) {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        &__item {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                transition: all .5s linear;
            }

            &:hover {
                img {
                    transform: scale(1.05);
                }
            }
        }

        &__title {
            position: absolute;
            color: #fff;
            bottom: 15px;
            left: 15px;
            font-weight: 700;
            font-size: 18px;

            @media screen and (min-width: $tablet) {
                bottom: 30px;
                left: 30px;
                font-size: 24px;
            }
        }
    }
</style>