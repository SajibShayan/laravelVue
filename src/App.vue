<template>
    <div id="app">
      <!-- <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
          <router-link class="navbar-brand" :to="{name :'Home' }">Home </router-link>
          <ul class="navbar-nav">
              <li class="nav-item">
                  <router-link class="text-white" :to="{name : 'Login' }" v-if="$store.getters.getToken == 0">Login</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="text-white ml-2" :to="{name : 'Register' }" v-if="$store.getters.getToken == 0"> Register</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="text-white ml-2" :to="{name : 'Dashboard' }" v-if="$store.getters.getToken != 0"> Dashboard</router-link>
              </li>
  
          </ul>
      </nav> -->
  
      <nav>
        <router-link to="/login">Login | </router-link>
        <router-link to="/register">Register | </router-link>
        <router-link to="/empview">EmployeeView | </router-link>
       
      </nav>
  
      <router-view/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App'
  }
  </script>
  
  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    margin-top: 60px;
    margin-top: 60px;
  }
  </style>