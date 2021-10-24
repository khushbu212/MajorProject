<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div class="card">
        <div class="card-header">Create Email</div>
        <div class="card-body">
          <form @submit.prevent="handleSubmitForm">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                v-model="email.name"
                required
              />
            </div>
            <div class="form-group">
              <label>Group</label>
              <select v-model="email.groupId" class="form-control">
                <option
                  v-for="group in groups"
                  v-bind:value="group.id"
                  v-bind:key="group.id"
                >
                  {{ group.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Email Subject</label>
              <input
                type="text"
                class="form-control"
                v-model="email.subject"
                required
              />
            </div>

            <div class="form-group">
              <label>Email Message</label>
              <textarea class="form-control" v-model="email.message" required />
            </div>

            <div class="form-group">
              <label>Schedule</label>
              <div class="row">
                <div class="col-2">
                  <label for="">Seconds</label>
                  <select v-model="time.sec" class="form-control">
                    <option
                      v-for="num in range.min_sec"
                      v-bind:value="num"
                      v-bind:key="num"
                    >
                      {{ num }}
                    </option>
                    <option value="*">Every Second</option>
                  </select>
                </div>
                <div class="col-2">
                  <label for="">Minutes</label>
                  <select v-model="time.min" class="form-control">
                    <option
                      v-for="num in range.min_sec"
                      v-bind:value="num"
                      v-bind:key="num"
                    >
                      {{ num }}
                    </option>
                    <option value="*">Every Minute</option>
                  </select>
                </div>
                <div class="col-2">
                  <label for="">Hour</label>
                  <select v-model="time.hour" class="form-control">
                    <option
                      v-for="num in range.hours"
                      v-bind:value="num"
                      v-bind:key="num"
                    >
                      {{ num }}
                    </option>
                    <option value="*">Every hour</option>
                  </select>
                </div>
                <div class="col-2">
                  <label for="">Day</label>
                  <select v-model="time.day" class="form-control">
                    <option
                      v-for="num in range.day"
                      v-bind:value="num"
                      v-bind:key="num"
                    >
                      {{ num }}
                    </option>
                    <option value="*">Every Day</option>
                  </select>
                </div>
                <div class="col-2">
                  <label for="">Month</label>
                  <select v-model="time.month" class="form-control">
                    <option
                      v-for="num in range.month"
                      v-bind:value="num"
                      v-bind:key="num"
                    >
                      {{ num }}
                    </option>
                    <option value="*">Every month</option>
                  </select>
                </div>
                <div class="col-2">
                  <label for="">Day week</label>
                  <select v-model="time.week" class="form-control">
                    <option
                      v-for="num in range.week"
                      v-bind:value="num"
                      v-bind:key="num"
                    >
                      {{ num }}
                    </option>
                    <option value="*">Every Week</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <button class="btn btn-danger btn-block create-btn">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: {
        name: "",
        groupId: "",
        schedule: "",
        subject: "",
        message: "",
      },
      time: {
        sec: "",
        min: "",
        day: "",
        week: "",
        month: "",
        hour: "",
      },
      groups: {},
      range: {
        min_sec: [...Array(60)].map((_, i) => 0 + i * 1),
        hours: [...Array(24)].map((_, i) => 0 + i * 1),
        day: [...Array(31)].map((_, i) => 1 + i * 1),
        month: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
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
  
  methods: {
    handleSubmitForm() {
      let token = localStorage.getItem("jwt");
      let apiURL = "http://localhost:4000/email/schedule-email";

      this.email.schedule =
        this.time.sec +
        " " +
        this.time.min +
        " " +
        this.time.hour +
        " " +
        this.time.day +
        " " +
        this.time.month +
        " " +
        this.time.week;

      axios
        .post(apiURL, this.email, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          this.$router.push("/emails");
          this.email = {
            name: "",
            groupId: "",
            schedule: "",
            subject: "",
            message: "",
          };
          this.time = {
            sec: "",
            min: "",
            day: "",
            week: "",
            month: "",
            hour: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.create-btn {
  margin: 0.5em;
}
</style>
