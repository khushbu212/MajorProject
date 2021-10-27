<template>
    <div class="card">
        <div class="card-header">
           Groups Management
        </div>
        <div class="card-body">
            <div class="row">
          <div class="col-lg-12 col-md-12">
            <router-link
              :to="{ name: 'group-add' }"
              class="btn btn-primary add-group-btn"
            >
              Add Group</router-link
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
                <tr v-for="group in groups" :key="group._id">
                  <td>{{ group.name }}</td>
                  
                  <td>
                    <router-link
                      :to="{ name: 'group-edit', params: { id: group._id } }"
                      class="btn btn-success"
                      >Edit
                    </router-link>
                    
                    <button
                      @click.prevent="deleteGroup(group._id)"
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
            groups:{}
        }
    },
    mounted() {
        let apiURL = "/group/"
        let token = localStorage.getItem("jwt");

    this.$http.get(apiURL,{
          headers: {
            Authorization: token,
          },
        }).then((res)=>{
          console.log(res);
          this.groups = res.data;
        }).catch(error => {
           console.log(error);
        }) 
    },
    methods: {
      deleteGroup(id){
        let token = localStorage.getItem("jwt");

      let apiURL = `/group/delete/${id}`;
      let indexOfArrayItem = this.groups.findIndex((i) => i._id === id);

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
              this.$swal("Info!", "Group has been deleted", "success");
              this.groups.splice(indexOfArrayItem, 1);
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