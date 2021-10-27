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
              <button class="btn btn-danger btn-block update-btn">
                Update
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
  created() {
    let token = localStorage.getItem("jwt");
    let apiURL = `/group/edit/${this.$route.params.id}`;
    //  await this.$http.get(`/group/update/${this.$route.params.id}`).catch((error) => {
    //       console.log(error);
    //     });
    //   this.group = res.data;
    this.$http
      .get(apiURL, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.group = res.data;
      });
  },
  validations: {
    group: {
      name: {
        required,
      },
    },
  },
  methods: {
    handleSubmitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        let token = localStorage.getItem("jwt");
        //    let response = await this.$http.post(`/group/update/${this.$route.params.id}`,this.group, {
        //   headers: {
        //     Authorization: token,
        //   },
        // }).catch((error) => {
        //   console.log(error);
        // });

        //   this.$router.push("/groups");
        //   this.group = {
        //     name: "",
        //   };
        let apiURL = `/group/update/${this.$route.params.id}`;

        this.$http
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
      }
    },
  },
};
</script>

<style scoped>
.update-btn {
  margin: 0.5em;
}
</style>
