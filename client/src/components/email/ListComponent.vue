<template>
    <div class="card">
        <div class="card-header">
           Email Schedule Management
        </div>
        <div class="card-body">
            <div class="row">
          <div class="col-lg-12 col-md-12">
            <router-link
              :to="{ name: 'email-add' }"
              class="btn btn-primary add-group-btn"
            >
              Add Email Schedule</router-link
            >
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="email in emails" :key="email._id">
                  <td>{{ email.name }}</td>
                  
                  <td>
                    <router-link
                      :to="{ name: 'email-edit', params: { id: email._id } }"
                      class="btn btn-success"
                      >Edit
                    </router-link>
                    
                    <button
                      @click.prevent="deleteEmail(email._id)"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
    </div>
</template>

<script>

// import axios from "axios";

export default {
    data() {
        return {
            emails:{}
        }
    },
    mounted() {
        let apiURL = "/email/"
        let token = localStorage.getItem("jwt");

    this.$http.get(apiURL,{
          headers: {
            Authorization: token,
          },
        }).then((res)=>{
          console.log(res);
          this.emails = res.data;
        }).catch(error => {
           console.log(error);
        }) 
    },
    methods: {
      deleteEmail(id){
        let token = localStorage.getItem("jwt");

      let apiURL = `/email/delete/${id}`;
      let indexOfArrayItem = this.emails.findIndex((i) => i._id === id);

      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        buttonsStyling: true,
      }).then((isConfirm) => {
        if (isConfirm.value === true) {
          this.$http
            .delete(apiURL, {
              headers: {
                Authorization: token,
              },
            })
            .then(() => {
              this.$swal("Info!", "Email Schedule has been deleted", "success");
              this.emails.splice(indexOfArrayItem, 1);
            })
            .catch((error) => {
              this.$swal({
                title: "Error!",
                text: "There something wrong!",
                icon: "error",
              });
              console.log(error);
            });
        }
      });
      }
    },
}
</script>

<style scoped>
.btn-success {
  margin-right: 10px;
}
.add-group-btn{
    float: right;
}
</style>