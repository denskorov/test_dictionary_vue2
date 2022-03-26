import VueRouter from 'vue-router'
import Testing from "@/pages/Testing";
import Testing2 from "@/pages/Testing2";
import Home from "@/pages/Home";
import Vue from "vue";
import Testing3 from "@/pages/Testing3";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [

        {
            path: "/",
            component: Home,
            name: "home"
        },
        {
            path: "/testing",
            component: Testing,
            name: "testing"
        },
        {
            path: "/testing-2",
            component: Testing2,
            name: "testing2"
        },
        {
            path: "/testing-3",
            component: Testing3,
            name: "testing3"
        }
    ], mode: "history"
})
// import Vue from "vue";
//
// Vue.use(VueRouter)
//
// const Foo = {template: '<div>foo</div>'}
// const Bar = {template: '<div>bar</div>'}
//
// const routes = [
//     {path: '/foo', component: Foo},
//     {path: '/bar', component: Bar}
// ]

