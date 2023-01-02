<template>
<h3>Profile Info</h3>

<div class="px-2 py-5 bg-white sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md profileItem">
    <ul>
        <!-- <li>{{ user.id }}</li> -->
        <li><span>Name: </span>{{ user.name }}</li>
        <li><span>Email: </span>{{ user.email }}</li>
        <li><button type="button" class="btn btn-danger deleteButton" @click="deleteUser(user)">Delete</button></li>
    </ul>
</div>

</template>

<script>
import axios from '@/services/axios.js'
import storage from '@/services/storage.js'
import router from '@/router';
import {
    useRoute
} from 'vue-router';
import {
    reactive,
    toRefs,
    watchEffect,
    onMounted,
} from 'vue';
import sweetAlert from 'sweetalert';
export default {

    name: 'Profile',
    setup() {
        const state = reactive({

            user: {
                id: '',
                name: '',
                email: '',
            },
        });

        state.user.id = storage.getItem('user').id;
        state.user.name = storage.getItem('user').name;
        state.user.email = storage.getItem('user').email;

        function deleteUser(user){
              var del = "/deleteUser" + user;
              axios.post(del);
              alert("Deleted!!");
              
        }

        return {
            ...toRefs(state),
            deleteUser,

        }
    }

}
</script>

<style scoped>

h3{
    margin-top: 25px;
}
.profileItem{
    width: 39%;
    margin: 0 auto;
    display: flex;
    font-weight: bolder;
}
.profileItem ul li{
    text-align: left;
}
.deleteButton{
    margin-top: 25px;
}
</style>