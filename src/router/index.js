import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    component: import('@/views/Index.vue'),
    children: [
      {
        path: 'products',
        component: import('@/views/Products.vue'),
      },
      {
        path: 'product/:id',
        component: import('@/views/Product.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    component: import('@/views/Login.vue'),
  },
  /** 後台路由 */
  {
    path: '/backend',
    name: 'Backend',
    component: import('@/views/Backend.vue'),
    // 巢狀路由
    children: [
      {
        path: 'products',
        component: import('@/views/backend/Products.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
