<template>
  <v-dialog persistent v-model="dialog" width="900">
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
          Create Company
          <v-icon right dark>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </span>
    </template>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>
          Company Info
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2" editable>
          License Info
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 3" step="3" editable>
          Contact Info
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" editable> Geographic Info </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col cols="12" md="3">
              <div class="text-center">
                <v-img
                  style="
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin: 0 auto;
                  "
                  :src="previewImage"
                ></v-img>
                <v-btn
                  class="mt-2"
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
            <v-col class="mt-3" md="9" sm="12" cols="12" dense>
              <v-row>
                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Company Name"
                    dense
                    outlined
                    type="text"
                    v-model="company_payload.name"
                    :hide-details="!errors.name"
                    :error-messages="
                      errors && errors.name ? errors.name[0] : ''
                    "
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Phone Number"
                    dense
                    outlined
                    type="text"
                    v-model="company_payload.contact_number"
                    :hide-details="!errors.contact_number"
                    :error-messages="
                      errors && errors.contact_number
                        ? errors.contact_number[0]
                        : ''
                    "
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Member From"
                        :hide-details="!errors.member_from"
                        :error-messages="
                          errors && errors.member_from
                            ? errors.member_from[0]
                            : ''
                        "
                        v-model="company_payload.member_from"
                        persistent-hint
                        append-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      style="min-height: 320px"
                      v-model="company_payload.member_from"
                      no-title
                      @input="dateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-menu
                    v-model="dateMenu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Expiry Date"
                        :hide-details="!errors.expiry"
                        :error-messages="
                          errors && errors.expiry ? errors.expiry[0] : ''
                        "
                        v-model="company_payload.expiry"
                        persistent-hint
                        append-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      style="min-height: 320px"
                      v-model="company_payload.expiry"
                      no-title
                      @input="dateMenu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Email"
                    dense
                    outlined
                    type="text"
                    v-model="company_payload.email"
                    :hide-details="!errors.email"
                    :error-messages="
                      errors && errors.email ? errors.email[0] : ''
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="text-right my-1">
              <v-btn small @click="dialog = false">Close</v-btn>
              <v-btn
                small
                :loading="loading"
                @click="submit_company"
                class="primary"
                >Next</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-row>
            <v-col cols="12" md="3">
              <div class="text-center">
                <v-img
                  style="
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin: 0 auto;
                  "
                  :src="previewImage"
                ></v-img>
                <v-btn
                  class="mt-2"
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
            <v-col class="mt-3" md="9" cols="12" sm="12" dense>
              <v-row>
                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="License Number"
                    dense
                    outlined
                    type="text"
                    v-model="license_payload.license_no"
                    :hide-details="!errors.license_no"
                    :error-messages="
                      errors && errors.license_no ? errors.license_no[0] : ''
                    "
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="TRN Number"
                    dense
                    outlined
                    type="text"
                    v-model="license_payload.trn_number"
                    :hide-details="!errors.trn_number"
                    :error-messages="
                      errors && errors.trn_number ? errors.trn_number[0] : ''
                    "
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-menu
                    v-model="dateMenu3"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Issue Date"
                        :hide-details="!errors.issue_date"
                        :error-messages="
                          errors && errors.issue_date
                            ? errors.issue_date[0]
                            : ''
                        "
                        v-model="license_payload.issue_date"
                        persistent-hint
                        append-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      style="min-height: 320px"
                      v-model="license_payload.issue_date"
                      no-title
                      @input="dateMenu3 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-menu
                    v-model="dateMenu4"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Expiry Date"
                        :hide-details="!errors.expiry_date"
                        :error-messages="
                          errors && errors.expiry_date
                            ? errors.expiry_date[0]
                            : ''
                        "
                        v-model="license_payload.expiry_date"
                        persistent-hint
                        append-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      style="min-height: 320px"
                      v-model="license_payload.expiry_date"
                      no-title
                      @input="dateMenu4 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Issue By"
                    dense
                    outlined
                    type="text"
                    v-model="license_payload.issued_by"
                    :hide-details="!errors.issued_by"
                    :error-messages="
                      errors && errors.issued_by ? errors.issued_by[0] : ''
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="text-right my-1">
              <v-btn small @click="e1 = 1">Back</v-btn>

              <v-btn
                small
                :loading="loading"
                @click="submit_license"
                class="primary"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-row>
            <v-col cols="12" md="3">
              <div class="text-center">
                <v-img
                  style="
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin: 0 auto;
                  "
                  :src="previewImage"
                ></v-img>
                <v-btn
                  class="mt-2"
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
            <v-col class="mt-3" md="9" cols="12" sm="12" dense>
              <v-row>
                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Person Name"
                    dense
                    outlined
                    type="text"
                    v-model="contact_payload.name"
                    :hide-details="!errors.name"
                    :error-messages="
                      errors && errors.name ? errors.name[0] : ''
                    "
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Person Number"
                    dense
                    outlined
                    type="text"
                    v-model="contact_payload.number"
                    :hide-details="!errors.number"
                    :error-messages="
                      errors && errors.number ? errors.number[0] : ''
                    "
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Position"
                    dense
                    outlined
                    type="text"
                    v-model="contact_payload.position"
                    :hide-details="!errors.position"
                    :error-messages="
                      errors && errors.position ? errors.position[0] : ''
                    "
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Whatsapp"
                    dense
                    outlined
                    type="text"
                    v-model="contact_payload.whatsapp"
                    :hide-details="!errors.whatsapp"
                    :error-messages="
                      errors && errors.whatsapp ? errors.whatsapp[0] : ''
                    "
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Email"
                    dense
                    outlined
                    type="text"
                    v-model="contact_payload.email"
                    :hide-details="!errors.email"
                    :error-messages="
                      errors && errors.email ? errors.email[0] : ''
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="text-right my-1">
              <v-btn small @click="e1 = 1">Back</v-btn>

              <v-btn
                small
                :loading="loading"
                @click="submit_contact"
                class="primary"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-row>
            <v-col cols="12" md="3">
              <div class="text-center">
                <v-img
                  style="
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin: 0 auto;
                  "
                  :src="previewImage"
                ></v-img>
                <v-btn
                  class="mt-2"
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
            <v-col class="mt-3" md="9" cols="12" sm="12" dense>
              <v-row>
                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Lat"
                    dense
                    outlined
                    type="text"
                    v-model="geographic_payload.lat"
                    :hide-details="!errors.lat"
                    :error-messages="errors && errors.lat ? errors.lat[0] : ''"
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Lon"
                    dense
                    outlined
                    type="text"
                    v-model="geographic_payload.lon"
                    :hide-details="!errors.lon"
                    :error-messages="errors && errors.lon ? errors.lon[0] : ''"
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-text-field
                    label="Makani Number"
                    dense
                    outlined
                    type="text"
                    v-model="geographic_payload.makani_number"
                    :hide-details="!errors.makani_number"
                    :error-messages="
                      errors && errors.makani_number
                        ? errors.makani_number[0]
                        : ''
                    "
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12" sm="12" dense>
                  <v-textarea
                    rows="1"
                    label="Location"
                    dense
                    outlined
                    type="text"
                    v-model="geographic_payload.address"
                    :hide-details="!errors.address"
                    :error-messages="
                      errors && errors.address ? errors.address[0] : ''
                    "
                  ></v-textarea>
                </v-col>

                <v-col md="12" cols="12" sm="12" dense>
                  <v-text-field
                    label="GPS Location"
                    dense
                    outlined
                    type="text"
                    v-model="geographic_payload.location"
                    :hide-details="!errors.location"
                    :error-messages="
                      errors && errors.location ? errors.location[0] : ''
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="text-right my-1">
              <v-btn small @click="e1 = 2">Back</v-btn>
              <v-btn
                small
                :loading="loading"
                @click="submit_geographic"
                class="primary"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dateMenu: false,
    dateMenu2: false,
    dateMenu3: false,
    dateMenu4: false,

    dialog: false,
    snackbar: false,
    response: "",
    preloader: false,
    loading: false,
    upload: {
      name: "",
    },
    company_payload: {},
    license_payload: {},
    contact_payload: {},
    geographic_payload: {},
    e1: 1,
    errors: [],
    previewImage: "/no-business_profile.png",
  }),
  created() {
    this.preloader = false;
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
    submit_company() {
      this.loading = true;
      this.errors = [];

      let payload = new FormData();

      payload.append("logo", this.upload.name);

      for (let key in this.company_payload) {
        payload.append(key, this.company_payload[key]);
      }

      this.$axios
        .post("/amc/building/validate", payload)
        .then(({ data }) => {
          this.license_payload.company_id = data.record.id;
          this.contact_payload.company_id = data.record.id;
          this.geographic_payload.company_id = data.record.id;
          this.loading = false;
          this.errors = [];
          this.e1 = 2;
        })
        .catch(({ response }) => this.handleErrorResponse(response));
    },
    submit_license() {
      this.loading = true;
      this.errors = [];

      this.$axios
        .post("/amc/license/validate", this.license_payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.e1 = 3;
          }
        })
        .catch(({ response }) => this.handleErrorResponse(response));
    },
    submit_contact() {
      this.loading = true;
      this.errors = [];

      this.$axios
        .post("/amc/contact/validate", this.contact_payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.e1 = 4;
          }
        })
        .catch(({ response }) => this.handleErrorResponse(response));
    },
    submit_geographic() {
      this.loading = true;
      this.errors = [];

      this.$axios
        .post("/amc/geographic/validate", this.geographic_payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.errors = [];
            this.$emit("success");
            this.dialog = false;
          }
        })
        .catch(({ response }) => this.handleErrorResponse(response));
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
