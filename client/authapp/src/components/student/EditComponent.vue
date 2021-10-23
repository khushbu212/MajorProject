<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <div class="card">
        <div class="card-header">Update Student</div>
        <div class="card-body">
          <form @submit.prevent="handleUpdateForm">
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
              <label>Group</label>
              <select v-model="student.group" class="form-control">
                <option v-for="group in groups" v-bind:value="group.id" v-bind:key="group.id" >
                  {{ group.name }}
                </option>
            </select>
            </div>

            <div class="form-group">
              <button class="btn btn-danger btn-block update-btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      student: {},
      groups: {}
    };
  },
  mounted() {
    let apiURL = "http://localhost:4000/group/"
    let token = localStorage.getItem("jwt");

    axios.get(apiURL,{
          headers: {
            Authorization: token,
          },
        }).then((res)=>{
          console.log(res);
          this.groups = res.data;
        }).catch(error => {
           console.log(error);
        })

  },
  created() {
    let token = localStorage.getItem("jwt");
    let apiURL = `http://localhost:4000/student/edit-student/${this.$route.params.id}`;

    axios
      .get(apiURL, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.student = res.data;
      });
  },
  methods: {
    handleUpdateForm() {
      let token = localStorage.getItem("jwt");
      let apiURL = `http://localhost:4000/student/update-student/${this.$route.params.id}`;

      axios
        .post(apiURL, this.student, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/student");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.update-btn{
  margin: 1em;
}
</style>
