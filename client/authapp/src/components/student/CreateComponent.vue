<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Create Student</h3>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.email"
            required
          />
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input
            type="text"
            class="form-control"
            v-model="student.phone"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-danger btn-block">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      student: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let token = localStorage.getItem("jwt");
      let apiURL = "http://localhost:4000/student/create-student";

      axios
        .post(apiURL, this.student, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          this.$router.push("/student");
          this.student = {
            name: "",
            email: "",
            phone: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
