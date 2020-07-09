<template>
<div>
    <div class="row bg-light text-dark">
        <div class="col-sm-6 bg-success">
            <newStudentForm :students="students" :newStudentModel="models.newStudentModel" />
        </div>
        <div class="col-sm-6 bg-warning">

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import serverDetails from './constants';
import newStudentForm from './newStudent';



export default {
    name: 'addData',
     props: ['models'],
    components: {
        newStudentForm,
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getData();
    },
    data() {
        return {
            loading: false,
            error: null,
            students: null,
            CBAs: null,
        }
    },
    methods: {
        getData() {
            this.error = null;
            this.loading = true;
            axios.all([this.getStudents()])
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                });
        },

        addnewStudent(newStudent) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}student`, newStudent, {
                    params
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

        addCBA(newCBA) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}CBA`, newCBA, {
                    params
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

        getStudents(search) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
                if (search) {
                    params.search = {};
                    Object.values(search).forEach((value) => {
                        if (value.criteria) {
                            params.search[value.column] = {
                                column: value.column,
                                operator: value.operator,
                                criteria: value.criteria
                            }
                            console.log(params);
                        }
                    });
                }
            axios.get(`${url}student`, {
                params
            })
            .then(response => {
                this.loading = false;
                this.students = response.data;
                console.log('promise has resolved', response.data);
            })
            .catch(error => {
                this.loading = false;
                this.error = error.toString();
                console.log(error);
            })
        },


        getCBAs(search) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
                if (search) {
                    params.search = {};
                    Object.values(search).forEach((value) => {
                        if (value.criteria) {
                            params.search[value.column] = {
                                column: value.column,
                                operator: value.operator,
                                criteria: value.criteria
                            }                        
                        }
                    });
                console.log(params);
                }
                axios.get(`${url}CBA`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.CBAs = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })            
        },
    }
}
</script>