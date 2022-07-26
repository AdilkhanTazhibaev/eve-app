import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import MainView from '@/views/MainView.vue';
import AboutView from '@/views/AboutView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: AppLayout,
    children: [
      {
        component: MainView,
        path: '/'
      },
      {
        component: AboutView,
        path: '/feeds'
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
