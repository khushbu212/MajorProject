<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link to="/home" class="navbar-brand">Dashboard</router-link>
        
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
               <router-link to="/groups" class="nav-link">Groups</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/student" class="nav-link">Students</router-link>
              
            </li>
            <li class="nav-item active">
              <a class="nav-link" @click="logUserOut"> Logout</a>
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
  methods: {
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  },
}
</script>

<style>
.card {
  margin: 2em;
}
</style>