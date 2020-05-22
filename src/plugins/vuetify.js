import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                background: "#f6f6ef"
            },
            dark: {
                background: "#f6f6ef"
            }
        }
    }
}

export default new Vuetify(opts)