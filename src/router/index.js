import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

const blobs = () => import(/* webpackChunkName: "group-first" */ '../components/blobs.vue')
const calendar = () => import(/* webpackChunkName: "group-first" */ '../components/calendar.vue')


Vue.use(Router)

let router =  new Router({
  routes: [
    { path: '/',redirect:'/blobs'},
    { path: '/blobs', name: 'blobs', component: blobs }, //果冻菜单
    { path: '/calendar', name: 'calendar', component: calendar } //日历


  ]
})

export default router