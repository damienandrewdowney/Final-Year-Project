<template>
<div class="login">
    <form v-if="!loggedIn" @submit="login" class="form-inline" id="createAdministrator">
        <div class="row">
            <div class="form-group">
                <input v-model="model.email" type="email" class="form-control" id="email" placeholder="Enter Email" name="email">
            </div>
            <div class="form-group">
                <input v-model="model.password" type="password" class="form-control" id="password" placeholder="Enter Password" name="password">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </div>
    </form>
    <form v-else-if="loggedIn" @submit="logout" class="form-inline" id="createAdministrator">
        <div>
            <button type="submit" class="btn btn-primary">Logout</button>
        </div>
    </form>
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul class="list-group">
            <li v-for="error in errors" v-bind:key="error" class="list-group-item list-group-item-danger">{{ error }}</li>
        </ul>
    </p>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.login {
    margin-top: 1em;
    margin-right: 1em;
    float: right;
}
</style>

<script>
import axios from 'axios';
import serverDetails from './constants';

export default {
    name: 'Login',
    mounted() {
        console.log('Component mounted.')
    },
    computed: {
        loggedIn() {
            return sessionStorage.loggedIn === "true";
        }
    },
    data() {
        return {
            errors: [],
            model: {
                email: null,
                password: null
            },
        }
    },
    methods: {
        login(event) {
            this.errors = [];
            if (!this.model.email) {
                this.errors.push('Email required.');
            }
            if (!this.model.password) {
                this.errors.push('Password required.');
            } else {
                let url = serverDetails.url;
                let params = {
                    ...serverDetails.params
                };
                let data = {
                    username: this.model.email,
                    password: this.model.password
                }
                axios.post(`${url}login/auth`, data, {
                    params
                }).then((response) => {
                    // A successful login will return a user
                    if (response.data.user != false) {
                        // If a user then record in session storage
                        sessionStorage.loggedIn = "true";
                        sessionStorage.token = response.data.token;
                        // force reload of page
                        location.reload(true);
                        console.log(response.data.user);
                        console.log(data);
                    }
                }).catch((err) => {
                    console.log(err.message);
                });
            }
            event.preventDefault();
        },
        logout(event) {
            this.errors = [];
            let url = serverDetails.url;
            let params = {
                ...serverDetails.params
            };
            axios.get(`${url}login/logout`, {
                params
            }).then(() => {
                sessionStorage.loggedIn = "false";
                sessionStorage.token = undefined;
                // force reload of page
                location.reload(true);
            }).catch((err) => {
                console.log(err.message);
            });
            event.preventDefault();
        }
    }
}
</script>