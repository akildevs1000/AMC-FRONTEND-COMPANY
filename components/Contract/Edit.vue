<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-pencil </v-icon>
        Edit
      </span>
    </template>
    <v-card>
      <v-card-title>
        Edit Contract
        <v-chip
          class="mx-2"
          dark
          small
          :color="item.status == 1 ? `green` : `red`"
          >{{ item.status == 1 ? "Active" : "InActive" }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = false"
          ><v-icon color="primary">mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-title>
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
          <v-col md="12" cols="12" sm="12" dense>
            <v-row no-gutters>
              <v-col cols="1">
                <div class="pt-5">Status</div>
              </v-col>
              <v-col cols="11">
                <v-switch
                  v-model="payload.status"
                  :hide-details="!errors.status"
                  :error-messages="
                    errors && errors.status ? errors.status[0] : ''
                  "
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
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
  props: ["id", "item"],
  data: () => ({
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
  }),
  created() {
    this.payload = this.item;
    this.$axios.get(`amc_type_list`).then(({ data }) => {
      this.AMCTypes = data;
    });
    this.$axios.get(`visit_type_list`).then(({ data }) => {
      this.VisitTypes = data;
    });
    // this.$axios.get(`service_call_type_list`).then(({ data }) => {
    //   this.ServiceCallTypes = data;
    // });
  },
  methods: {
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
      payload.append("date", this.payload.date);
      payload.append("start_date", this.payload.start_date);
      payload.append("expire_date", this.payload.expire_date);
      payload.append("amc_type_id", this.payload.amc_type_id);
      payload.append("visit_type_id", this.payload.visit_type_id);
      // payload.append("service_call_type_id", this.payload.service_call_type_id);
      payload.append("value", this.payload.value);
      if (this.upload.name) {
        payload.append("attachment", this.upload.name);
      }
      payload.append("status", this.payload.status);

      this.$axios
        .post("/update-contract/" + this.payload.id, payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
            return;
          }

          this.errors = [];
          this.$emit("success");
          this.dialog = false;
          this.upload.name = null;
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
