<template>
  <v-card elevation="0">
    <v-row no-gutters class="mb-5">
      <v-col cols="1">
        <v-toolbar dense flat>
          <v-toolbar-title>Reports </v-toolbar-title>

          <v-icon @click="reload">mdi-reload</v-icon>
        </v-toolbar>
      </v-col>
      <v-col>
        <v-toolbar flat>
          <v-row>
            <v-col>
              <v-autocomplete
                clearable
                label="Select Company"
                dense
                outlined
                v-model="filters.company_id"
                :items="[{ id: ``, name: `Select All` }, ...companies]"
                item-value="id"
                item-text="name"
                :hide-details="true"
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-autocomplete
                label="Select Job Type"
                dense
                outlined
                v-model="filters.work_type"
                :items="[
                  { id: ``, name: `Select All` },
                  { id: `amc`, name: `AMC` },
                  { id: `ticket`, name: `Ticket` },
                ]"
                item-value="id"
                item-text="name"
                :hide-details="true"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                label="Select Equipment Category"
                dense
                outlined
                v-model="filters.equipment_category_id"
                :items="[
                  { id: ``, name: `Select All` },
                  ...equipmentCategoryList,
                ]"
                item-value="id"
                item-text="name"
                :hide-details="true"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                label="Select Technician"
                dense
                outlined
                v-model="filters.technician_id"
                :items="[{ id: ``, name: `Select All` }, ...technicians]"
                item-value="id"
                item-text="name"
                :hide-details="true"
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <CustomDateFilter
                @filter-attr="filterAttr"
                :defaultFilterType="1"
                height="40px"
              />
            </v-col>

            <v-col>
              <v-btn
                color="primary"
                label="Select Technician"
                dense
                @click="getDataFromApi()"
                >Generate</v-btn
              >
            </v-col>
          </v-row>
        </v-toolbar>
      </v-col>
      <!-- <v-col cols="12" class="text-right">
        <v-container>
          <v-btn class="ma-0" x-small :ripple="false" text title="PRINT">
            <img src="/icons/icon_print.png" class="iconsize" />
          </v-btn>
          <v-btn class="ma-0" x-small :ripple="false" text title="PDF">
            <img src="/icons/icon_pdf.png" class="iconsize" />
          </v-btn>
          <v-btn
            class="ma-0"
            x-small
            :ripple="false"
            text
            title="CSV"
            @click="exportCSV"
          >
            <img src="/icons/icon_excel.png" class="iconsize" />
          </v-btn>
        </v-container>
      </v-col> -->
    </v-row>
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
        <v-card
          v-if="item.work_type == 'amc'"
          elevation="0"
          style="background: none"
          class="d-flex align-center"
        >
          <!-- <v-avatar class="mr-1">
            <img
              :src="
                item.amc.contract.company && item.amc.contract.company.logo
                  ? item.amc.contract.company.logo
                  : '/no-image.png'
              "
              alt="Avatar"
            />
          </v-avatar> -->
          <div>
            <div>
              {{ item.amc.contract.company && item.amc.contract.company.name }}
            </div>
            <!-- <p>
              {{
                item.amc.contract.company && item.amc.contract.company.address
              }}
            </p> -->
          </div>
        </v-card>
        <v-card
          v-else-if="item.work_type == 'ticket'"
          elevation="0"
          style="background: none"
          class="d-flex align-center"
        >
          <div class="mt-2">
            <strong>
              {{ item.ticket.company && item.ticket.company.name }}</strong
            >
            <p>
              {{ item.ticket.company && item.ticket.company.address }}
            </p>
          </div>
        </v-card>
      </template>

      <template v-slot:item.summary="{ item }">
        <ReadMore :text="item.summary" />
      </template>

      <template v-slot:item.service_call="{ item }">
        Reference Id: {{ item.service_call_id }}
      </template>

      <template v-slot:item.photos="{ item }">
        <div v-if="item.checklist">
          <ViewMultiplePhotos
            label="Photos"
            :form_entry_id="item.id"
            :photos="item.checklist.checklist"
          />
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
            <template v-if="item.work_type == 'amc'">
              <v-list-item>
                <v-list-item-title @click="openNewTab(`/amc/print/${item.id}`)">
                  <v-icon>mdi-printer</v-icon> Print
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  @click="
                    openNewTab(`${backendUrl}/form_entry/amc/print/${item.id}`)
                  "
                >
                  <v-icon>mdi-email</v-icon> Email
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-item>
                <v-list-item-title
                  @click="openNewTab(`/tickets/print/${item.id}`)"
                >
                  <v-icon>mdi-printer</v-icon> Print
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  @click="
                    openNewTab(
                      `${backendUrl}/form_entry/ticket/print/${item.id}`
                    )
                  "
                >
                  <v-icon>mdi-email</v-icon> Email
                </v-list-item-title>
              </v-list-item>
            </template>

            <!-- <v-list-item @click="sendEmail">
              <v-list-item-title>
                <v-icon class="mr-1" color="secondary"
                  >mdi-email-outline</v-icon
                >
                <span class="mt-2">Send to Email</span>
                <FormEntryTableView :items="item.checklists" />
              </v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  components: {},

  data: () => ({
    backendUrl: process.env.BACKEND_URL,
    totalRowsCount: 0,
    filters: {},
    loading: true,
    options: {},
    Model: "Reports",
    endpoint: "form_entry",
    data: [],
    errors: [],
    companies: [],
    equipmentCategoryList: [],
    technicians: [],
    headers: require("@/headers/form_entry_amc.json"),
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
