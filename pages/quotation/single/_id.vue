<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="color">
        {{ response }}
      </v-snackbar>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-toolbar flat>
            {{ Model }}s
            <v-icon color="black" @click="getDataFromApi">mdi-reload</v-icon>
            <v-row no-gutters class="mx-5">
              <v-col cols="2">
                <CompanyList
                  @id="
                    (e) => {
                      filters.company_id = e;
                      getDataFromApi();
                    }
                  "
                />
              </v-col>
            </v-row>
            <v-btn
              dense
              small
              class="primary"
              text
              title="Create Quotation"
              @click="() => $router.push(`/quotation/create`)"
            >
              Create Quotation
              <v-icon right dark>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-card elevation="1">
        <v-row>
          <v-col cols="3">
            <v-data-table
              dense
              :headers="headers"
              :items="data"
              :loading="loadinglinear"
              :options.sync="options"
              :footer-props="{
                itemsPerPageOptions: [10, 20, 50, 100, 500],
              }"
              class="elevation-1"
              :server-items-length="totalRowsCount"
            >
              <template v-slot:item.company="{ item, index }">
                <v-card
                  elevation="0"
                  style="background: none"
                  class="d-flex align-center"
                >
                  <v-row>
                    <v-col cols="6">
                      <strong> {{ item.company && item.company.name }}</strong>
                      <p @click="handleClick(item)" style="cursor: pointer">
                        <span class="blue--text">{{
                          item.quotation_number
                        }}</span>
                        | {{ item.date }}
                      </p>
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <strong> AED {{ item.total }}</strong>
                      <p>
                        {{ item.status }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="9" v-if="item.id">
            <v-container >
              <v-btn outlined dense :to="`/quotation/${item.id}`"
                ><v-icon small color="black">mdi-pencil</v-icon> Edit</v-btn
              >
              <v-btn outlined dense :to="`/quotation/clone/${item.id}`"
                ><v-icon small color="black">mdi-content-duplicate</v-icon>
                Clone</v-btn
              >
              <v-btn outlined dense :to="`/quotation/invoice/${item.id}`"
                ><v-icon small color="black">mdi-file-document</v-icon> Convert
                to Invoice</v-btn
              >
              <v-btn outlined dense>
                <QuotationV1SinglePrint :key="getRandomId()" :item="item" />
              </v-btn>
              <v-card class="pa-5 mt-2">
                <QuotationV1SinglePreviewCard
                  v-if="item && item.id"
                  :key="getRandomId()"
                  :payload="item"
                />
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
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
    Model: "Quotation",
    endpoint: "quotation",
    snackbar: false,
    loading: false,
    response: "",
    data: [],
    errors: [],
    id: 30,
    item: {},
    headers: [
      {
        text: "Company",
        align: "left",
        sortable: true,
        key: "company",
        value: "company",
        filterable: true,
        filterSpecial: false,
      },
    ],
  }),

  async created() {
    this.loading = false;
    this.$axios.get(`quotation/${this.$route.params.id}`).then(({ data }) => {
      this.item = data;
    });

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
    handleClick(item) {
      this.showCard = true;
      this.item = item;
    },
    getRelationStatus(status) {
      let statusses = {
        pending: "orange",
        submitted: "blue",
        approved: "green",
        cancelled: "red",
        invoiced: "primary",
      };

      return statusses[status];
    },
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

      let json = {
        key: "quotations",
        options: this.options,
        refresh: true,
        endpoint: this.endpoint,
        filters: this.filters,
      };

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
