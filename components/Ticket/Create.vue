<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span>
        <v-btn
          v-bind="attrs"
          v-on="on"
          dense
          small
          class="primary"
          text
          title="Create Community"
        >
          Create Ticket
          <v-icon right dark>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </span>
    </template>
    <v-card>
      <v-card-title> Create Ticket </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="6" cols="12" sm="12" dense>
            <v-text-field
              label="Title"
              dense
              outlined
              type="text"
              v-model="payload.title"
              :hide-details="!errors.title"
              :error-messages="errors && errors.title ? errors.title[0] : ''"
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="12" sm="12">
            <v-select
              :items="companies"
              item-text="name"
              item-value="id"
              label="Select Company/Customer"
              dense
              outlined
              v-model="payload.company_id"
              :hide-details="!errors.company_id"
              :error-messages="
                errors && errors.company_id ? errors.company_id[0] : ''
              "
            ></v-select>
          </v-col>
          <v-col md="12" cols="12" sm="12" dense>
            <v-textarea
              rows="4"
              label="Description"
              dense
              outlined
              type="text"
              v-model="payload.description"
              :hide-details="!errors.description"
              :error-messages="
                errors && errors.description ? errors.description[0] : ''
              "
            ></v-textarea>
          </v-col>
          <v-col md="6" cols="12" sm="12" dense>
            <v-select
              :items="priorities"
              item-text="name"
              item-value="id"
              label="Priority"
              dense
              outlined
              v-model="payload.priority_id"
              :hide-details="!errors.priority_id"
              :error-messages="
                errors && errors.priority_id ? errors.priority_id[0] : ''
              "
            ></v-select>
          </v-col>
          <v-col cols="12" md="12">
            <div class="text-">
              <!-- <v-img
                style="
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                  margin: 0 auto;
                "
                :src="previewImage"
              ></v-img> -->
              <v-btn
                rounded
                class="mt-2 primary"
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
  data: () => ({
    dateMenu: false,
    dateMenu2: false,
    dialog: false,
    snackbar: false,
    response: "",
    preloader: false,
    loading: false,
    upload: {
      name: "",
    },
    payload: {
      name: "",
      email: "",
      logo: "",
      member_from: "",
      expiry: "",
      no_branch: "",
      max_branches: "",
      max_employee: "",
      max_devices: "",
    },
    contact_payload: {
      name: "",
      number: "",
      position: "",
      whatsapp: "",
    },
    // location: "",
    geographic_payload: {
      location: "",
      lat: "",
      lon: "",
    },
    e1: 1,
    errors: [],
    previewImage: "/no-business_profile.png",
    companies: [],
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
      // this.loading = true;

      let payload = new FormData();

      payload.append("title", this.payload.title);
      payload.append("priority_id", this.payload.priority_id);
      payload.append("description", this.payload.description);
      payload.append("company_id", this.payload.company_id);
      payload.append("user_id", 0);
      payload.append("attachment", this.upload.name);

      this.$axios
        .post("/ticket", payload)
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
