import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap and Bootstrap Icons CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/tooplate-crispy-kitchen.css';

// Import Bootstrap JavaScript for any JS-based Bootstrap components
import 'bootstrap';
// Custom JavaScript

createApp(App).use(router).mount('#app')
