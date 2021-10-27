<template>
  <div>
    <div class="container-fluid ps-md-0">
      <div class="row g-0">
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div class="col-md-8 col-lg-6">
          <div class="login d-flex align-items-center py-5">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <h3 class="login-heading mb-4">Register</h3>

                  <!-- Sign In Form -->
                  <form @submit.prevent="registerUser">
                    <div class="form-floating mb-3">
                      <input
                        v-model="register.name"
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="Name"
                      />
                      <label for="floatingInput">Name</label>
                      <div v-if="$v.register.name.$error">
                        <div class="error" v-if="!$v.register.name.required">
                          Name is required
                        </div>
                        <div class="error" v-if="!$v.register.name.minLength">
                          Name must have at least
                          {{ $v.register.name.$params.minLength.min }} letters.
                        </div>
                      </div>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        v-model.trim="$v.register.email.$model"
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput">Email address</label>
                      <div v-if="$v.register.email.$error">
                        <div class="error" v-if="!$v.register.email.required">
                          Email is required.
                        </div>
                        <div class="error" v-if="!$v.register.email.email">
                          This is not vaild email.
                        </div>
                        <div class="error" v-if="!$v.register.email.isUnique">
                          This email is already registered.
                        </div>
                      </div>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        v-model="$v.register.password.$model"
                      />
                      <label for="floatingPassword">Password</label>
                      <div v-if="$v.register.password.$error">
                        <div
                          class="error"
                          v-if="!$v.register.password.required"
                        >
                          Password is required
                        </div>

                        <div
                          class="error"
                          v-if="!$v.register.password.minLength"
                        >
                          Pasword must have at least
                          {{ $v.register.password.$params.minLength.min }}
                          letters.
                        </div>
                      </div>
                    </div>

                    <!-- <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberPasswordCheck"
                      />
                      <label
                        class="form-check-label"
                        for="rememberPasswordCheck"
                      >
                        Remember password
                      </label>
                    </div> -->

                    <div class="d-grid">
                      <button
                        class="
                          btn btn-lg btn-primary btn-login
                          text-uppercase
                          fw-bold
                          mb-2
                        "
                        type="submit"
                      >
                        Sign Up
                      </button>
                      <div class="text-center">
                        Already have an account??<router-link to="/"
                          >click here</router-link
                        >
                        <!-- <a class="small" href="#">Forgot password?</a> -->
                        <p class="error" v-if="submitStatus === 'ERROR'">
                          Please fill the form correctly.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';
const swal = require("sweetalert");
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
      },
      submitStatus: null,
    };
  },
  validations: {
    register: {
      email: {
        required,
        email,
        async isUnique(value) {
          console.log(value);

          let response = await this.$http.post("/user/check-unique-email", {
            email: this.register.email,
          });

          if (response.data.exist) {
            return false;
          } else {
            return true;
          }
        },
      },
      name: {
        required,
        minLength: minLength(4),
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    async registerUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        try {
          let response = await this.$http.post("/user/register", this.register);
          console.log(response);
          let token = response.data.token;
          if (token) {
            localStorage.setItem("jwt", token);
            this.$router.push("/");
            swal("Success", "Registration Was successful", "success");
          } else {
            swal("Error", "Something Went Wrong", "error");
          }
        } catch (err) {
          let error = err.response;
          if (error.status == 409) {
            swal("Error", error.data.message, "error");
          } else {
            swal("Error", error.data.err.message, "error");
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.login {
  min-height: 100vh;
}

.bg-image {
  background-image: url("https://image.freepik.com/free-photo/abstract-fantasy-landscape-background_23-2149124340.jpg");
  background-size: cover;
  background-position: center;
}

.login-heading {
  font-weight: 300;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}
</style>
