<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <v-icon outlined dark color="primary">
          mdi-plus-circle
        </v-icon> 
      </span>
    </template>
    <v-card>
      <v-card-title> Create Contract</v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="6" cols="12" sm="12" dense>
            <v-text-field
              label="Contract Value"
              dense
              outlined
              type="text"
              v-model="payload.value"
              :hide-details="!errors.value"
              :error-messages="errors && errors.value ? errors.value[0] : ''"
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="12" sm="12" dense>
            <DatePicker
              label="Contract Date"
              :default_date="payload.date"
              @date="
                (e) => {
                  payload.date = e;
                }
              "
            />
          </v-col>
          <v-col md="6" cols="12" sm="12" dense>
            <DatePicker
              label="Start Date"
              :default_date="payload.start_date"
              @date="
                (e) => {
                  payload.start_date = e;
                  createJobs(
                    payload.start_date,
                    payload.expire_date,
                    payload.visit_type_id
                  );
                }
              "
            />
          </v-col>
          <v-col md="6" cols="12" sm="12" dense>
            <DatePicker
              label="Expire Date"
              :default_date="payload.expire_date"
              @date="
                (e) => {
                  payload.expire_date = e;
                  createJobs(
                    payload.start_date,
                    payload.expire_date,
                    payload.visit_type_id
                  );
                }
              "
            />
          </v-col>
          <v-col md="6" cols="12" sm="12" dense>
            <v-select
              :items="AMCTypes"
              label="Type Of AMC"
              item-value="id"
              item-text="name"
              dense
              outlined
              v-model="payload.amc_type_id"
              :hide-details="!errors.amc_type_id"
              :error-messages="
                errors && errors.amc_type_id ? errors.amc_type_id[0] : ''
              "
            ></v-select>
          </v-col>
          <v-col md="6" cols="12" sm="12" dense>
            <v-select
              @change="
                createJobs(
                  payload.start_date,
                  payload.expire_date,
                  payload.visit_type_id
                )
              "
              :items="VisitTypes"
              item-value="id"
              item-text="name"
              label="Type Of Visit"
              dense
              outlined
              v-model="payload.visit_type_id"
              :hide-details="!errors.visit_type_id"
              :error-messages="
                errors && errors.visit_type_id ? errors.visit_type_id[0] : ''
              "
            ></v-select>
          </v-col>
          <!-- <v-col md="6" cols="12" sm="12" dense>
            <v-select
              :items="ServiceCallTypes"
              item-value="id"
              item-text="name"
              label="Type Of Service Call"
              dense
              outlined
              v-model="payload.service_call_type_id"
              :hide-details="!errors.service_call_type_id"
              :error-messages="
                errors && errors.service_call_type_id
                  ? errors.service_call_type_id[0]
                  : ''
              "
            ></v-select>
          </v-col> -->

          <v-col cols="12" md="3">
            <div class="text-center">
              <v-btn
                class="mt-2 primary"
                rounded
                style="width: 100%"
                small
                @click="onpick_attachment"
                >{{ !upload.name ? "Upload" : "Change" }}
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>

              <input
                required
                type="file"
                @change="attachment"
                style="display: none"
                accept="image/*"
                ref="attachment_input"
              />

              <span v-if="errors && errors.logo" class="text-danger mt-2">{{
                errors.logo[0]
              }}</span>
            </div>
          </v-col>

          <v-col cols="12" class="pt-5">
            <div>
              Total ({{ jobs.length }}) <b>Jobs</b> will be created based on
              contract start and expire date.
            </div>
            <v-card outlined>
              <table>
                <tr>
                  <th>Schedule Start {{ contract_id }}</th>
                  <th>Schedule End</th>
                </tr>
                <tr v-for="(job, index) in jobs" :key="index">
                  <td>{{ job.schedule_start_date }}</td>
                  <td>{{ job.schedule_end_date }}</td>
                </tr>
              </table>
            </v-card>
          </v-col>
          <v-col cols="12" class="text-right my-1">
            <v-btn small @click="dialog = false">Close</v-btn>
            <v-btn small :loading="loading" @click="submit" class="primary"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");
const hours = today.getHours().toString().padStart(2, "0");
const minutes = today.getMinutes().toString().padStart(2, "0");
const seconds = today.getSeconds().toString().padStart(2, "0");

const todayDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
export default {
  props: ["id"],

  data: () => ({
    contract_id: 0,
    todayDate,
    dialog: false,
    snackbar: false,
    loading: false,
    upload: {
      name: "",
    },
    payload: {},

    e1: 1,
    errors: [],

    AMCTypes: [],
    VisitTypes: [],
    ServiceCallTypes: [],
    jobs: [],
  }),
  created() {
    this.$axios.get(`amc_type_list`).then(({ data }) => {
      this.AMCTypes = data;
    });
    this.$axios.get(`visit_type_list`).then(({ data }) => {
      this.VisitTypes = data;
    });

    this.$axios.get(`service_call_type_list`).then(({ data }) => {
      this.ServiceCallTypes = data;
    });
  },
  methods: {
    getChunkSize(id) {
      let { name } = this.VisitTypes.find((e) => e.id == id);

      let types = {
        Monthly: 1,
        "On Call": 0,
        Quarterly: 3,
      };

      return types[name ?? "Monthly"];
    },
    getMonthList(sd, ed) {
      const months = [];
      let endDate = new Date(ed);
      let currentDate = new Date(sd);
      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
        const date = currentDate.getDate(); // Month is zero-based, so add 1
        months.push(
          `${year}-${month.toString().padStart(2, "0")}-${date
            .toString()
            .padStart(2, "0")}`
        );
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      return months;
    },
    createJobs(sd, ed, visiTypeId) {
      if (!sd || !ed || !visiTypeId) {
        this.jobs = [];
        return;
      }

      let chunkSize = this.getChunkSize(visiTypeId);

      if (chunkSize == 0) {
        this.jobs = [];
        return;
      }

      let months = this.getMonthList(sd, ed);

      this.jobs = [];

      for (let i = 0; i < months.length; i += chunkSize) {
        if (months.slice(i, i + chunkSize).length === chunkSize) {
          let current = months.slice(i, i + chunkSize);
          const givenDate = new Date(current.at(-1));
          const year = givenDate.getFullYear();
          const month = givenDate.getMonth() + 1; // Month is zero-based, so add 1
          const lastDate = new Date(year, month, 0); // Create a date for the last day of the given month
          const lastDateOfMonth = lastDate.getDate(); // Get the last date of the given month
          const schedule_start_date = current.at(0);
          const schedule_end_date = `${year}-${month
            .toString()
            .padStart(2, "0")}-${lastDateOfMonth.toString().padStart(2, "0")}`;
          this.jobs.push({
            contract_id: this.contract_id,
            schedule_start_date,
            schedule_end_date,
            prority_id: 1,
            status: "pending",
            date: this.todayDate,
          });
        }
      }
    },
    onpick_attachment() {
      this.$refs.attachment_input.click();
    },

    attachment(e) {
      this.upload.name = e.target.files[0] || "";

      let input = this.$refs.attachment_input;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          // this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },

    submit() {
      let payload = new FormData();

      if (this.payload.date) {
        payload.append("date", this.payload.date);
      }

      if (this.payload.start_date) {
        payload.append("start_date", this.payload.start_date);
      }

      if (this.payload.expire_date) {
        payload.append("expire_date", this.payload.expire_date);
      }

      if (this.payload.amc_type_id) {
        payload.append("amc_type_id", this.payload.amc_type_id);
      }

      if (this.payload.visit_type_id) {
        payload.append("visit_type_id", this.payload.visit_type_id);
      }

      if (this.payload.service_call_type_id) {
        payload.append(
          "service_call_type_id",
          this.payload.service_call_type_id
        );
      }

      if (this.payload.value) {
        payload.append("value", this.payload.value);
      }

      if (this.upload.name) {
        payload.append("attachment", this.upload.name);
      }

      payload.append("status", 1);
      payload.append("company_id", this.id);

      this.$axios
        .post("/contract", payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
            return;
          }

          if (!this.jobs.length) {
            this.errors = [];
            this.$emit("success");
            this.dialog = false;
            return;
          }

          this.processServiceCalls(data.record.id);
        })
        .catch(({ response }) => this.handleErrorResponse(response));
    },
    processServiceCalls(contract_id) {
      this.jobs = this.jobs.map((e) => ({
        ...e,
        contract_id,
      }));

      this.$axios
        .post("/service_call_bulk_store", this.jobs)
        .then(({ data }) => {
          this.$emit("success");
          this.dialog = false;
        })
        .catch((e) => console.log(e));
    },

    handleErrorResponse(response) {
      this.loading = false;
      if (!response) {
        this.$emit("error", "An unexpected error occurred.");
        return;
      }
      let { status, data, statusText } = response;

      if (status && status == 422) {
        this.errors = data.errors;
        return;
      }

      this.$emit("error", statusText);
    },
  },
};
</script>
<style scoped>
@import url("../../assets/tableStyles.css");
</style>
