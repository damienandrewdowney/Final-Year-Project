<template>
<div class = "row-table">

     <thead>
             <h1> Add New Student </h1>
    </thead>
    <form @submit.prevent class = "bg-secondary">
        
        <div class="form-group">
            <label for="studentName">Student Name *</label>
            <input class="form-control" placeholder="Enter Student Name" id="studentName" v-model="model.studentName">
        </div>
        
        <div class="form-group">
            <label for="studentYear">Year Group *</label>
            <input type="number" class="form-control" placeholder="Enter Students Year" id="studentYear" v-model="model.studentYear" >
        </div>

        
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="addnewStudent">Add</button>
        </div>
    
    </form>
</div>
</template>

<script>

export default {
    name: 'newStudentForm',
    props: ['students', 'newStudentModel'],
    data() {
        return {
            model: this.newStudentModel,
        }
    },
    methods: {
        validate() {
            this.model.isNew = false;
            if (!this.model.studentName || this.model.studentName.length < 3) { 
                this.model.isValid = false;
            } else {
                this.model.isValid = true;
            }
            return this.model.isValid;
        },
        addnewStudent() {
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            let newStudent = {
                studentId: this.model.studentId,
                studentName: this.model.studentName,
                studentYear: this.model.studentYear,
                email: this.model.email,
                password: this.model.password,
                role: this.model.role,
            };
            this.$parent.addnewStudent(newStudent);
            this.resetnewStudent();
        },
        
        resetnewStudent() {
            this.model.isNew = true;
            this.model.isValid = false;
            this.model.StudentId = null;
            this.model.studentName = null;
            this.model.studentYear = 0;
        },
    },
}
</script>