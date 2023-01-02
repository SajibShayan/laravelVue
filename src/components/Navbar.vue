<template>

    <nav class="navbar navbar-expand-lg bg-light navbar navbar-dark bg-dark">
        <div class="container-fluid">

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ user }}
                        </a>
                        <ul class="dropdown-menu">
                            <li><a v-if="!log">
                                    <router-link class="dropdown-item" to="/login">Login</router-link>
                                </a></li>
                            <li><a v-if="!log">
                                    <router-link class="dropdown-item" to="/register">Register</router-link>
                                </a></li>
                                <li><a v-if="log">
                                    <router-link class="dropdown-item" to="/profile">Profile</router-link>
                                </a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a>
                                    <router-link class="dropdown-item" to="">Services</router-link>
                                </a></li>

                            <li v-if="log"><button type="button" class="btn btn-info dropdown-item" @click="logout()">Logout</button></li>

                        </ul>
                    </li>
                    <li class="nav-item">
                        <a >
                            <router-link class="nav-link" aria-current="page" to="/home">Home</router-link>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a>
                            <router-link class="nav-link" to="/about">About</router-link>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a v-if="log">

                            <router-link class="nav-link" to="/empview">EmployeeView</router-link>
                        </a>
                    </li>

                    
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>

    <!-- <router-view /> -->

</template>

<script>
import axios from '@/services/axios.js'
import storage from '@/services/storage.js'
import router from '@/router';
import {
    useRoute
} from 'vue-router';
import {
    createToaster
} from "@meforma/vue-toaster";
import {
    reactive,
    toRefs,
    watchEffect,
    onMounted,
} from 'vue';

export default {

    name: 'Navbar',

    setup() {
        const state = reactive({
            log: false,
            user:'',
        });

        const toaster = createToaster({
            /* options */
        });

        const route = useRoute()

        function logout() {

            if (storage.getItem('token')) {

                alert('Are you sure?');
                axios.post("/logout")
                    .then(
                        ({
                            data
                        }) => {

                            if (data.success) {

                                storage.clearItem('token');
                                storage.clearItem('user');
                                toaster.success('Logged Out Successfully!', {
                                    position: 'top-right'
                                });
                                return router.push({
                                    path: '/login'
                                });
                            } else {
                                this.error = data.message;
                            }
                            // alert(data.message);
                        }
                    );
                // //localStorage.removeItem('token');
                // storage.clearItem('token');
                // return router.push({path: '/login'});

            } else if (!storage.getItem('token')) {
                toaster.success('Login first!', {
                    position: 'top-right'
                });
            }

        }

        function checker() {

            state.log = storage.getItem('token') ? true : false;
            state.user = storage.getItem('token')? storage.getItem('user').name: 'No-User';
            // console.log(this.log);
        }

        watchEffect(()=>{
            // route (to, from) {
            //     console.log(to);
            //     console.log(from);
            //     checker();
            // }
            console.log(route.name)
            checker()
        })
        
        return {
            ...toRefs(state),
            logout,
            checker,
          
        }

    },
}
</script>
