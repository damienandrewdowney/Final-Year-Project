<template>
    <div class = "container-fluid">
            <div class = "row row-header"> 
                <tr v-for="row in students" :class ="{ selected: row.selected }" v-bind:key ="row.id">
                    <td> <h2> Student Name : {{ row.studentName }} </h2> </td>
                </tr>
                   
            </div>
    </div>
    
  
</template>

<style scoped>
img {
  width: 8em;
  height: 8em;
}
</style>


<script>

export default {
    name: 'studentDetails',
    props: ['students'],

}

</script>