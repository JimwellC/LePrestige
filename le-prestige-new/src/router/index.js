import { createRouter, createWebHashHistory } from 'vue-router'
import IndexComponent from '../components/IndexComponent.vue';
import MenuComponent from '../components/MenuComponent.vue';
import ContactComponent from '../components/ContactComponent.vue';
import EditMenuComponent from '../components/EditMenuComponent.vue';
import ContactListComponent from '../components/ContactListComponent.vue';




const routes = [
  { path: '/', component: IndexComponent },
  { path: '/contact', component: ContactComponent },
  { path: '/menu', component: MenuComponent },
  { path: '/edit-menu', component: EditMenuComponent },
  { path: '/list', component: ContactListComponent },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
