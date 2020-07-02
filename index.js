
'use strict'
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../HomePage.vue'



Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/StudentDetails',
    name: 'StudentDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../StudentInfo.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router



