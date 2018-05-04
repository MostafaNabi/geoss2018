import Vue from 'vue'
import Vuex from 'vuex'
import locations from './modules/locations.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        locations
    },
    strict: debug
});
