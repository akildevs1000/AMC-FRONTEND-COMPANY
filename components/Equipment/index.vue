<template>
  <div>
    <div class="text-center ma-5">
      <v-snackbar v-model="snackbar" top="top" color="secondary" elevation="24">
        {{ response }}
      </v-snackbar>
    </div>

    <v-dialog v-model="editDialog" width="750">
      <v-card>
        <v-card-title dense>
          {{ this.editedIndex == -1 ? "New " : "Edit " }} Equipment
          <v-spacer></v-spacer>

          <v-icon @click="editDialog = false" outlined color="primary">
            mdi-close-circle-outline
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="ma-1">
              <v-col md="12">
                <v-autocomplete
                  class="pb-0"
                  v-model="payload.equipment_category_id"
                  :items="equipmentCategoryList"
                  dense
                  outlined
                  item-value="id"
                  item-text="name"
                  label="Select Category"
                  :hide-details="!errors.equipment_category_id"
                  :error-messages="
                    errors && errors.equipment_category_id
                      ? errors.equipment_category_id[0]
                      : ''
                  "
                >
                </v-autocomplete>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="payload.recorder_brand"
                  outlined
                  dense
                  label="Recorder *"
                  :hide-details="!errors.recorder_brand"
                  :error-messages="
                    errors && errors.recorder_brand
                      ? errors.recorder_brand[0]
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payload.recorder_qty"
                  outlined
                  dense
                  label="Qty *"
                  :hide-details="!errors.recorder_qty"
                  :error-messages="
                    errors && errors.recorder_qty ? errors.recorder_qty[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payload.recorder_capacity"
                  outlined
                  dense
                  label="HDD *"
                  :hide-details="!errors.recorder_capacity"
                  :error-messages="
                    errors && errors.recorder_capacity
                      ? errors.recorder_capacity[0]
                      : ''
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="payload.work_station"
                  outlined
                  dense
                  label="Work Station *"
                  :hide-details="!errors.work_station"
                  :error-messages="
                    errors && errors.work_station ? errors.work_station[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payload.work_station_qty"
                  outlined
                  dense
                  label="Qty *"
                  :hide-details="!errors.work_station_qty"
                  :error-messages="
                    errors && errors.work_station_qty
                      ? errors.work_station_qty[0]
                      : ''
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="payload.camera"
                  outlined
                  dense
                  label="Camera *"
                  :hide-details="!errors.camera"
                  :error-messages="
                    errors && errors.camera ? errors.camera[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payload.camera_qty"
                  outlined
                  dense
                  label="Qty *"
                  :hide-details="!errors.camera_qty"
                  :error-messages="
                    errors && errors.camera_qty ? errors.camera_qty[0] : ''
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="payload.monitor"
                  outlined
                  dense
                  label="Monitor *"
                  :hide-details="!errors.monitor"
                  :error-messages="
                    errors && errors.monitor ? errors.monitor[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payload.monitor_qty"
                  outlined
                  dense
                  label="Qty *"
                  :hide-details="!errors.monitor_qty"
                  :error-messages="
                    errors && errors.monitor_qty ? errors.monitor_qty[0] : ''
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="payload.ups"
                  outlined
                  dense
                  label="UPS *"
                  :hide-details="!errors.ups"
                  :error-messages="errors && errors.ups ? errors.ups[0] : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payload.ups_qty"
                  outlined
                  dense
                  label="Qty *"
                  :hide-details="!errors.ups_qty"
                  :error-messages="
                    errors && errors.ups_qty ? errors.ups_qty[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payload.ups_specs"
                  outlined
                  dense
                  label="Specs *"
                  :hide-details="!errors.ups_specs"
                  :error-messages="
                    errors && errors.ups_specs ? errors.ups_specs[0] : ''
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="payload.network"
                  outlined
                  dense
                  label="Network *"
                  :hide-details="!errors.network"
                  :error-messages="
                    errors && errors.network ? errors.network[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payload.network_qty"
                  outlined
                  dense
                  label="Qty *"
                  :hide-details="!errors.network_qty"
                  :error-messages="
                    errors && errors.network_qty ? errors.network_qty[0] : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payload.network_specs"
                  outlined
                  dense
                  label="Specs *"
                  :hide-details="!errors.network_specs"
                  :error-messages="
                    errors && errors.network_specs
                      ? errors.network_specs[0]
                      : ''
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="text-right">
                  <v-btn
                    small
                    :loading="loading"
                    color="primary"
                    @click="submit"
                  >
                    Submit
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card class="mb-5 mt-2" elevation="0">
      <v-toolbar class="rounded-md" dense flat>
        <v-toolbar-title><span> Equipment List</span></v-toolbar-title>

        <span>
          <v-btn
            dense
            class="ma-0 px-0"
            x-small
            :ripple="false"
            text
            title="Reload"
          >
            <v-icon class="ml-2" @click="getDataFromApi()" dark
              >mdi-reload</v-icon
            >
          </v-btn>
        </span>

        <v-spacer></v-spacer>

        <span>
          <v-btn
            x-small
            :ripple="false"
            text
            title="Add Device"
            @click="addItem()"
            color="primary"
          >
            <v-icon dark white>mdi-plus-circle</v-icon>
          </v-btn>
        </span>
      </v-toolbar>

      <v-container>
        <v-row>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(eqCId, i) in equipmentCategoryList"
                :key="i"
              >
                <v-expansion-panel-header>
                  <b>{{ eqCId.name }}</b>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    dense
                    :headers="headers"
                    :items="
                      data.filter((e) => e.equipment_category_id == eqCId.id)
                    "
                    model-value="data.id"
                    :loading="loading"
                    :footer-props="{
                      itemsPerPageOptions: [50, 100, 500, 1000],
                    }"
                    class="elevation-1 pt-5"
                    :options.sync="options"
                    :server-items-length="totalRowsCount"
                  >
                    <template v-slot:item.sno="{ item, index }">
                      {{ ++index }}
                    </template>

                    <template v-slot:item.recorder="{ item, index }">
                      <div>{{ item.recorder_brand }}</div>
                     <div>
                      <small>Qty: {{ item.recorder_qty }}</small>
                      <br />
                      <small>Capacity: {{ item.recorder_capacity }}</small>
                     </div>
                    </template>

                    <template v-slot:item.work_station="{ item, index }">
                      <div>{{ item.work_station }}</div>
                      <small>Qty: {{ item.work_station_qty }}</small>
                    </template>

                    <template v-slot:item.camera="{ item, index }">
                      <div>{{ item.camera }}</div>
                      <small>Qty: {{ item.camera_qty }}</small>
                    </template>

                    <template v-slot:item.monitor="{ item, index }">
                      <div>{{ item.monitor }}</div>
                      <small>Qty: {{ item.monitor_qty }}</small>
                    </template>

                    <template v-slot:item.ups="{ item, index }">
                      <div>{{ item.ups }}</div>
                      <div>
                        <small>Qty: {{ item.ups_qty }}</small>
                        <br />
                        <small>Specs: {{ item.ups_specs }}</small>
                      </div>
                    </template>

                    <template v-slot:item.network="{ item, index }">
                      <div>{{ item.network }}</div>
                      <div>
                        <small>Qty: {{ item.network_qty }}</small>
                        <br />
                        <small>Specs: {{ item.network_specs }}</small>
                      </div>
                    </template>

                    <template v-slot:item.options="{ item }">
                      <v-menu bottom left>
                        <template v-slot:activator="{ on, attrs }">
                          <div class="text-right">
                            <v-btn dark-2 icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </div>
                        </template>
                        <v-list width="120" dense>
                          <v-list-item @click="editItem(item)">
                            <v-list-item-title style="cursor: pointer">
                              <v-icon color="secondary" small>
                                mdi-pencil
                              </v-icon>
                              Edit
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="deleteItem(item)">
                            <v-list-item-title style="cursor: pointer">
                              <v-icon color="error" small> mdi-delete </v-icon>
                              Delete
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data: () => ({
    valid: false,
    popupDeviceId: null,
    editDialog: false,
    filters: {},
    isFilter: false,
    totalRowsCount: 0,
    snack: false,
    payload: {
      recorder_brand: "Placeat officia eum",
      recorder_qty: "532",
      recorder_capacity: "Hic ducimus ullam d",
      work_station: "Similique ipsam volu",
      work_station_qty: "102",
      camera: "Ut et voluptas animi",
      camera_qty: "93",
      monitor: "Minim porro tempora ",
      monitor_qty: "769",
      ups: "Fugit quidem labori",
      ups_qty: "46",
      ups_specs: "Natus enim possimus",
      network: "Earum ex qui expedit",
      network_qty: "161",
      network_specs: "Quis eum nesciunt e",
      equipment_category_id: 1,
      company_id: 0,
    },
    Model: "Equipment",
    options: {},
    endpoint: "equipment",
    snackbar: false,
    dialog: false,
    data: [],
    equipmentCategoryList: [],
    loading: false,
    total: 0,
    headers: [
      {
        text: "Sno",
        align: "left",
        sortable: false,
        value: "sno",
        filterable: false,
      },
      {
        text: "Recorder",
        align: "left",
        sortable: false,
        value: "recorder",
        filterable: false,
      },
      {
        text: "Work Station",
        align: "left",
        sortable: false,
        value: "work_station",
        filterable: false,
      },
      {
        text: "Camera",
        align: "left",
        sortable: false,
        value: "camera",
        filterable: false,
      },
      {
        text: "Monitor",
        align: "left",
        sortable: false,
        value: "monitor",
        filterable: false,
      },
      {
        text: "UPS",
        align: "left",
        sortable: false,
        value: "ups",
        filterable: false,
      },
      {
        text: "Network",
        align: "left",
        sortable: false,
        value: "network",
        filterable: false,
      },
      {
        text: "Options",
        align: "center",
        sortable: false,
        value: "options",
        filterable: false,
        filterSpecial: false,
      },
    ],
    editedIndex: -1,
    response: "",
    errors: [],
    editedItem: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Equipement" : "Edit Equipement";
    },
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    dialog(val) {
      val || this.close();
      this.errors = [];
    },
  },
  async created() {
    this.$axios.get(`equipmentCategoryList`).then(({ data }) => {
      this.equipmentCategoryList = data;
    });
    this.getDataFromApi();
  },

  methods: {
    caps(str) {
      if (str == "" || str == null) {
        return "---";
      } else {
        let res = str.toString();
        return res.replace(/\b\w/g, (c) => c.toUpperCase());
      }
    },
    onPageChange() {
      this.getDataFromApi();
    },
    applyFilters() {
      this.getDataFromApi();
    },
    toggleFilter() {
      // this.filters = {};
      this.isFilter = !this.isFilter;
    },
    clearFilters() {
      this.filters = {};

      this.isFilter = false;
      this.getDataFromApi();
    },
    async getDataFromApi() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchData", {
        key: "equipements",
        options: this.options,
        refresh: true,
        endpoint: this.endpoint,
        filters: this.filters,
      });
      this.data = data.data;
      this.totalRowsCount = data.total;
      this.loading = false;
    },

    editItem(item) {
      this.errors = [];
      this.payload = {};
      this.editedIndex = item.id;

      this.payload = Object.assign({}, item);

      this.popupDeviceId = item.device_id;

      this.editDialog = true;
    },
    addItem() {
      this.errors = [];

      this.editedIndex = -1;
      this.editDialog = true;
    },
    submit() {
      let id = this.editedIndex;
      let payload = this.payload;

      this.payload.company_id = this.id;

      this.loading = true;
      if (this.editedIndex == -1) {
        this.$axios
          .post(this.endpoint, payload)
          .then(({ data }) => {
            this.loading = false;
            if (!data.status) {
              this.errors = [];
              this.errors = data.errors;

              this.snackbar = true;
              this.response = data.message;
            } else {
              this.snackbar = true;
              this.response = "Device details are  Created successfully";
              this.getDataFromApi();
              this.editDialog = false;
            }
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });
      } else {
        this.$axios
          .put(`${this.endpoint}/${id}`, payload)
          .then(({ data }) => {
            this.loading = false;
            if (!data.status) {
              this.errors = data.errors;
            } else if (data.status == "device_api_error") {
              this.errors = [];
              this.snackbar = true;
              this.response = "Check the Device information. There are errors.";
            } else {
              this.snackbar = true;
              this.response = "Device details are  updated successfully";
              this.getDataFromApi();
              this.editDialog = false;
            }
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });
      }
    },

    deleteItem(item) {
      confirm(
        "Are you sure you wish to delete , to mitigate any inconvenience in future."
      ) &&
        this.$axios
          .delete(this.endpoint + "/" + item.id)
          .then(({ data }) => {
            if (!data.status) {
              this.errors = data.errors;
            } else {
              this.snackbar = data.status;
              this.response = data.message;
              this.getDataFromApi();
            }
          })
          .catch((err) => console.log(err));
    },
  },
};
</script>
