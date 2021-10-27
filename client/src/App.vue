<template>
  <div id="app">
      
    <nav v-if="$route.name !== 'login' &&  $route.name !== 'register'" class="navbar navbar-expand-lg navbar-dark bg-dark" id="nav" v-bind:class=" { 'navbarOpen': show }">
      <div class="container">
        <router-link to="/home" class="navbar-brand">Dashboard</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click.stop="toggleNavbar()"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent" v-bind:class="{ 'show': show }"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/groups" class="nav-link">Groups</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/student" class="nav-link">Students</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/emails" class="nav-link">Emails</router-link>
            </li>
            <li class="nav-item active logout-btn">
              <a class="btn btn-danger" @click="logUserOut"> Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:true
    }
  },
  methods: {
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
    toggleNavbar(){
      this.show = !this.show;
    }
  },
};
</script>

<style>
.card {
  margin: 2em;
}

#nav a.router-link-exact-active {
  color: rgb(1, 3, 136);
  background: rgb(235, 230, 231);
  border-radius: 0.5rem;
}

.logout-btn {
  margin-left: 1em;
}

.error {
  color: red;
}

</style>
