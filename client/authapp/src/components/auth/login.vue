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
                  <h3 class="login-heading mb-4">Login</h3>

                  <!-- Sign In Form -->
                  <form @submit.prevent="loginUser">
                    <div class="form-floating mb-3">
                      <input
                        v-model="login.email"
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
                        v-model="login.password"
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
                        Sign in
                      </button>
                      <div class="text-center">
                        Don't have an account? <router-link to="/register">Create One</router-link>
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
      login: {
        email: "",
        password: "",
      },
    };
  },

  beforeCreate() {
    if(localStorage.getItem("jwt") != null){
      console.log("Already login");
      this.$router.push("/home");
    }
  },
 
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login Successful", "success");
          this.$router.push("/home");
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
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
