<template>             
        <div class = "row-table">
           
                <thead>
                    <h1> CBA Results</h1>
                </thead>
                <table class = "table table-dark table-hover bg-secondary">
                     <thead>
            <tr>
                <th>
                    <input class="form-control search-medium" placeholder="Subject" v-model="searchTwo.schoolSubject.criteria">
                </th>  
                <th>
                    <input class="form-control search-medium" placeholder="CBA" v-model="searchTwo.CBANumber.criteria">
                </th>
                <th>
                    <input class="form-control search-medium" placeholder="Teacher" v-model="searchTwo.teacher.criteria">
                </th>
                <th>
                    <input class="form-control" placeholder="Descriptor" v-model="searchTwo.descriptor.criteria">
                </th>
                <th>
                    <button class="btn btn-primary" v-on:click ="getCBAs">Find</button>
                </th>
            </tr>    
        </thead>
                <thead>
                    <tr> 
                        <th>Subject</th>
                        <th>CBA</th>
                        <th>Teacher</th>
                        <th>Descriptor</th>
                        <th>Comment</th>
                    </tr>
                </thead> 
                             
                  
                <tbody>
                    <tr v-for="row in CBAs" :class="{ selected: row.selected }" v-bind:key="row.id">
                        <td>{{ row.schoolSubject }}</td>
                        <td>{{ row.CBANumber }}</td>
                        <td>{{ row.teacher }}</td>
                        <td>{{ row.descriptor }}</td>
                        <td>{{ row.comment }}</td>
                
                    </tr>
                </tbody>
            </table>

        </div>
</template>

<script>
export default {
    name: 'CBATable',
    props: ['CBAs'],
    data: () => {
        return {
            // used for search
            searchTwo: {
                schoolSubject: {
                    column: 'schoolSubject',
                    operator: '=',
                    criteria: null
                },
                CBANumber: {
                    column: 'CBANumber',
                    operator: '=',
                    criteria: null
                },
                teacher: {
                    column: 'teacher',
                    operator: '=',
                    criteria: null
                },
                descriptor: {
                    column: 'descriptor',
                    operator: '=',
                    criteria: null
                },
            },
        };
    },

    methods: {
        getCBAs() {
            // $parent is the parent component (in this case the StudentInfo.vue component)
            this.$parent.getCBAs(this.$parent.search,this.searchTwo);
        },
    },

}

</script>
