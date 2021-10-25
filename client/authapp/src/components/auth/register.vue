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
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        v-model="register.email"
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        v-model="register.password"
                      />
                      <label for="floatingPassword">Password</label>
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
const swal = require("sweetalert");

export default {
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
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
    },
  },
};
</script>

<style scoped>
.login {
  min-height: 100vh;
}

.bg-image {
  background-image: url("https://source.unsplash.com/WEQbe2jBg40/600x1200");
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
