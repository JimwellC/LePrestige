import { createRouter, createWebHashHistory } from 'vue-router'
import IndexComponent from '../components/IndexComponent.vue';
import MenuComponent from '../components/MenuComponent.vue';
import ContactComponent from '../components/ContactComponent.vue';
import EditMenuComponent from '../components/EditMenuComponent.vue';

const routes = [
  { path: '/', component: IndexComponent },
  { path: '/contact', component: ContactComponent },
  { path: '/menu', component: MenuComponent },
  { path: '/edit-menu', component: EditMenuComponent },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
