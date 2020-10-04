import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/home/Home";
import Projects from "../components/projects/Projects";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/projects',
            name: 'Projects',
            component: Projects
        },
    ]
});

export default router;