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
                 </div>
            </div> 
             <div id ="nav" class = "row row-nav"> 
                 <button class="btn btn-light">
                      <router-link to="/">Home</router-link> 
                </button>

                <button class="btn btn-light">
                    <router-link to="/StudentDetails">Student Details</router-link>
                </button>
                
                <span v-show="loggedIn">
                    <button class="btn btn-light">
                        <router-link to="/addData">Add New User</router-link>
                    </button>
                </span>
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

#nav{
    padding-left: 8em;
}

button {
    margin: 0.5em;
    margin-left: 3em;
    margin-right: 2em;    
    border-radius: 1em;
    border-color: black;
    font-size: 20px;
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
