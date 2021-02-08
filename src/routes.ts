import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: import('./pages/home/index.vue'),
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('./pages/rank/Rank.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./components/About.vue'),
  },
  {
    path: '/graph',
    name: 'Graph',
    component: () => import('./pages/graph/Graph.vue'),
  },
  {
    path: '/next',
    name: 'Next',
    component: () => import('./pages/next/Next.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
