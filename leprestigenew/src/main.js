import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap and Bootstrap Icons CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/tooplate-crispy-kitchen.css';

// Import Bootstrap and jQuery
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure the Bootstrap CSS is already imported
import 'bootstrap';




createApp(App).use(router).mount('#app')
