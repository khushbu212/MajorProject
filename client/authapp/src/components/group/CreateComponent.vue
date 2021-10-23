<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <div class="card">
        <div class="card-header">Create Group</div>
        <div class="card-body">
          <form @submit.prevent="handleSubmitForm">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                v-model="group.name"
                required
              />
            </div>

            <div class="form-group">
              <button class="btn btn-danger btn-block create-btn">Create</button>
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
      group: {
        name: "",
      },
          
    };
  },
  methods: {
    handleSubmitForm() {
      let token = localStorage.getItem("jwt");
      let apiURL = "http://localhost:4000/group/add";

      axios
        .post(apiURL, this.group, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
        
          this.$router.push("/groups");
          this.group = {
            name: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.create-btn{
    margin: 0.5em;
}
</style>