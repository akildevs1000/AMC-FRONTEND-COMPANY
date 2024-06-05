<template>
  <div>
    <v-card>
      <v-card-title
        >{{ Model }}
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
        <v-spacer />
        <!-- <v-avatar color="blue" class="white--text" dark
              >05</v-avatar
            > -->
        <v-icon color="primary" @click="$router.push(`/companies`)"
          >mdi-eye</v-icon
        >
      </v-card-title>
      <v-card-text>
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
          class="elevation-0"
          :server-items-length="totalRowsCount"
        >
          <template v-slot:item.logo="{ item }">
            <div class="d-flex">
              <div class="ma-2">
                <v-avatar size="50">
                  <img
                    :src="item.logo ? item.logo : '/no-image.png'"
                    alt="Avatar"
                  />
                </v-avatar>
              </div>
              <div class="pt-3">
                <strong> {{ item.name }}</strong>
                <p>{{ item.address }}</p>
              </div>
            </div>
          </template>

          <template v-slot:item.contact="{ item, index }">
            <div>
              {{ item?.company_contact?.name }}
            </div>
            <div>
              {{ item?.company_contact?.number }}
            </div>
            <div>
              {{ item?.company_contact?.email }}
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    totalRowsCount: 0,
    filters: {},
    loading: false,
    displayErrormsg: false,
    response: "",
    snackbar: false,
    btnLoader: false,
    options: {},
    Model: "Companies",
    endpoint: "amc_company",
    data: [],
    headers: [
      {
        text: "Company",
        align: "left",
        sortable: true,
        key: "logo",
        value: "logo",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Name/Phone/Email",
        align: "left",
        sortable: true,
        key: "contact",
        value: "contact",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Since",
        align: "left",
        sortable: true,
        key: "member_from",
        value: "show_member_from",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Expiry",
        align: "left",
        sortable: true,
        key: "expiry",
        value: "show_expiry",
        filterable: true,
        filterSpecial: false,
      },
    ],
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
    getDataFromApi() {
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

      this.$axios.get(this.endpoint, options).then(({ data }) => {
        console.log(`then calling...`);
        console.log(this.endpoint, options);

        this.data = data.data;

        this.totalRowsCount = data.total;

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
