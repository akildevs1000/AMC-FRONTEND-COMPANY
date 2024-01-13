<template>
  <v-dialog persistent v-model="dialog" width="1300">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-pencil </v-icon>
        Edit
      </span>
    </template>
    <v-card>
      <v-tabs color="primary">
        <v-tab>
          <v-icon> mdi-domain </v-icon>
        </v-tab>
        <v-tab>
          <v-icon> mdi-clipboard </v-icon>
        </v-tab>
        <v-tab>
          <v-icon> mdi-account </v-icon>
        </v-tab>
        <v-tab>
          <v-icon> mdi-earth </v-icon>
        </v-tab>
        <v-tab>
          <v-icon> mdi-file </v-icon>
        </v-tab>
        <v-tab>
          <v-icon> mdi-cellphone-text </v-icon>
        </v-tab>
        <v-tab>
          <v-icon> mdi-file-document </v-icon>
        </v-tab>
        <v-tab>
          <v-icon> mdi-cash </v-icon>
        </v-tab>
        <v-tab>
          <v-icon> mdi-cash-multiple </v-icon>
        </v-tab>
        <v-tab>
          <v-icon>mdi-clipboard</v-icon>
        </v-tab>
        <v-tab>
          <v-icon>mdi-clipboard-check</v-icon>
        </v-tab>

        <v-spacer></v-spacer>
        <v-tab @click="dialog = false">
          <v-icon> mdi-close-circle </v-icon>
        </v-tab>

        <v-tab-item>
          <v-container class="mt-5">
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
                      v-model="payload.name"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Phone Number"
                      dense
                      outlined
                      type="text"
                      v-model="payload.contact_number"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" cols="12" sm="12" dense>
                    <DatePicker
                      label="Member From"
                      :default_date="payload.member_from"
                      @date="
                        (e) => {
                          payload.member_from = e;
                        }
                      "
                    />
                  </v-col>

                  <v-col md="6" cols="12" sm="12" dense>
                    <DatePicker
                      label="Expiry Date"
                      :default_date="payload.expiry"
                      @date="
                        (e) => {
                          payload.expiry = e;
                        }
                      "
                    />
                  </v-col>
                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Email"
                      dense
                      outlined
                      type="text"
                      v-model="payload.email"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn small @click="updateCompany" class="primary"
                  >Update</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container class="mt-5">
            <v-row>
              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="License Number"
                  dense
                  outlined
                  type="text"
                  v-model="payload.trade_license.license_no"
                  :hide-details="true"
                ></v-text-field>
              </v-col>

              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="TRN Number"
                  dense
                  outlined
                  type="text"
                  v-model="payload.trade_license.trn_number"
                  :hide-details="true"
                ></v-text-field>
              </v-col>

              <v-col md="6" cols="12" sm="12" dense>
                <DatePicker
                  label="Issue Date"
                  :default_date="payload.trade_license.issue_date"
                  @date="
                    (e) => {
                      payload.trade_license.issue_date = e;
                    }
                  "
                />
              </v-col>

              <v-col md="6" cols="12" sm="12" dense>
                <DatePicker
                  label="Expiry Date"
                  :default_date="payload.trade_license.expiry_date"
                  @date="
                    (e) => {
                      payload.trade_license.expiry_date = e;
                    }
                  "
                />
              </v-col>

              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="Issued By"
                  dense
                  outlined
                  type="text"
                  v-model="payload.trade_license.issued_by"
                  :hide-details="true"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn small @click="updateLicense" class="primary"
                  >Update</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container class="mt-5">
            <v-row>
              <!-- <v-col cols="12" md="3">
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
                </div>
              </v-col> -->
              <v-col class="mt-3" md="12" sm="12" cols="12" dense>
                <v-row>
                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Person Name"
                      dense
                      outlined
                      type="text"
                      v-model="payload.company_contact.name"
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
                      v-model="payload.company_contact.number"
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
                      v-model="payload.company_contact.position"
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
                      v-model="payload.company_contact.whatsapp"
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
                      v-model="payload.company_contact.email"
                      :hide-details="!errors.email"
                      :error-messages="
                        errors && errors.email ? errors.email[0] : ''
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn small @click="updateContact" class="primary"
                  >Update</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container class="mt-5">
            <v-row>
              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="Lat"
                  dense
                  outlined
                  type="text"
                  v-model="payload.lat"
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
                  v-model="payload.lon"
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
                  v-model="payload.makani_number"
                  :hide-details="!errors.makani_number"
                  :error-messages="
                    errors && errors.makani_number
                      ? errors.makani_number[0]
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="Address"
                  dense
                  outlined
                  type="text"
                  v-model="payload.address"
                  :hide-details="!errors.address"
                  :error-messages="
                    errors && errors.address ? errors.address[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="GPS Location"
                  dense
                  outlined
                  type="text"
                  v-model="payload.location"
                  :hide-details="!errors.location"
                  :error-messages="
                    errors && errors.location ? errors.location[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn small @click="updateGeographic" class="primary"
                  >Update</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <AMCCompanyUpdateDocument
            @close-child="dialog = false"
            @child-success="handlSuccessReponse"
            :id="item.id"
            :items="item.company_documents"
          />
        </v-tab-item>

        <v-tab-item>
          <Equipment @close-child="dialog = false" :id="item.id" />
        </v-tab-item>
        <v-tab-item>
          <Contract @close-child="dialog = false" :id="item.id" />
        </v-tab-item>
        <v-tab-item>
          <Quotation @close-child="dialog = false" :id="item.id" />
        </v-tab-item>
        <v-tab-item>
          <Invoice @close-child="dialog = false" :id="item.id" />
        </v-tab-item>
        <v-tab-item>
          <ServiceCall @close-child="dialog = false" :id="item.id" />
        </v-tab-item>
        <v-tab-item>
          <FormEntryCompany @close-child="dialog = false" :id="item.id" />
        </v-tab-item>
        <v-tab-item>
          <v-container class="mt-5">
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
                      v-model="payload.name"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Phone Number"
                      dense
                      outlined
                      type="text"
                      v-model="payload.contact_number"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" cols="12" sm="12" dense>
                    <DatePicker
                      label="Member From"
                      :default_date="payload.member_from"
                      @date="
                        (e) => {
                          payload.member_from = e;
                        }
                      "
                    />
                  </v-col>

                  <v-col md="6" cols="12" sm="12" dense>
                    <DatePicker
                      label="Expiry Date"
                      :default_date="payload.expiry"
                      @date="
                        (e) => {
                          payload.expiry = e;
                        }
                      "
                    />
                  </v-col>
                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Email"
                      dense
                      outlined
                      type="text"
                      v-model="payload.email"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn small @click="updateCompany" class="primary"
                  >Update</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["item"],
  data: () => ({
    dialog: false,
    upload: { name: "" },
    errors: [],
    payload: {},
    previewImage: `/no-business_profile.png`,
  }),
  async created() {
    this.payload = this.item;

    if (this.item.logo) {
      this.previewImage = this.item.logo;
    }
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
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    updateCompany() {
      this.loading = true;

      let payload = new FormData();
      payload.append("name", this.payload.name);
      payload.append("contact_number", this.payload.contact_number);
      payload.append("email", this.payload.email);
      payload.append("member_from", this.payload.member_from);
      payload.append("expiry", this.payload.expiry);

      if (this.upload.name) {
        payload.append("logo", this.upload.name);
      }

      this.$axios
        .post(`amc/company/info/${this.payload.id}`, payload)
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
        .catch((e) => console.log(e));
    },
    updateLicense() {
      this.loading = true;
      this.$axios
        .put(`amc/company/license/${this.payload.trade_license.id}`, {
          license_no: this.payload.trade_license.license_no,
          trn_number: this.payload.trade_license.trn_number,
          issue_date: this.payload.trade_license.issue_date,
          expiry_date: this.payload.trade_license.expiry_date,
          issued_by: this.payload.trade_license.issued_by,
          company_id: this.payload.id,
        })
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
        .catch((e) => console.log(e));
    },
    updateContact() {
      this.loading = true;

      this.$axios
        .put(`amc/company/contact/${this.payload.company_contact.id}`, {
          name: this.payload.company_contact.name,
          number: this.payload.company_contact.number,
          position: this.payload.company_contact.position,
          whatsapp: this.payload.company_contact.whatsapp,
          email: this.payload.company_contact.email,
          company_id: this.payload.id,
        })
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
        .catch((e) => console.log(e));
    },
    updateGeographic() {
      this.loading = true;

      this.$axios
        .put(`amc/company/geographic/${this.payload.id}`, {
          lat: this.payload.lat,
          lon: this.payload.lon,
          makani_number: this.payload.makani_number,
          address: this.payload.address,
          location: this.payload.location,
          company_id: this.payload.id,
        })
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
        .catch((e) => console.log(e));
    },

    handlSuccessReponse() {
      this.dialog = false;
      this.$emit("success");
    },
  },
};
</script>
