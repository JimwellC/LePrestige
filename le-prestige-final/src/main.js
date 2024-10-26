import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/bootstrap-icons.css'
import '@/assets/css/tooplate-crispy-kitchen.css'

// Import Bootstrap JavaScript for any JS-based Bootstrap components
import 'bootstrap';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
