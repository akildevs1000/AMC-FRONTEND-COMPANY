<template>
  <div>
    <div class="text-center ma-5">
      <v-snackbar v-model="snackbar" top="top" color="secondary" elevation="24">
        {{ response }}
      </v-snackbar>
    </div>

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
        <EquipmentCreate :company_id="company_id" @response="handleResponse" />
      </v-toolbar>

      <v-container>
        <v-row>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(eqCId, i) in equipmentCategoryByCompanyId"
                :key="i"
              >
                <v-expansion-panel-header>
                  <b>{{ eqCId.name }}</b>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    dense
                    :headers="headers[eqCId.id]"
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

                    <template v-slot:item.controller="{ item, index }">
                      <div>{{ item.controller_brand }}</div>
                      <div>
                        <small>Qty: {{ item.controller_qty }}</small>
                        <br />
                        <small>Type: {{ item.controller_type }}</small>
                      </div>
                    </template>

                    <template v-slot:item.reader="{ item, index }">
                      <div>{{ item.reader }}</div>
                      <div>
                        <small>Qty: {{ item.reader_qty }}</small>
                        <br />
                        <small>Type: {{ item.reader_type }}</small>
                      </div>
                    </template>

                    <template v-slot:item.lock="{ item, index }">
                      <div>{{ item.lock }}</div>
                      <div>
                        <small>Qty: {{ item.lock_qty }}</small>
                        <br />
                        <small>Type: {{ item.lock_type }}</small>
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

                    <template v-slot:item.switch="{ item, index }">
                      <div>{{ item.exit_switch }}</div>
                      <div>
                        <small>Qty: {{ item.fire_switch }}</small>
                        <br />
                        <small>Specs: {{ item.remote }}</small>
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
                          <v-list-item>
                            <EquipmentEdit
                              :item="item"
                              @response="handleResponse"
                            />
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
  props: ["id", "company_id"],
  data: () => ({
    headers: require("../../headers/equipment.json"),
    filteredPayload: {},
    fieldsByType: require("../../menus/equipmentFields.json"),
    valid: false,
    popupDeviceId: null,
    editDialog: false,
    filters: {},
    isFilter: false,
    totalRowsCount: 0,
    snack: false,
    equipment_category_id: 3,
    payload: {
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
    editedIndex: -1,
    response: "",
    errors: [],
    editedItem: null,
    equipmentCategoryByCompanyId: [],
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
    },
  },
  close() {
    this.dialog = false;
    this.errors = [];
  },
  async created() {
    this.$axios.get(`equipmentCategoryList`).then(({ data }) => {
      this.equipmentCategoryList = data;
    });
    await this.getEquipmentCategoryByCompanyId();
    this.getDataFromApi();
  },

  methods: {
    async getEquipmentCategoryByCompanyId() {
      let { data } = await this.$axios.get(`equipmentCategoryByCompanyId`);

      this.equipmentCategoryByCompanyId = data[this.company_id];
    },
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
      this.filters.company_id = this.id;
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
    handleResponse(message) {
      this.snackbar = true;
      this.response = message;
      this.getDataFromApi();
      this.getEquipmentCategoryByCompanyId();
    },
    handleErrorResponse(response) {
      this.loading = false;
      if (!response) {
        return;
      }
      let { status, data } = response;

      if (status && status == 422) {
        this.errors = data.errors;
        return;
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
          .catch(({ response }) => {
            this.handleErrorResponse(response);
            this.loading = false;
          });
    },
  },
};
</script>
