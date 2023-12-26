<template>
  <v-dialog persistent v-model="dialog" width="900">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-eye </v-icon>
        View
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
                    <v-menu
                      readonly
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
                          :hide-details="true"
                          v-model="payload.member_from"
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
                        v-model="payload.member_from"
                        no-title
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col md="6" cols="12" sm="12" dense>
                    <v-menu
                      readonly
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
                          :hide-details="true"
                          v-model="payload.expiry"
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
                        v-model="payload.expiry"
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
                      v-model="payload.email"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn small @click="dialog = false">Close</v-btn>
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
                <v-menu
                  readonly
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
                      :hide-details="true"
                      v-model="payload.trade_license.issue_date"
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
                    v-model="payload.trade_license.issue_date"
                    no-title
                    @input="dateMenu3 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col md="6" cols="12" sm="12" dense>
                <v-menu
                  readonly
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
                      :hide-details="true"
                      v-model="payload.trade_license.expiry_date"
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
                    v-model="payload.trade_license.expiry_date"
                    no-title
                    @input="dateMenu4 = false"
                  ></v-date-picker>
                </v-menu>
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
                <v-btn small @click="dialog = false">Close</v-btn>
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
                <v-row v-for="(user, index) in item.users" :key="index">
                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Person Name"
                      dense
                      outlined
                      type="text"
                      v-model="user.name"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>

                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Person Number"
                      dense
                      outlined
                      type="text"
                      v-model="user.number"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>

                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Position"
                      dense
                      outlined
                      type="text"
                      v-model="user.position"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>

                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Whatsapp"
                      dense
                      outlined
                      type="text"
                      v-model="user.whatsapp"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>

                  <v-col md="6" cols="12" sm="12" dense>
                    <v-text-field
                      label="Email"
                      dense
                      outlined
                      type="text"
                      v-model="user.email"
                      :hide-details="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn small @click="dialog = false">Close</v-btn>
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
                  :hide-details="true"
                ></v-text-field>
              </v-col>
              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="Lon"
                  dense
                  outlined
                  type="text"
                  v-model="payload.lon"
                  :hide-details="true"
                ></v-text-field>
              </v-col>
              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="Makani Number"
                  dense
                  outlined
                  type="text"
                  v-model="payload.makani_number"
                  :hide-details="true"
                ></v-text-field>
              </v-col>
              <v-col md="6" cols="12" sm="12" dense>
                <v-textarea
                  rows="1"
                  label="Location"
                  dense
                  outlined
                  type="text"
                  v-model="payload.address"
                  :hide-details="true"
                ></v-textarea>
              </v-col>
              <v-col md="6" cols="12" sm="12" dense>
                <v-text-field
                  label="GPS Location"
                  dense
                  outlined
                  type="text"
                  v-model="payload.location"
                  :hide-details="true"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn small @click="dialog = false">Close</v-btn>
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
    dateMenu: false,
    dateMenu2: false,
    dateMenu3: false,
    dateMenu4: false,

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
  },
};
</script>
