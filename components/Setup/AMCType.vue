<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="`background`">
        {{ response }}
      </v-snackbar>
    </div>
    <div v-if="!loading">
      <v-dialog persistent v-model="DialogBox" width="500">
        <v-card>
          <v-toolbar class="popup_background" flat>
            {{ formAction }} {{ Model }}

            <v-spacer></v-spacer>
            <span>
              <v-icon class="ml-2" @click="DialogBox = false" dark>
                mdi mdi-close-circle</v-icon
              >
            </span>
          </v-toolbar>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :label="Model"
                  :disabled="disabled"
                  v-model="payload.name"
                  dense
                  class="text-center"
                  outlined
                  :hide-details="!errors.name"
                  :error="errors.name"
                  :error-messages="errors && errors.name ? errors.name[0] : ''"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="text-right">
              <v-btn small color="grey white--text" @click="DialogBox = false">
                Close
              </v-btn>

              <v-btn
                v-if="formAction == 'Create'"
                small
                :loading="loading"
                color="primary"
                @click="submit"
              >
                Submit
              </v-btn>
              <v-btn
                v-else-if="formAction == 'Edit'"
                small
                :loading="loading"
                color="primary"
                @click="update"
              >
                Update
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container>
        <v-card elevation="0">
          <v-toolbar class="mb-2" dense flat>
            <v-toolbar-title
              ><span>{{ Model }} </span></v-toolbar-title
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
                <v-icon class="ml-2" @click="reload" dark
                  >mdi mdi-reload</v-icon
                >
              </v-btn>
            </span>
            <v-spacer></v-spacer>
            <span>
              <v-btn
                dense
                small
                class="primary"
                text
                :title="`Create ${Model}`"
                @click="addItem"
              >
                Create {{ Model }}
                <v-icon right dark>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </span>
          </v-toolbar>
          <v-data-table
            dense
            :headers="headers"
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
            <template v-slot:header="{ props: { headers } }">
              <tr v-if="isFilter">
                <td v-for="header in headers" :key="header.text">
                  <v-container>
                    <v-text-field
                      clearable
                      @click:clear="
                        filters[header.value] = '';
                        applyFilters();
                      "
                      :hide-details="true"
                      v-if="header.filterable && !header.filterSpecial"
                      v-model="filters[header.value]"
                      :id="header.value"
                      @input="applyFilters(header.key, $event)"
                      outlined
                      dense
                      autocomplete="off"
                    ></v-text-field>
                  </v-container>
                </td>
              </tr>
            </template>

            <!-- <template v-slot:item.email="{ item }">
                      {{ item?.employee?.user?.email }}
                    </template> -->

            <template v-slot:item.options="{ item }">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark-2 icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list width="120" dense>
                  <v-list-item @click="viewItem(item)">
                    <v-list-item-title style="cursor: pointer">
                      <v-icon color="secondary" small> mdi-eye </v-icon>
                      View
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="editItem(item)">
                    <v-list-item-title style="cursor: pointer">
                      <v-icon color="secondary" small> mdi-pencil </v-icon>
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
        </v-card>
      </v-container>
    </div>
    <Preloader v-else />
  </div>
</template>

<script>
export default {
  data: () => ({
    Model: "AMC Type",
    endpoint: "amc_type",
    headers: [
      {
        text: "AMC Type",
        align: "left",
        sortable: true,
        key: "name",
        value: "name",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Details",
        align: "left",
        sortable: false,
        key: "options",
        value: "options",
      },
    ],
    data: [],
    errors: [],

    disabled: false,

    menu: false,
    payload: {},

    tab: null,

    totalRowsCount: 0,
    filters: {},
    isFilter: false,
    sortBy: "id",
    sortDesc: false,
    snack: false,
    snackColor: "",
    snackText: "",
    loadinglinear: true,
    DialogBox: false,
    response: "",
    snackbar: false,
    options: {},
    search: "",
    snackbar: false,
    ids: [],
    loading: false,
    //total: 0,
    editedIndex: -1,
    response: "",
    formAction: "Create",
  }),

  async created() {
    this.loading = false;
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
    onPageChange() {
      this.getDataFromApi();
    },
    applyFilters() {
      this.getDataFromApi();
    },
    reload() {
      this.filters = {};
      this.isFilter = false;
      this.getDataFromApi();
    },
    getDataFromApi() {
      //this.loading = true;
      this.loadinglinear = true;

      let { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let options = {
        params: {
          page: page,
          sortBy: sortBy ? sortBy[0] : "",
          sortDesc: sortDesc ? sortDesc[0] : "",
          per_page: itemsPerPage, //this.pagination.per_page,
          ...this.filters,
        },
      };

      this.$axios.get(this.endpoint, options).then(({ data }) => {
        this.data = data.data;
        //this.server_datatable_totalItems = data.total;

        this.totalRowsCount = data.total;

        this.loadinglinear = false;
      });
    },
    addItem() {
      this.disabled = false;
      this.formAction = "Create";
      this.DialogBox = true;
      this.payload = {};
    },
    editItem(item) {
      this.disabled = false;
      this.formAction = "Edit";
      this.DialogBox = true;
      this.payload = item;
    },
    viewItem(item) {
      this.disabled = true;
      this.formAction = "View";
      this.DialogBox = true;
      this.payload = item;
    },
    deleteItem(item) {
      confirm(
        "Are you sure you wish to delete , to mitigate any inconvenience in future."
      ) &&
        this.$axios
          .delete(`${this.endpoint}/${item.id}`)
          .then(({ data }) => {
            this.getDataFromApi();
            this.snackbar = true;
            this.response = this.Model + " deleted successfully";
          })
          .catch((err) => console.log(err));
    },

    submit() {
      this.$axios
        .post(this.endpoint, this.payload)
        .then(({ data }) => {
          // this.encrypt(data.record.id);
          this.errors = [];
          this.snackbar = true;
          this.response = this.Model + " inserted successfully";
          this.getDataFromApi();
          this.DialogBox = false;
          this.dialog = true;
        })
        .catch(({ response }) => {
          if (!response) {
            return false;
          }
          let { status, data, statusText } = response;

          if (status && status == 422) {
            this.errors = data.errors;
            return;
          }

          this.snackbar = true;
          this.response = statusText;
        });

      // }
    },

    update() {
      this.payload.company_id = this.$auth.user.company_id;
      this.$axios
        .put(this.endpoint + "/" + this.payload.id, this.payload)
        .then(({ data }) => {
          this.errors = [];
          this.snackbar = true;
          this.response = this.Model + " updated successfully";
          this.getDataFromApi();
          this.DialogBox = false;
        })
        .catch(({ response }) => {
          if (!response) {
            return false;
          }
          let { status, data, statusText } = response;

          if (status && status == 422) {
            this.errors = data.errors;
            return;
          }

          this.snackbar = true;
          this.response = statusText;
        });
    },
  },
};
</script>
