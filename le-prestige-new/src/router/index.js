import { createRouter, createWebHashHistory } from 'vue-router'
import IndexComponent from '../components/IndexComponent.vue';
import ContactComponent from '../components/MenuComponent.vue';
import MenuComponent from '../components/ContactComponent.vue';

const routes = [
  { path: '/', component: IndexComponent },
  { path: '/contact', component: ContactComponent },
  { path: '/menu', component: MenuComponent }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
