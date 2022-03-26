import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import Toasted from 'vue-toasted';
import router from "@/router";
import store from "./store.js";

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "./assets/scss/main.scss";
import './registerServiceWorker'

import PacmanLoader from 'vue-spinner/src/PacmanLoader'

Vue.component('pacman-loader', PacmanLoader);
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toasted)


new Vue({
    store,
    render: h => h(App),
    router
}).$mount('#app')
