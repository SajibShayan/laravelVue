<template>
<div>

    <form @submit.prevent="saveData">
        <div class="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <input v-model="registerObj.name" type="text" placeholder="Enter User Name" name="name" required><br>

            <input v-model="registerObj.email" type="email" placeholder="Enter Email" name="email" required><br>

            <input v-model="registerObj.password" type="password" placeholder="Enter Password" name="password" required><br>

            <input v-model="registerObj.c_password" type="password" placeholder="Repeat Password" name="c_password" required><br>

            <!-- <label>
    <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
  </label> -->

            <!-- <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p> -->

            <div class="clearfix">
                <!-- <button type="button" class="cancelbtn">Cancel</button> -->
                <button type="submit" class="signupbtn">Sign Up</button>
            </div>
        </div>
    </form>

</div>
</template>

<script>
import axios from '@/services/axios.js'
import { reactive, toRefs, watchEffect, onMounted } from 'vue';
export default {
    name: 'Register',
    setup() {
        const state = reactive({

            result: {},

            registerObj: {
                name: '',
                email: '',
                password: '',
                c_password: '',

            },
        });

       async function saveData() {

            axios.post("/register/save", this.registerObj)
                .then(

                    ({
                        data
                    }) => {

                        alert('Saveeddd!!!');
                        console.log(data);
                    }

                );

        }

        return {
            ...toRefs(state),
            saveData,
        }

    }
}
</script>

<style scoped>
/* body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box} */

/* Full-width input fields */
input[type=email],
input[type=text],
input[type=password] {
    width: 40%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}

input[type=text]:focus,
input[type=password]:focus {
    background-color: #ddd;
    outline: none;
}

hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 50%;
    opacity: 0.9;
}

button:hover {
    opacity: 1;
}

/* Extra styles for the cancel button */
.cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {

    width: 40%;
}

/* Add padding to container elements */
.container {
    padding: 16px;
}

/* Clear floats */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {

    .cancelbtn,
    .signupbtn {
        width: 50%;
    }
}
</style>
