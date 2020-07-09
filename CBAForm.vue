<template>
<div>
    <h1> Add New User </h1>

    <form @submit.prevent class = "bg-secondary">
         <div class="form-group">
            <label for="studentId">Student Number *</label>
            <input type="number" class="form-control" placeholder="Enter Student Number" id="studentId" v-model="model.studentId" >
        </div>
        
        <div class="form-group">
            <label for="studentName">Student Name *</label>
            <input class="form-control" placeholder="Enter Student Name" id="studentName" v-model="model.studentName">
        </div>
        
        <div class="form-group">
            <label for="schoolSubject">Subject *</label>
            <input class="form-control" placeholder="Subject" id="schoolSubject" v-model="model.schoolSubject">
        </div>

        <div class="form-group">
            <label for="CBANumber">CBA Number *</label>
            <input type="number" class="form-control" placeholder="CBA Number" id="CBANumber" v-model="model.CBANumber" >
        </div>

        <div class="form-group">
            <label for="teacher">Teacher *</label>
            <input class="form-control"  placeholder="Teacher" id="teacher" v-model="model.teacher">
        </div>

        <div class="form-group">
            <label for="descriptor"> Descriptor *</label>
            <input class="form-control"  placeholder="Descriptor" id="descriptor" v-model="model.descriptor">
        </div>

        <div class="form-group">
            <label for="comment"> Comment *</label>
            <input class="form-control"  placeholder="Comment" id="comment" v-model="model.comment">
        </div>
        
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="addCBA">Add</button>
        </div>
    
    </form>
</div>
</template>

<script>

export default {
    name: 'CBAForm',
    props: ['CBAs', 'CBAModel'],
    data() {
        return {
            model: this.CBAModel,
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
        addCBA() {
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            let newCBA = {
                studentId: this.model.studentId,
                studentName: this.model.studentName,
                schoolSubject: this.model.schoolSubject,
                CBANumber: this.model.CBANumber,
                teacher: this.model.teacher,
                descriptor: this.model.descriptor,
                comment: this.model.comment,
            };
            this.$parent.addCBA(newCBA);
            this.resetCBA();
        },
        
        resetCBA() {
            this.model.isNew = true;
            this.model.isValid = false;
            this.model.studentId = null;
            this.model.studentName = null;
            this.model.schoolSubject = null;
            this.model.CBANumber = 0;
            this.model.teacher = null;
            this.model.descriptor = null;
            this.model.comment = null;
        },
    },
}
</script>