<template>
   
<div>
      <!-- <nav>
      <router-link to="/login">Login | </router-link>
      <router-link to="/register">Register | </router-link>
      <router-link to="/empview">EmployeeView</router-link>
     
    </nav> -->
    
    <h2>Login Form</h2>

    <p class="text-danger" v-if="error" > {{ error }} </p>
    <form @submit.prevent="login">

        <div class="container">
            
            <input v-model="loginObj.email" type="email" placeholder="Enter Email" name="email" required><br>

          
            <input v-model="loginObj.password" type="password" placeholder="Enter Password" name="password" required><br>

            <button type="submit">Login</button><br>
            
        </div>

    </form>

</div>
</template>

  
  
<script>
import axios from'@/services/axios.js'
import router from '@/router'
import storage from '@/services/storage.js'




export default {
    name: 'Login',
    data() {
        return {
            msg: '',

            resutl: {},
            loginObj: {
                email: '',
                password: '',

            },
            error:'',
            
        }
        
    },
    
    methods: {
    
       
      login(){
        axios.post("/login/save", this.loginObj)
        .then(
          ({data}) => {
            
             if(data.success){
               //alert('success');
            //    localStorage.setItem('token', data.data.token);
               storage.setItem('token', data.data.token);
               
               this.$toast.success(`Logged In Succesfully`, {
                position: "top-right",
               });
               return router.push({path: '/empview'});
             }
             else{
              this.error = data.message;
             }
            // alert(data.message);
          }
        );

      }
    }
}
</script>

<style scoped>
body {
    font-family: Arial, Helvetica, sans-serif;
}

form {
    border: 3px solid #f1f1f1;
}

input[type=password],
input[type=email] {
    width: 40%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

button {
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 40%;
}

button:hover {
    opacity: 0.8;
}

.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}

.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
}

img.avatar {
    width: 40%;
    border-radius: 50%;
}

.container {
    padding: 16px;
}

span.psw {
    float: right;
    padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
        display: block;
        float: none;
    }

    .cancelbtn {
        width: 100%;
    }
}
</style>
