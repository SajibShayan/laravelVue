import { createRouter, createWebHashHistory } from 'vue-router'
import storage from '@/services/storage.js';
import HelloWorld from '@/components/HelloWorld'
import EmployeeView from '@/components/EmployeeView'
import Register from '@/components/Register'
import Login from '@/components/Login'
import About from '@/views/AboutView'
import Home from '@/views/HomeView'

// import Vue from 'vue'
// import Router from 'vue-router'





//  Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     },
//     {
//       path: '/empview',
//       name: 'EmployeeView',
//       component: EmployeeView
//     },
//     {
//       path: '/register',
//       name: 'Register',
//       component: Register
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     }
//   ]
// })



const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: {
            requiresAuth: true
        }

    },
    {
        path: '/empview',
        name: 'EmployeeView',
        component: EmployeeView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/about',
        name: 'AboutView',
        component: About,
    },
    {
        path: '/home',
        name: 'HomeView',
        component: Home,
    }

]





const router = createRouter({
    history: createWebHashHistory(),
    routes
});


router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {


        // return { name: 'Login' };

        return router.push({
            path: '/login'
        });

    }
    else {
        next();
    }
    // if(to.meta.requiresAuth == false && localStorage.getItem('token')){

    //     return { name: 'EmployeeView' };
    // }
});

// router.beforeEach((to, from, next) => { 
//     if (to.meta.requiresAuth) {
//       if (storage.getItem('token')) {
//         next()
//       } else {
//         toaster.error('log in first', {
//           position: 'bottom-right',
//         })
//         next('/login');
//       }
//     } else {
//       next();
//     }

//       // name `data` whatever you want
//       // to.meta.data = 123
//   });


export default router;
