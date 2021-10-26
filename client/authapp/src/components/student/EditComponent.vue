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
                v-model="$v.student.name.$model"
                required
              />
              <div class="error" v-if="!$v.student.name.required">
                Name is required
              </div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control"
                v-model="$v.student.email.$model"
                required
              />
              <div class="error" v-if="!$v.student.email.required">
                Email is required.
              </div>
              <div class="error" v-if="!$v.student.email.email">
                This is not vaild email.
              </div>
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input
                type="text"
                class="form-control"
                v-model="$v.student.phone.$model"
                required
              />
              <div class="error" v-if="!$v.student.phone.required">
                Phone number is required
              </div>
              <div class="error" v-if="!$v.student.phone.numeric">
                Enter numeric values only.
              </div>
              <div class="error" v-if="!$v.student.phone.maxLength">
                Phone number cannot be greater than
                {{ $v.student.phone.$params.maxLength.max }}
                digit.
              </div>
            </div>
            <div class="form-group">
              <label>Group</label>
              <select v-model="$v.student.group.$model" class="form-control">
                <option
                  v-for="group in groups"
                  v-bind:value="group.id"
                  v-bind:key="group.id"
                >
                  {{ group.name }}
                </option>
              </select>
              <div class="error" v-if="!$v.student.group.required">
                Group is required
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
import axios from "axios";
import { required, email, maxLength, numeric } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      student: {},
      groups: {},
      submitStatus: null,
    };
  },
  mounted() {
    let apiURL = "http://localhost:4000/group/";
    let token = localStorage.getItem("jwt");

    axios
      .get(apiURL, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        this.groups = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
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
  validations: {
    student: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        numeric,
        maxLength: maxLength(10),
      },
      group: {
        required,
      },
    },
  },
  methods: {
    handleUpdateForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
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
      }
    },
  },
};
</script>

<style scoped>
.update-btn {
  margin: 1em;
}
</style>
