<template>
    <div class = "row-table">
    
        <thead>
            <h1> Exam Results </h1>
        </thead>
        <table class = "table table-dark table-hover bg-secondary">
        <thead>
            <tr>
                <th>
                    <input class="form-control search-medium" placeholder="Type" v-model="searchTwo.examType.criteria">
                </th>  
                <th>
                    <input class="form-control search-medium" placeholder="Subject" v-model="searchTwo.schoolSubject.criteria">
                </th>
                <th>
                    <input class="form-control search-medium" placeholder="Teacher" v-model="searchTwo.teacher.criteria">
                </th>
                <th>
                    <input class="form-control" placeholder="Result" v-model="searchTwo.result.criteria">
                </th>
                <th>
                    <button class="btn btn-primary" v-on:click ="getResults">Find</button>
                </th>
            </tr>    
        </thead>
     
        <thead> 
            <tr> 
                <th> Exam Type </th>
                <th> Subject </th>
                <th> Teacher </th>
                <th> Result </th>
                <th> Comment </th>
            </tr>
        </thead>    
        <tbody>
            <tr v-for="row in results" :class ="{ selected: row.selected }" v-bind:key ="row.id">
                <td> {{ row.examType }} </td>
                <td> {{ row.schoolSubject }} </td>
                <td> {{ row.teacher }} </td>
                <td> {{ row.result }} </td>
                <td> {{ row.comment }} </td>
            </tr>

        </tbody>
    </table>
    </div>
            
                


</template>

<script>
export default {
    name: 'resultTable',
    props: ['results'],
    data: () => {
        return {
            // used for search
            searchTwo: {
                studentId: {
                    column: 'studentId',
                    operator: '=',
                    criteria: null
                    
                },
                examType: {
                    column: 'examType',
                    operator: '=',
                    criteria: null
                },
                schoolSubject: {
                    column: 'schoolSubject',
                    operator: '=',
                    criteria: null
                },
                result: {
                    column: 'result',
                    operator: '=',
                    criteria: null
                },
                teacher: {
                    column: 'teacher',
                    operator: '=',
                    criteria: null
                },
                
            },
        };
    },
    methods: {
        getResults() {
            // $parent is the parent component (in this case the StudentInfo.vue component)
            this.$parent.getResults(this.$parent.search,this.searchTwo);
        },
    },
}

</script>