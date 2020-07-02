<template>
<div id="app" class="container-fluid">
    <div class = "container-fluid">
            <div class = "row row-header"> 
                <div class = "col-sm-2">
                    <br>
                    <img src = "../src/CPScrest.png"> 
                </div>
                <div class = "col-sm-7">
                    <br>
                    <h2> Colaiste Pobail Setanta Student Achievement Record </h2>
                </div>
                <div class="col-sm-3">
                    <Login />
                    <span v-show="loggedIn">
                        <router-link to="/">Home</router-link>
                        <br>
                        <router-link to="/StudentDetails">Student Details</router-link>
                    </span>
                </div>
            </div>   
    </div>
        <router-view /> 
</div>



</template>

<style scoped>
img {
  width: 8em;
  height: 6em;
}

#img2 img{
    width: 85em;
    height: 45em;
}
</style>

<script>
// @ is an alias to /src
import Login from './login.vue';


export default {
    components: {
        Login,
    },
    data() {
        return {
            loading: false,
            users: null,
            error: null,
        }
    },
    computed: {
        loggedIn() {
            return sessionStorage.loggedIn === "true";
        }
    },
}
</script>
