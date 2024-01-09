<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-pencil </v-icon>
        Edit
      </span>
    </template>
    <v-card>
      <v-card-title> Edit Service Call </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="6" cols="12" sm="12" dense>
            <v-select
              :items="companies"
              item-text="name"
              item-value="id"
              label="Select Company/Customer"
              dense
              outlined
              v-model="payload.company_id"
              @change="getContracts(payload.company_id)"
              :hide-details="!errors.company_id"
              :error-messages="
                errors && errors.company_id ? errors.company_id[0] : ''
              "
            ></v-select>
          </v-col>

          <v-col md="6" cols="12" sm="12" dense>
            <v-select
              :items="contracts"
              :item-text="`date_range`"
              item-value="id"
              label="Select Contract"
              dense
              outlined
              v-model="payload.contract_id"
              :hide-details="!errors.contract_id"
              :error-messages="
                errors && errors.contract_id ? errors.contract_id[0] : ''
              "
            ></v-select>
          </v-col>

          <v-col md="6" cols="12" sm="12" dense>
            <DatePicker
              label="Schedule Start Date"
              :default_date="payload.schedule_start_date"
              @date="
                (e) => {
                  payload.schedule_start_date = e;
                }
              "
            />
          </v-col>

          <v-col md="6" cols="12" sm="12" dense>
            <DatePicker
              label="Schedule End Date"
              :default_date="payload.schedule_end_date"
              @date="
                (e) => {
                  payload.schedule_end_date = e;
                }
              "
            />
          </v-col>

          <v-col md="6" cols="12" sm="12" dense>
            <v-select
              :items="priorities"
              item-text="name"
              item-value="id"
              label="Prority"
              dense
              outlined
              v-model="payload.prority_id"
              :hide-details="!errors.prority_id"
              :error-messages="
                errors && errors.prority_id ? errors.prority_id[0] : ''
              "
            ></v-select>
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
export default {
  data: () => ({
    dialog: false,
    snackbar: false,
    response: "",
    preloader: false,
    loading: false,
    upload: {
      name: "",
    },
    payload: {},

    e1: 1,
    errors: [],
    previewImage: "/no-business_profile.png",

    companies: [],
    contracts: [],
    priorities: [],
  }),
  created() {
    this.preloader = false;

    this.$axios
      .get("/amc_company_list")
      .then(({ data }) => (this.companies = data));

    this.$axios
      .get("/priority_list")
      .then(({ data }) => (this.priorities = data));
  },
  methods: {
    getContracts(id) {
      this.$axios.get(`/contract_list/${id}`).then(
        ({ data }) =>
          (this.contracts = data.map((e) => ({
            id: e.id,
            date_range: `Contract (${e.start_date + " to " + e.expire_date})`,
          })))
      );
    },
    can(per) {
      return this.$pagePermission.can(per, this);
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
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },

    submit() {
      this.$axios
        .post("/service_call", this.payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
            return;
          }

          this.errors = [];
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
