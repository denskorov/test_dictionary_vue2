import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0, hh: 0
    },
    mutations: {
        increment(state,number) {
            state.count+=number
        }
    }
})

export default store