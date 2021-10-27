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
                v-model="$v.email.name.$model"
              />
              <div v-if="$v.email.name.$error">
                <div class="error" v-if="!$v.email.name.required">
                  Name is required
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Group</label>
              <select v-model="$v.email.groupId.$model" class="form-control">
                <option
                  v-for="group in groups"
                  v-bind:value="group.id"
                  v-bind:key="group.id"
                >
                  {{ group.name }}
                </option>
              </select>
              <div v-if="$v.email.groupId.$error">
                <div class="error" v-if="!$v.email.groupId.required">
                  Group is required
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Email Subject</label>
              <input
                type="text"
                class="form-control"
                v-model="$v.email.subject.$model"
                required
              />
              <div v-if="$v.email.groupId.$error">
                <div class="error" v-if="!$v.email.subject.required">
                  Subject is required
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Email Message</label>
              <textarea
                class="form-control"
                v-model="$v.email.message.$model"
                required
              />
              <div v-if="$v.email.message.$error">
                <div class="error" v-if="!$v.email.message.required">
                  Message is required
                </div>
              </div>
            </div>

            <div class="form-group mt-2">
              <label >Schedule</label>
              <div class="row mt-1 mb-1">
                <!-- <div class="col-2">
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
                </div> -->
                <div class="col-2">
                  <label for="">Minutes</label>
                  <select v-model="$v.time.min.$model" class="form-control">
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
                  <select v-model="$v.time.hour.$model" class="form-control">
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
                  <select v-model="$v.time.day.$model" class="form-control">
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
                  <select v-model="$v.time.month.$model" class="form-control">
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
                  <select v-model="$v.time.week.$model" class="form-control">
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

                <div v-if="$v.time.min.$error">
                  <div class="error" v-if="!$v.time.min.required">
                    Minutes required
                  </div>
                </div>

                <div v-if="$v.time.sec.$error">
                  <div class="error" v-if="!$v.time.sec.required">
                    Seconds required
                  </div>
                </div>

                <div v-if="$v.time.hour.$error">
                  <div class="error" v-if="!$v.time.hour.required">
                    Hour required
                  </div>
                </div>

                <div v-if="$v.time.day.$error">
                  <div class="error" v-if="!$v.time.day.required">
                    Day required
                  </div>
                </div>

                <div v-if="$v.time.month.$error">
                  <div class="error" v-if="!$v.time.month.required">
                    Month required
                  </div>
                </div>

                <div v-if="$v.time.week.$error">
                  <div class="error" v-if="!$v.time.week.required">
                    Week required
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <button class="btn btn-danger btn-block create-btn">
                Create
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
      email: {
        name: "",
        groupId: "",
        schedule: "",
        subject: "",
        message: "",
      },
      submitStatus: null,
      time: {
        sec: "01",
        min: "",
        day: "",
        week: "",
        month: "",
        hour: "",
      },
      groups: {},
      range: {
        min_sec: [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59",
          "60",
        ],
        hours: [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
        ],
        day: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
        month: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
    };
  },
  mounted() {
    let apiURL = "/group/";
    let token = localStorage.getItem("jwt");

      this.$http.get(apiURL, {
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
  validations: {
    email: {
      name: {
        required,
      },
      groupId: {
        required,
      },
      subject: {
        required,
      },
      message: {
        required,
      },
    },
    time: {
      sec: {
        required,
      },
      min: {
        required,
      },
      day: {
        required,
      },
      week: {
        required,
      },
      month: {
        required,
      },
      hour: {
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
        let apiURL = "/email/schedule-email";

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

        this.$http
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
      }
    },
  },
};
</script>

<style scoped>
.create-btn {
  margin: 0.5em;
}
</style>
