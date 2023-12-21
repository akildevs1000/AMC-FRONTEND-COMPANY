<template>
  <div v-if="can('branch_access')">
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="color">
        {{ response }}
      </v-snackbar>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}

        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="snack = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>
    <div v-if="!loading">
      <div v-if="can(`branch_view`)">
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
                <v-icon class="ml-2" @click="clearFilters" dark
                  >mdi mdi-reload</v-icon
                >
              </v-btn>
            </span>
            <span>
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
            </span>

            <v-spacer></v-spacer>

            <AMCCompanyCreate
              @success="
                (e) => handleSuccessResponse(`Company Successfully created`)
              "
            />
          </v-toolbar>
          <v-data-table
            dense
            v-model="selectedItems"
            :headers="headers_table"
            :items="data"
            model-value="data.id"
            :loading="loadinglinear"
            :options.sync="options"
            :footer-props="{
              itemsPerPageOptions: [100, 500, 1000],
            }"
            class="elevation-1"
            :server-items-length="totalRowsCount"
          >
            <template v-slot:item.logo="{ item, index }" style="width: 300px">
              <v-row no-gutters>
                <v-col
                  style="
                    padding: 5px;
                    padding-left: 0px;
                    width: 50px;
                    max-width: 50px;
                  "
                >
                  <v-img
                    style="
                      border-radius: 50%;
                      height: auto;
                      width: 50px;
                      max-width: 50px;
                    "
                    :src="item.logo ? item.logo : '/no-image.png'"
                  >
                  </v-img>
                </v-col>
                <v-col style="padding: 10px">
                  <strong> {{ item.name }}</strong>
                  <p>{{ item.location }}</p>
                </v-col>
              </v-row>
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
                      <AMCCompanySingle :id="item.id" />
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <AMCCompanyEdit
                        :id="item.id"
                        @success="
                          (e) =>
                            handleSuccessResponse(`Record has been updated`)
                        "
                      />
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
        </v-card>
      </div>
    </div>
    <Preloader v-else />
  </div>

  <NoAccess v-else />
</template>

<script>
import "cropperjs/dist/cropper.css";
import VueCropper from "vue-cropperjs";

export default {
  components: {
    VueCropper,
  },

  data: () => ({
    totalRowsCount: 0,
    showFilters: false,
    filters: {},
    isFilter: false,
    sortBy: "branch_id",
    sortDesc: false,
    server_datatable_totalItems: 1000,
    snack: false,
    snackColor: "",
    snackText: "",
    selectedItems: [],
    datatable_search_textbox: "",
    datatable_searchById: "",
    loadinglinear: true,
    displayErrormsg: false,
    image: "",
    mime_type: "",
    cropedImage: "",
    cropper: "",
    autoCrop: false,
    dialogCropping: false,
    comp: "branchEdit",
    tab: "0",
    branchId: 0,
    branchObject: {},
    attrs: [],
    dialog: false,
    editDialog: false,
    selectedFile: "",
    m: false,
    expand: false,
    expand2: false,
    boilerplate: false,
    right: true,
    rightDrawer: false,
    drawer: true,
    tab: null,
    selectedItem: 1,
    on: "",
    files: "",
    search: "",
    loading: false,
    //total: 0,
    next_page_url: "",
    prev_page_url: "",
    current_page: 1,
    per_page: 1000,
    ListName: "",
    color: "background",
    response: "",
    snackbar: false,
    btnLoader: false,
    max_branch: 0,
    community: {},
    upload: {
      name: "",
    },
    previewImage: null,
    payload: {},
    personalItem: {},
    contactItem: {},
    emirateItems: {},
    setting: {},
    options: {},
    Model: "Companies",
    endpoint: "amc_company",
    search: "",
    snackbar: false,
    ids: [],
    loading: false,
    //total: 0,
    headers: [],
    editedIndex: -1,
    editedItem: { name: "" },
    defaultItem: { name: "" },
    response: "",
    data: [],
    errors: [],
    designations: [],
    managers: [],
    dialogVisible: false,
    headers_table: require("../../menus/amc_company.json"),
    formTitle: "Create",
    disabled: false,
  }),

  async created() {
    this.loading = false;
    this.boilerplate = true;

    let options = {
      params: {
        per_page: 1000,
        company_id: this.$auth.user.company_id,
        // //department_ids: this.$auth.user.assignedDepartments,
      },
    };

    this.getDataFromApi();
    //this.getDepartments(options);
  },
  mounted() {
    //this.getDataFromApi();

    this.headers = [
      // { text: "#" },
      { text: "E.ID" },
      { text: "Profile" },
      { text: "Name" },
      { text: "Email" },
      { text: "Timezone" },
      { text: "Dept" },
      { text: "Sub Dept" },
      { text: "Desgnation" },
      { text: "Role" },
      { text: "Mobile" },
      { text: "Shift" },
      { text: "Actions" },
    ];
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
    caps(str) {
      if (str == "" || str == null) {
        return "---";
      } else {
        let res = str.toString();
        return res.replace(/\b\w/g, (c) => c.toUpperCase());
      }
    },
    closePopup() {
      //croppingimagestep5
      this.$refs.attachment_input.value = null;
      this.dialogCropping = false;
    },
    saveCroppedImageStep2() {
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();

      this.image_name = this.cropedImage;
      this.previewImage = this.cropedImage;

      this.dialogCropping = false;
    },
    close() {
      this.dialog = false;
      this.errors = [];
      setTimeout(() => {}, 300);
    },
    importbranch() {
      let payload = new FormData();
      payload.append("branchs", this.files);
      payload.append("company_id", this.$auth?.user?.company?.id);
      let options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.btnLoader = true;
      this.$axios
        .post("/branch/import", payload, options)
        .then(({ data }) => {
          this.btnLoader = false;
          if (!data.status) {
            this.errors = data.errors;
            payload.delete("branchs");
          } else {
            this.errors = [];
            this.snackbar = true;
            this.response = "branchs imported successfully";
            this.getDataFromApi();
            this.close();
          }
        })
        .catch((e) => {
          if (e.toString().includes("Error: Network Error")) {
            this.errors = [
              "File is modified.Please cancel the current file and try again",
            ];
            this.btnLoader = false;
          }
        });
    },
    can(per) {
      return this.$pagePermission.can(per, this);
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
    getDataFromApi(url = this.endpoint) {
      //this.loading = true;
      this.loadinglinear = true;

      let { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let options = {
        params: {
          page: page,
          sortBy: sortBy ? sortBy[0] : "",
          sortDesc: sortDesc ? sortDesc[0] : "",
          per_page: itemsPerPage,
          company_id: this.$auth.user.company_id,

          ...this.filters,
        },
      };

      this.$axios.get(url, options).then(({ data }) => {
        this.data = data.data;

        this.totalRowsCount = data.total;

        this.data.length == 0
          ? (this.displayErrormsg = true)
          : (this.displayErrormsg = false);

        this.loadinglinear = false;
      });
    },
    deleteItem(item) {
      confirm(
        "Are you sure you wish to delete , to mitigate any inconvenience in future."
      ) &&
        this.$axios
          .delete(`amc_company-delete/${item.id}`)
          .then(({ data }) => {
            if (!data.status) {
              this.errors = data.errors;
            } else {
              this.getDataFromApi();
              this.snackbar = data.status;
              this.response = data.message;
            }
          })
          .catch((err) => console.log(err));
    },
    handleSuccessResponse(message) {
      this.snackbar = true;
      this.response = message;
      this.getDataFromApi();
    },
  },
};
</script>
