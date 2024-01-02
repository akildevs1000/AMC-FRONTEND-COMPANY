<template>
  <div>
    <div class="text-center ma-5">
      <v-snackbar v-model="snackbar" top="top" color="secondary" elevation="24">
        {{ response }}
      </v-snackbar>
    </div>

    <v-navigation-drawer v-model="editDialog" bottom temporary right fixed>
      <v-toolbar class="popup_background" dense>
        {{ this.editedIndex == -1 ? "New " : "Edit " }} Device
        <v-spacer></v-spacer>

        <v-icon @click="editDialog = false" outlined dark>
          mdi mdi-close-circle
        </v-icon>
      </v-toolbar>
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
          <v-col md="12">
            <v-text-field
              v-model="payload.name"
              outlined
              dense
              label="Device Name *"
              :hide-details="!errors.name"
              :error-messages="errors && errors.name ? errors.name[0] : ''"
            ></v-text-field>
          </v-col>
          <v-col md="12">
            <v-text-field
              v-model="payload.brand_name"
              outlined
              dense
              label="Brand Name *"
              :hide-details="!errors.brand_name"
              :error-messages="
                errors && errors.brand_name ? errors.brand_name[0] : ''
              "
            ></v-text-field>
          </v-col>
          <v-col md="12">
            <v-text-field
              v-model="payload.model_number"
              outlined
              dense
              label="Model Number *"
              :hide-details="!errors.model_number"
              :error-messages="
                errors && errors.model_number ? errors.model_number[0] : ''
              "
            ></v-text-field>
          </v-col>
          <v-col md="12">
            <v-text-field
              v-model="payload.specification"
              outlined
              dense
              label="Specification *"
              :hide-details="!errors.specification"
              :error-messages="
                errors && errors.specification ? errors.specification[0] : ''
              "
            ></v-text-field>
          </v-col>
          <v-col md="12">
            <v-text-field
              v-model="payload.other"
              outlined
              dense
              label="Other *"
              :hide-details="!errors.other"
              :error-messages="errors && errors.other ? errors.other[0] : ''"
            ></v-text-field>
          </v-col>
          <v-col md="12">
            <v-text-field
              v-model="payload.software_version"
              outlined
              dense
              label="Software Version *"
              :hide-details="!errors.software_version"
              :error-messages="
                errors && errors.software_version
                  ? errors.software_version[0]
                  : ''
              "
            ></v-text-field>
          </v-col>

          <v-col md="12">
            <v-text-field
              v-model="payload.qty"
              outlined
              dense
              label="Qty *"
              :hide-details="!errors.qty"
              :error-messages="errors && errors.qty ? errors.qty[0] : ''"
            ></v-text-field>
          </v-col>

          <v-col md="12">
            <v-text-field
              v-model="payload.remarks"
              outlined
              dense
              label="Remarks *"
              :hide-details="!errors.remarks"
              :error-messages="
                errors && errors.remarks ? errors.remarks[0] : ''
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-btn small :loading="loading" color="primary" @click="submit">
                Submit
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-navigation-drawer>

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
    payload: {},
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
        text: "Name",
        align: "left",
        sortable: false,
        value: "name",
        filterable: false,
      },
      {
        text: "Brand Name",
        align: "left",
        sortable: false,
        value: "brand_name",
        filterable: false,
      },
      {
        text: "Model Number",
        align: "left",
        sortable: false,
        value: "model_number",
        filterable: false,
      },
      {
        text: "Specification",
        align: "left",
        sortable: false,
        value: "specification",
        filterable: false,
      },
      {
        text: "Other",
        align: "left",
        sortable: false,
        value: "other",
        filterable: false,
      },
      {
        text: "Software Version",
        align: "left",
        sortable: false,
        value: "software_version",
        filterable: false,
      },
      {
        text: "Qty",
        align: "left",
        sortable: false,
        value: "qty",
        filterable: false,
      },
      {
        text: "Remarks",
        align: "left",
        sortable: false,
        value: "remarks",
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
      this.payload = {};
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
          .catch((e) => console.log(e));
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
          .catch((e) => console.log(e));
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
