import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/home/Home";
import Projects from "../components/projects/Projects";
import Solutions from "../components/solutions/Solutions";
import Contact from "../components/contact/Contact";
import Team from "../components/team/Team";
import Solution from "../components/solutions/Solution";

Vue.use(Router);

let router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
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
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        },
        {
            path: '/team',
            name: 'Team',
            component: Team
        },
        {
            path: '/solutions/:name',
            name: 'Solution',
            component: Solution,
            props: true,
        },
    ]
});

export default router;