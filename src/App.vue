<template>
  <div id="app">

    <!-- <nav class="navbar navbar-expand-lg bg-light navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                <li><button type="button" class="btn btn-info dropdown-item" @click="logout()">Logout</button></li>

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

    <!-- <nav>

      <router-link to="/home">Home | </router-link>
      <router-link to="/about">About | </router-link>
        <router-link to="/login">Login | </router-link>
        <router-link to="/register">Register | </router-link>
        <router-link to="/empview">EmployeeView</router-link>

    </nav> -->
    

    <router-view />
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
  createToaster
} from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});

export default {
  name: 'App',
  methods: {
    logout() {

      if (storage.getItem('token')) {

        alert('Are you sure?');
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

      } else if (!storage.getItem('token')) {
        toaster.success('Already Logged Out!', {
          position: 'top-right'
        });
      }

    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
