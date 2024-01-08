<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="color">
        {{ response }}
      </v-snackbar>
    </div>
    <div v-if="!loading">
      <v-toolbar class="mb-2" dense flat>
        <v-toolbar-title>
          <span> {{ Model }}s </span></v-toolbar-title
        >
        <span>
          <v-btn
            dense
            class="ma-0 px-0"
            x-small
            :ripple="false"
            text
            title="Reload"
          >
            <v-icon class="ml-2" @click="clearFilters" dark
              >mdi mdi-reload</v-icon
            >
          </v-btn>
        </span>
        <!-- <span>
            <v-btn
              dense
              class="ma-0 px-0"
              x-small
              :ripple="false"
              text
              title="Filter"
            >
              <v-icon @click="toggleFilter" class="mx-1 ml-2"
                >mdi mdi-filter</v-icon
              >
            </v-btn>
          </span> -->

        <v-spacer></v-spacer>

        <ContractCreate
          :id="id"
          @success="
            (e) => handleSuccessResponse(`Contract Successfully created`)
          "
        />
      </v-toolbar>
      <v-container
        ><v-data-table
          dense
          :headers="headers"
          :items="data"
          :loading="loadinglinear"
          :options.sync="options"
          :footer-props="{
            itemsPerPageOptions: [100, 500, 1000],
          }"
          class="elevation-1"
          :server-items-length="totalRowsCount"
        >
          <template v-slot:item.attachment="{ item }">
            <ViewAttachment
              :key="getRandomId()"
              v-if="item.attachment"
              :src="item.attachment"
            />
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              class="mx-2"
              dark
              x-small
              :color="item.status == 1 ? `green` : `red`"
              >{{ item.status == 1 ? "Active" : "InActive" }}</v-chip
            >
          </template>

          <template v-slot:item.options="{ item }">
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark-2 icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list width="150" dense>
                <v-list-item>
                  <v-list-item-title>
                    <ContractSingle :key="getRandomId()" :item="item" />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <ContractEdit
                      :id="id"
                      :item="item"
                      @success="
                        (e) => handleSuccessResponse(`Record has been updated`)
                      "
                    />
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template> </v-data-table
      ></v-container>
    </div>
    <Preloader v-else />
  </div>
</template>

<script>
export default {
  props: ["id"],
  data: () => ({
    totalRowsCount: 0,
    showFilters: false,
    filters: {},
    isFilter: false,
    loadinglinear: true,
    attrs: [],
    selectedFile: "",
    color: "background",
    response: "",
    upload: {
      name: "",
    },
    payload: {},
    options: {},
    Model: "Contract",
    endpoint: "contract",
    snackbar: false,
    loading: false,
    response: "",
    data: [],
    errors: [],
    headers: require("../../headers/contract.json"),
  }),

  async created() {
    this.loading = false;

    this.getDataFromApi();
    //this.getDepartments(options);
  },
  mounted() {},
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    getRandomId() {
      return Math.random().toString(36).substring(2);
    },
    priorityRelatedColor(value) {
      let color = {
        High: "red",
        Medium: "blue",
        Low: "grey",
      };
      return color[value];
    },

    statusRelatedColor(value) {
      let color = {
        Open: "green",
        "In Progress": "blue",
        Close: "grey",
      };
      return color[value];
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
      this.loadinglinear = true;

      this.filters.company_id = this.id;

      let json = {
        key: "contracts",
        options: this.options,
        refresh: true,
        endpoint: this.endpoint,
        filters: this.filters,
      };

      console.log(json);

      const data = await this.$store.dispatch("fetchData", json);

      this.data = data.data;
      this.totalRowsCount = data.total;
      this.loadinglinear = false;
    },
    handleSuccessResponse(message) {
      this.snackbar = true;
      this.response = message;
      this.getDataFromApi();
    },
  },
};
</script>
