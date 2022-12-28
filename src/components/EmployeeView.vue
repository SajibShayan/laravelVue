<template>
<div>

    <h2>Employee Registration</h2>
    <form @submit.prevent="save" class="table">

        <div class="form-group">
            <label>Employee Name</label>
            <input v-model="employee.name" type="text" class="form-control" placeholder="Enter Employee Name" required>
        </div>
        <div class="form-group">
            <label>Employee Address</label>
            <input v-model="employee.address" type="text" class="form-control" placeholder="Enter Employee Address" required>
        </div>
        <div class="form-group">
            <label>Employee Mobile</label>
            <input v-model="employee.mobile" type="text" class="form-control" placeholder="Enter Employee Mobile" required>
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
    </form>

    <h2>Employee View</h2>
    <div v-if="loading" class="text-center loading-div">
        <div class="spinner-border text-warning" style="width: 3rem; height: 3rem;" role="status">
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

                <td>{{ (this.page-1)*5 +(index+1) }}</td>
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
   
    <Bootstrap5Pagination align="center" :data="result" @pagination-change-page="EmployeeLoad"></Bootstrap5Pagination>

    <button type="button" class="btn btn-info" @click="logout()">Logout</button>
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
import {
    Bootstrap5Pagination
} from 'laravel-vue-pagination';
import sweetAlert from 'sweetalert';
import {
    createToaster
} from "@meforma/vue-toaster";
const toaster = createToaster({
    /* options */ });

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

            //alert("Deleted!!");
            sweetAlert('Success', 'Data Deleted', 'error');
            this.EmployeeLoad(this.page);

        },

        logout() {

            axios.post("/logout")
                .then(
                    ({
                        data
                    }) => {

                        if (data.success) {

                            storage.clearItem('token');
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
        },

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

    display: flex;
    justify-content: center;
    align-items: center;

}
</style>
