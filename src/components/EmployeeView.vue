<template>
    <div>
        <!-- <nav class="navbar navbar-expand-lg bg-light navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a>
                                <router-link class="nav-link" aria-current="page" to="/home">Home</router-link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a>
                                <router-link class="nav-link" to="/about">About</router-link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a>

                                <router-link class="nav-link" to="/empview">EmployeeView</router-link>
                            </a>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a>
                                        <router-link class="dropdown-item" to="/login">Login</router-link>
                                    </a></li>
                                <li><a>
                                        <router-link class="dropdown-item" to="/register">Register</router-link>
                                    </a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><button type="button" class="btn btn-info dropdown-item"
                                        @click="logout()">Logout</button></li>

                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav> -->

        <h2>Employee Registration</h2>
        <form @submit.prevent="save" class="table">

            <div class="form-group">
                <label>Employee Name</label>
                <input v-model="employee.name" type="text" class="form-control" placeholder="Enter Employee Name"
                    required>
            </div>
            <div class="form-group">
                <label>Employee Address</label>
                <input v-model="employee.address" type="text" class="form-control" placeholder="Enter Employee Address"
                    required>
            </div>
            <div class="form-group">
                <label>Employee Mobile</label>
                <input v-model="employee.mobile" type="text" class="form-control" placeholder="Enter Employee Mobile"
                    required>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </form>

        <h2>Employee View</h2>
        <div v-if="loading" class="text-center loading-div">
            <div class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <table v-if="!loading" class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Option</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(employee, index) in result.data" v-bind:key="employee.id">

                    <td>{{ (this.page - 1) * 5 + (index + 1) }}</td>
                    <!-- <td>{{ index + 1 }}</td> -->
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.address }}</td>
                    <td>{{ employee.mobile }}</td>
                    <td>
                        <button type="button" class="btn btn-warning" @click="edit(employee)">Edit</button>
                        <button type="button" class="btn btn-danger" @click="remove(employee)">Delete</button>
                    </td>

                </tr>

            </tbody>
        </table>

        <Bootstrap5Pagination align="center" :data="result" @pagination-change-page="EmployeeLoad">
        </Bootstrap5Pagination>

        <!-- <button type="button" class="btn btn-info" @click="logout()">Logout</button> -->
        <router-view />
    </div>
</template>

<script>
// import Vue from 'vue';
// import axios from 'axios';
import axios from '@/services/axios.js'
// Vue.use(axios);

import router from '@/router';
import storage from '@/services/storage.js'
import {
    useRoute
} from 'vue-router';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import sweetAlert from 'sweetalert';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
    /* options */
});

export default {
    name: 'EmployeeView',
    components: {
        Bootstrap5Pagination,
    },
    data() {
        return {
            result: {},
            employee: {

                id: '',
                name: '',
                address: '',
                mobile: '',

            },
            page: '',
            loading: false,
        }
    },
    created() {

        this.EmployeeLoad();
    },
    methods: {
        EmployeeLoad(page = 1) {
            //const page = "/employees";
            this.loading = true;
            axios.get('/employees?page=' + page)
                .then(
                    ({
                        data
                    }) => {
                        //console.log(data);
                        this.result = data;
                        console.log(this.result);
                        this.page = page;
                        this.loading = false;
                    }
                );
        },
        save() {

            if (this.employee.id == '') {
                this.saveData();
            } else {
                this.updateData();
            }

        },
        saveData() {

            axios.post("/save", this.employee)
                .then(
                    ({
                        data
                    }) => {
                        sweetAlert('Success', 'Data added', 'success');
                        this.EmployeeLoad();
                    }
                );

        },

        edit(employee) {

            this.employee = employee;
        },
        updateData() {

            var update = "/update/" + this.employee.id;
            axios.put(update, this.employee)
                .then(
                    ({
                        data
                    }) => {

                        this.employee.name = '';
                        this.employee.address = '';
                        this.employee.mobile = '';
                        this.employee.id = '';

                        alert("Updated!!");
                        this.EmployeeLoad(this.page);
                    }
                );

        },
        remove(employee) {
            var del = "/delete/" + employee.id;

            axios.delete(del);

            alert("Deleted!!");
            sweetAlert('Success', 'Data Deleted', 'error');
            this.EmployeeLoad();

        },

        // logout() {

        //     if (storage.getItem('token')) {

        //         alert('Are you sure?');
        //         axios.post("/logout")
        //             .then(
        //                 ({
        //                     data
        //                 }) => {

        //                     if (data.success) {

        //                         storage.clearItem('token');
        //                         toaster.success('Logged Out Successfully!', {
        //                             position: 'top-right'
        //                         });
        //                         return router.push({
        //                             path: '/login'
        //                         });
        //                     } else {
        //                         this.error = data.message;
        //                     }
        //                     // alert(data.message);
        //                 }
        //             );
        //         // //localStorage.removeItem('token');
        //         // storage.clearItem('token');
        //         // return router.push({path: '/login'});

        //     } else if (!storage.getItem('token')) {
        //         toaster.success('Already Logged Out!', {
        //             position: 'top-right'
        //         });
        //     }

        // },

    },

}
</script>

<style scoped>
.btn-info {

    margin-top: 10px;
}

.table {
    width: 50%;
    /* margin-bottom: 1rem; */

    margin: 0 auto;
}

.loading-div {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>
