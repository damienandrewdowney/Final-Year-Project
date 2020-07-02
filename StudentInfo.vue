<template><!-- This is the html part of the Vue file-->
<div>
    <div class = "row-table">
        <table class = "table table-dark table-hover bg-secondary">
        <thead>
            <tr>
                <th> 
                    <h3> Student Name: </h3>
                </th>
                <th>
                    <input class="form-control search-medium" placeholder="" v-model="search.studentName.criteria">
                </th> 
                <th> 
                    <h3> Student Number: </h3>
                </th>
                <th>
                    <input class="form-control search-medium" placeholder="" v-model="search.studentId.criteria">
                </th>
                <th>
                    <button class="btn btn-primary" v-on:click ="getData">Search</button>
                </th>
            </tr>    
        </thead>
        </table>
    </div>
    <div class = "row">
        <studentDetails :students="students" />
    </div>
    <div class="row bg-secondary">
        <div class="col-sm-6 bg-warning"><!--colunm 6/12 wide for the form within the above row-->
            <CBATable :CBAs="CBAs"/>
            <!--Calls CBATab/le which is exported from the CBATable.vue file--> 
        </div>
        <div class="col-sm-6 bg-info"><!--colunm 6/12 wide for the form within the above row-->
            <resultTable :results="results"/>
            <!--Calls CBATable which is exported from the CBATable.vue file--> 
        </div>
    </div>
    <div class="row bg-secondary">
        <div class="col-sm-12 bg-danger"><!--colunm 6/12 wide for the form within the above row-->
            <AchievementTable :achievements="achievements"/>
            <!--Calls CBATable which is exported from the CBATable.vue file--> 
        </div>
    </div>
</div>


</template>

<script>//Java script code
import axios from 'axios';
import serverDetails from './constants';
import CBATable from './CBATable';
import resultTable from './ExamResultsTable';
import studentDetails from './studentPage';
import AchievementTable from './AchievementTable';
//imported files

export default {
    name: 'CBA',
    components: {
        CBATable,
        studentDetails,
        resultTable,
        AchievementTable

    },
    //exports page with name CBA which goes to CBAPage.Vue
    

 

    data: () => {
        return {
            // used for search
            search: {
                studentName: {
                    column: 'studentName',
                    operator: '=',
                    criteria: null,
                    
                },
                studentId: {
                    column: 'studentId',
                    operator: '=',
                    criteria: null,
                    
                },
                
            },
    
            CBAs: null,
            links: null,
            results: null,
            students: null,
            achievements: null,
            student: null
            

        }
        
    },
    
    methods: {
        getData() {
            this.error = null;
            this.loading = true;
            axios.all([this.getCBAs(this.search),this.getLinks(),this.getResults(this.search),this.getStudents(this.search),this.getAchievements(this.search)])
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                });
        },

        
        getCBAs(search, order) {
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
            if (order && order.column) {
                params.order = order;
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
        getAchievements(search, order) {
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
            if (order && order.column) {
                params.order = order;
            }
            axios.get(`${url}Achievement`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.achievements = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

        getStudents(search, order) {
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
            if (order && order.column) {
                params.order = order;
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

        getResults(search, order) {
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
            if (order && order.column) {
                params.order = order;
            }
            axios.get(`${url}results`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.results = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

        getLinks(search, order) {
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
            if (order && order.column) {
                params.order = order;
            }
            axios.get(`${url}link`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.links = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        
        
        
    },

}
</script>
