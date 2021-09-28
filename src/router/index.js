
import { createRouter, createWebHistory } from 'vue-router'
import {auth, firebase} from '../firebase'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */'../views/Home.vue'),
        beforeEnter: async (to, from, next) =>{
            if(await firebase.getCurrentUser()){ 
                next()
            }else{
                next('/login')
            }
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */'../views/Login.vue'),
        beforeEnter: async (to, from, next) =>{
            if(await firebase.getCurrentUser()){ 
                next('/')
            }else{
                next()
            }
        }
    },
    {
        path: '/adding',
        name: 'Adding',
        component: () => import(/* webpackChunkName: "about" */'../views/Adding.vue'),
        beforeEnter: async (to, from, next) =>{
            if(await firebase.getCurrentUser()){ 
                next()
            }else{
                next('/login')
            }
        }
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import(/* webpackChunkName: "about" */'../views/Registration.vue'),
        beforeEnter: async (to, from, next) =>{
            if(await firebase.getCurrentUser()){ 
                next('/')
            }else{
                next()
            }
        }
    },
    {   
        path: '/editing/:id',
        name: 'Editing',
        component: async () => import(/* webpackChunkName: "about" */'../views/Editing.vue'),
        beforeEnter: async (to, from, next) =>{
            if(await firebase.getCurrentUser()){ 
                next()
            }else{
                next('/login')
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
/* UNESTABLE
auth.onAuthStateChanged(user => {
    router.beforeEach(async(to, from, next) => {
        const requiresAuth = to.matched.some(record=> record.meta.requiresAuth)
        if (requiresAuth && user) 
            next()
        else next('/')
    })
})
*/

export default router