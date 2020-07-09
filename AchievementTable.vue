<template>             
        <div class = "row-table">
           
                <thead>
                    <h1> Achievements</h1>
                </thead>
                <table class = "table table-dark table-hover bg-secondary">
                <thead>
                    <tr>
                        <th>
                            <input class="form-control search-medium" placeholder="Achievement" v-model="searchTwo.achievement.criteria">
                        </th>  
                        <th>
                            <input class="form-control search-medium" placeholder="Date" v-model="searchTwo.achievementDate.criteria">
                        </th>
                        <th>
                            <input class="form-control search-medium" placeholder="Teacher" v-model="searchTwo.teacher.criteria">
                        </th>
                        <th>
                            <button class="btn btn-primary" v-on:click ="getAchievements">Find</button>
                        </th>
                    </tr>    
                </thead>
                <thead>
                    <tr> 
                            <th>Achievement</th>
                            <th>Date</th>
                            <th>Teacher</th>
                            <th>Description</th>
                    </tr>
                </thead> 
                             
                  
                <tbody>
                    <tr v-for="row in achievements" :class="{ selected: row.selected }" v-bind:key="row.id">
                        <td>{{ row.achievement }}</td>
                        <td>{{ row.achievementDate }}</td>
                        <td>{{ row.teacher }}</td>
                        <td>{{ row.comment }}</td>
                
                    </tr>
                </tbody>
            </table>

        </div>
</template>

<script>
export default {
    name: 'AchievementTable',
    props: ['achievements'],
    data: () => {
        return {
            // used for search
            searchTwo: {
                achievement: {
                    column: 'achievement',
                    operator: '=',
                    criteria: null
                    
                },
                achievementDate: {
                    column: 'achievementDate',
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
        getAchievements() {
            // $parent is the parent component (in this case the StudentInfo.vue component)
            this.$parent.getAchievements(this.$parent.search,this.searchTwo);
        },
    },
}
</script>