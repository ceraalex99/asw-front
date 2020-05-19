import Vue from 'vue'
import routes from "@/routes";
import VueRouter from 'vue-router'

Vue.config.productionTip = false


const router = new VueRouter({
 mode: 'history',
 routes
})

Vue.use(VueRouter)

new Vue({
 router
}).$mount('#app')
