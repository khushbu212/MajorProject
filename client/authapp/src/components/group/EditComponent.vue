<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <div class="card">
        <div class="card-header">Update Group</div>
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
      group: {
        name: "",
      },
          
    };
  },
  created() {
    let token = localStorage.getItem("jwt");
    let apiURL = `http://localhost:4000/group/edit/${this.$route.params.id}`;

    axios
      .get(apiURL, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.group = res.data;
      });
  },
  methods: {
    handleSubmitForm() {
      let token = localStorage.getItem("jwt");
      let apiURL = `http://localhost:4000/group/update/${this.$route.params.id}`;

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
.update-btn{
    margin: 0.5em;
}
</style>