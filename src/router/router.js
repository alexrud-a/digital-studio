import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/home/Home";
import Projects from "../components/projects/Projects";
import Solutions from "../components/solutions/Solutions";

Vue.use(Router);

let router = new Router({
    mode: 'history',
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
        {
            path: '/solutions',
            name: 'Solutions',
            component: Solutions
        },
    ]
});

export default router;