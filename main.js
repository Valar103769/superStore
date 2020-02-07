import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
// Object.defineProperty(Vue.prototype, '$store', {value:store})
const app = new Vue({
	store,
    ...App
})
app.$mount()
