<template>
  <div class="card">
    <div class="card-header">Student Management</div>
    <div class="card-body">
      <div class="">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <router-link
              :to="{ name: 'add' }"
              class="btn btn-primary add-student-btn"
            >
              Add Student</router-link
            >
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in Students" :key="student._id">
                  <td>{{ student.name }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.phone }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'edit', params: { id: student._id } }"
                      class="btn btn-success"
                      >Edit
                    </router-link>
                    <button
                      @click.prevent="deleteStudent(student._id)"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      Students: [],
    };
  },
  created() {
    let token = localStorage.getItem("jwt");
    let apiURL = "/student/";
    this.$http
      .get(apiURL, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        this.Students = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteStudent(id) {
      let token = localStorage.getItem("jwt");

      let apiURL = `/student/delete-student/${id}`;
      let indexOfArrayItem = this.Students.findIndex((i) => i._id === id);

      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        buttonsStyling: true,
      }).then((isConfirm) => {
        if (isConfirm.value === true) {
          this.$http
            .delete(apiURL, {
              headers: {
                Authorization: token,
              },
            })
            .then(() => {
              this.$swal("Info!", "Student has been deleted", "success");
              this.Students.splice(indexOfArrayItem, 1);
            })
            .catch((error) => {
              this.$swal({
                title: "Error!",
                text: "Do you want to continue",
                icon: "error",
                confirmButtonText: "Cool",
              });
              console.log(error);
            });
        }
      });
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}


.add-student-btn {
  float: right;
}
</style>
