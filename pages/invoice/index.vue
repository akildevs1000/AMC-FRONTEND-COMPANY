<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="color">
        {{ response }}
      </v-snackbar>
    </div>
    <div v-if="!loading">
      <InvoiceV1Preview ref="PreviewRef" :payload="currentItem" />

      <v-container>
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
          <template v-slot:top>
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
                title="Create Invoice"
                @click="() => $router.push(`/invoice/create`)"
              >
                Create Invoice
                <v-icon right dark>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.company="{ item, index }">
            <v-card
              elevation="0"
              style="background: none"
              class="d-flex align-center"
            >
              <!-- <v-avatar class="mr-1">
                <img
                  :src="
                    item.company && item.company.logo
                      ? item.company.logo
                      : '/no-image.png'
                  "
                  alt="Avatar"
                />
              </v-avatar> -->
              <div class="mt-2">
                <strong> {{ item.company && item.company.name }}</strong>
                <p>{{ item.company && item.company.address }}</p>
              </div>
            </v-card>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              class="mx-2"
              dark
              small
              :color="getRelationStatus(item.status)"
              >{{ item.status }}</v-chip
            >
          </template>
          <template v-slot:item.invoice_number="{ item }">
            <p
              class="blue--text"
              style="cursor: pointer"
              @click="() => $router.push(`/invoice/single/${item.id}`)"
            >
              {{ item.invoice_number }}
            </p>
          </template>
          <template v-slot:item.description="{ item }">
            <ReadMore :text="item.description" />
          </template>

          <template v-slot:item.options="{ item }">
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark-2 icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list width="175" dense>
                <v-list-item
                  @click="
                    () => {
                      ($refs.PreviewRef.dialog = true), (currentItem = item);
                    }
                  "
                >
                  <v-list-item-title>
                    <v-icon color="secondary" small> mdi-eye </v-icon>
                    View
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <InvoiceV1SinglePrint
                      iconColor="black"
                      :key="getRandomId()"
                      :item="item"
                    />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="`/invoice/${item.id}`">
                  <v-list-item-title>
                    <v-icon small color="black">mdi-pencil</v-icon> Edit
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="`/invoice/clone/${item.id}`">
                  <v-list-item-title>
                    <v-icon small color="black">mdi-content-duplicate</v-icon>
                    Clone
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table></v-container
      >
    </div>
    <Preloader v-else />
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    currentItem: {},
    dialog: false,
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
    Model: "Invoice",
    endpoint: "invoice",
    snackbar: false,
    loading: false,
    response: "",
    data: [],
    errors: [],
    id: 30,
    headers: require("../../headers/invoice.json"),
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
        key: "invoice",
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
