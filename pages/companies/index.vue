<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="`background`">
        {{ response }}
      </v-snackbar>
    </div>
    <v-card elevation="0" class="mt-2">
      <v-toolbar class="mb-2" dense flat>
        <v-toolbar-title>
          <span> {{ Model }} </span></v-toolbar-title
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
            <v-icon class="ml-2" @click="getDataFromApi" dark
              >mdi mdi-reload</v-icon
            >
          </v-btn>
        </span>
        <v-spacer />
        <AMCCompanyCreate
          @success="
            (e) => handleSuccessResponse(`Company Successfully created`)
          "
        />
      </v-toolbar>
      <v-data-table
        dense
        :headers="headers"
        :items="data"
        model-value="data.id"
        :loading="loading"
        :options.sync="options"
        :footer-props="{
          itemsPerPageOptions: [100, 500, 1000],
        }"
        class="elevation-1"
        :server-items-length="totalRowsCount"
      >
        <template v-slot:item.logo="{ item }">
          <div class="d-flex">
            <!-- <div class="ma-2">
              <v-avatar size="50">
                <img
                  :src="item.logo ? item.logo : '/no-image.png'"
                  alt="Avatar"
                />
              </v-avatar>
            </div> -->
            <div class="pt-3">
              <strong> {{ item.name }}</strong>
              <p>{{ item.address }}</p>
            </div>
          </div>
        </template>

        <template v-slot:item.contact="{ item, index }">
          <div>
            {{ item.company_contact.name }}
          </div>
          <div>
            {{ item.company_contact.number }}
          </div>
          <div>
            {{ item.company_contact.email }}
          </div>
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
                  <AMCCompanySingle :key="getRandomId()" :item="item" />
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <AMCCompanyEdit
                    :key="getRandomId()"
                    :item="item"
                    @success="
                      (e) => handleSuccessResponse(`Record has been updated`)
                    "
                  />
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    totalRowsCount: 0,
    filters: {},
    loading: true,
    displayErrormsg: false,
    response: "",
    snackbar: false,
    btnLoader: false,
    options: {},
    Model: "Companies",
    endpoint: "amc_company",
    snackbar: false,
    response: "",
    data: [],
    headers: require("../../menus/amc_company.json"),
  }),

  async created() {
    

    this.getDataFromApi();
  },
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
    getDataFromApi(url = this.endpoint) {
      this.loading = true;

      let { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let options = {
        params: {
          page: page,
          sortBy: sortBy ? sortBy[0] : "",
          sortDesc: sortDesc ? sortDesc[0] : "",
          per_page: itemsPerPage,
          ...this.filters,
        },
      };

      this.$axios.get(url, options).then(({ data }) => {
        this.data = data.data;

        this.totalRowsCount = data.total;

        this.data.length == 0
          ? (this.displayErrormsg = true)
          : (this.displayErrormsg = false);

        this.loading = false;
      });
    },
    handleSuccessResponse(message) {
      this.snackbar = true;
      this.response = message;
      this.getDataFromApi();
    },
  },
};
</script>
