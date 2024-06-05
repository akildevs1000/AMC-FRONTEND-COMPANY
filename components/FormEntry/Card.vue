<template>
  <v-card elevation="0">
    <v-data-table
      dense
      :headers="headers"
      :items="data"
      :loading="loading"
      :options.sync="options"
      class="elevation-1"
      :server-items-length="totalRowsCount"
      hide-default-footer
    >
      <template v-slot:item.customer="{ item }">
        <v-chip v-if="!item.customer_sign" dark small class="blue"
          >Pending</v-chip
        >
        <div v-else>
          <div>{{ item.customer_name }}</div>
          <small>{{ item.customer_phone ?? "0553303991" }}</small>
        </div>
      </template>
      <template v-slot:item.company="{ item }">
        <v-card v-if="item.company" elevation="0" class="d-flex align-center">
          <div class="mt-1">
            {{ item.company && item.company.name }}
            <br />
            <small>{{ item.company && item.company.address }}</small>
          </div>
        </v-card>
      </template>
    </v-data-table>
    <div
      :class="`primary white--text text-center`"
      style="cursor: pointer"
      @click="$router.push(`/form_entry`)"
    >
      View all <v-icon small class="white--text">mdi-arrow-right</v-icon>
    </div>
  </v-card>
</template>

<script>
export default {
  components: {},

  data: () => ({
    backendUrl: process.env.BACKEND_URL,
    totalRowsCount: 0,
    filters: {
      per_page: 5,
    },
    loading: true,
    options: {},
    Model: "Reports",
    endpoint: "form_entry",
    data: [],
    errors: [],
    companies: [],
    equipmentCategoryList: [],
    technicians: [],
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
      {
        text: "Created Date",
        align: "left",
        sortable: true,
        key: "date",
        value: "date",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Job Type",
        align: "left",
        sortable: true,
        key: "work_type",
        value: "work_type",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Equipment Category",
        align: "left",
        sortable: true,
        key: "equipment_category.name",
        value: "equipment_category.name",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Technician",
        align: "left",
        sortable: true,
        key: "technician.name",
        value: "technician.name",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Signed By",
        align: "left",
        sortable: true,
        key: "customer",
        value: "customer",
        filterable: true,
        filterSpecial: false,
      },
    ],
  }),

  async created() {
    this.$axios
      .get("/amc_company_list")
      .then(({ data }) => (this.companies = data));

    this.$axios.get(`equipmentCategoryList`).then(({ data }) => {
      this.equipmentCategoryList = data;
    });

    this.$axios
      .get("/technician_list")
      .then(({ data }) => (this.technicians = data));

    this.getDataFromApi();
    //this.getDepartments(options);
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
    openNewTab(url) {
      // $router.push(`/amc/print/${item.id}`);
      window.open(url, "_blank");
    },
    sendEmail() {
      console.log(`mail to be sent`);
    },
    exportCSV() {
      if (this.totalRowsCount === 0) {
        alert("No record to download");
        return;
      }

      const csvData = this.generateCSVData();
      this.downloadCSV(csvData);
    },

    generateCSVData() {
      const csvHeader =
        "Company,Date,Job Type,Equipment Category,Technician,Summary\n";
      const csvRows = this.data.map(
        (e) =>
          `${
            e.work_type == "amc"
              ? e.amc.contract.company.name
              : e.ticket.company.name
          },${e.date},${e.work_type},${e.equipment_category.name},${
            e.technician.name
          },${e.summary}\n`
      );

      return csvHeader + csvRows.join("");
    },

    downloadCSV(csvData) {
      const csvBlob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      const csvUrl = URL.createObjectURL(csvBlob);

      const downloadLink = document.createElement("a");
      downloadLink.href = csvUrl;
      downloadLink.download = "download.csv";

      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);

      // Clean up URL.createObjectURL resources
      URL.revokeObjectURL(csvUrl);
    },
    reload() {
      this.filters = {};
      this.getDataFromApi();
    },
    filterAttr({ from, to }) {
      this.filters = {
        ...this.filters,
        from,
        to,
      };
      this.getDataFromApi();
    },
    statusRelatedColor(value) {
      let color = {
        completed: "green",
        pending: "red",
      };
      return color[value];
    },
    async getDataFromApi() {
      console.log(this.filters);
      // return;
      this.loading = true;
      const data = await this.$store.dispatch("fetchData", {
        key: "amc_reports",
        options: this.options,
        refresh: true,
        endpoint: this.endpoint,
        filters: this.filters,
      });

      this.data = data.data;
      this.totalRowsCount = data.total;
      this.loading = false;
    },
  },
};
</script>
