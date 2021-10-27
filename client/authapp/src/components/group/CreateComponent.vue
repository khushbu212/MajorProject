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
                v-model="$v.group.name.$model"
                required
              />
              <div v-if="$v.group.name.$error">
                <div class="error" v-if="!$v.group.name.required">
                  Name is required
                </div>
              </div>
            </div>

            <div class="form-group">
              <button class="btn btn-danger btn-block create-btn">
                Create
              </button>
              <p class="error" v-if="submitStatus === 'ERROR'">
                Please fill the form correctly.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      group: {
        name: "",
      },
      submitStatus: null,
    };
  },
  validations: {
    group: {
      name: {
        required,
      },
    },
  },
  methods: {
    async handleSubmitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        let token = localStorage.getItem("jwt");
        // let apiURL = "http://localhost:4000/group/add";

        let response = await this.$http
          .post("/group/add", this.group, {
            headers: {
              Authorization: token,
            },
          })
          .catch((error) => {
            console.log(error);
            this.$swal("Error", error, "error");
            return;
          });

        console.log(response);
        this.$router.push("/groups");
        this.group = {
          name: "",
        };

        // axios
        //   .post(apiURL, this.group, {
        //     headers: {
        //       Authorization: token,
        //     },
        //   })
        //   .then(() => {
        //     this.$router.push("/groups");
        //     this.group = {
        //       name: "",
        //     };
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      }
    },
  },
};
</script>

<style scoped>
.create-btn {
  margin: 0.5em;
}
</style>
