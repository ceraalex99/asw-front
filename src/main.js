import Vue from 'vue'
import routes from "@/routes";
import VueRouter from 'vue-router'
import App from '@/App'
import vuetify from '@/plugins/vuetify'


Vue.config.productionTip = false


const router = new VueRouter({
 mode: 'history',
 routes
})

Vue.use(VueRouter)

new Vue({
 render: h => h(App),
 router,
 vuetify
}).$mount('#app')
