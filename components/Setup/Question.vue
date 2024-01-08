<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="`background`">
        {{ response }}
      </v-snackbar>
    </div>
    <div v-if="!loading">
      <v-dialog persistent v-model="DialogBox" width="600">
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
              <v-col cols="6">
                <v-autocomplete
                  class="pb-0"
                  v-model="payload.equipment_category_id"
                  :items="equipmentCategoryList"
                  dense
                  outlined
                  item-value="id"
                  item-text="name"
                  label="Select Category"
                  :hide-details="!errors.equipment_category_id"
                  :error-messages="
                    errors && errors.equipment_category_id
                      ? errors.equipment_category_id[0]
                      : ''
                  "
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn small class="primary" @click="addHeading">
                  Heading
                  <v-icon class="mx-1" small
                    >mdi-plus-circle-outline</v-icon
                  ></v-btn
                >
              </v-col>
              <v-col cols="12">
                <table
                  v-for="(h, headingIndex) in payload.headings"
                  :key="headingIndex"
                >
                  <tr>
                    <td>
                      <v-card elevation="0">
                        <div>
                          <b>{{ `Heading ${headingIndex + 1}` }}</b>
                        </div>
                        <v-text-field
                          placeholder="Title"
                          dense
                          outlined
                          v-model="h.name"
                          :hide-details="!errors.name"
                          :error-messages="
                            errors && errors.name ? errors.name[0] : ''
                          "
                        ></v-text-field>

                        <table class="my-1">
                          <tr>
                            <td>
                              Question
                              <v-icon
                                @click="addQuestion(headingIndex)"
                                color="primary"
                                class="mx-1"
                                >mdi-plus-circle-outline</v-icon
                              >
                            </td>
                          </tr>
                          <tr
                            v-for="(d, index) in payload.headings[headingIndex]
                              .questions"
                            :key="index"
                          >
                            <td>
                              <div style="display: flex">
                                <v-text-field
                                  dense
                                  outlined
                                  v-model="d.name"
                                  :hide-details="!errors.name"
                                  :error-messages="
                                    errors && errors.name ? errors.name[0] : ''
                                  "
                                ></v-text-field>
                                <v-icon
                                  class="mx-2"
                                  center
                                  color="red"
                                  @click="
                                    removeQuestionItem(
                                      headingIndex,
                                      index,
                                      d.id
                                    )
                                  "
                                  >mdi-close-circle-outline</v-icon
                                >
                              </div>
                            </td>
                          </tr>
                        </table>
                      </v-card>
                    </td>
                    <td class="text-center" style="width: 100px">
                      <v-icon
                        center
                        color="red"
                        @click="removeItem(headingIndex, h.id)"
                        >mdi-delete</v-icon
                      >
                    </td>
                  </tr>
                </table>
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

            <template v-slot:item.questions="{ item }">
              <ul v-for="(heading, i) in item.headings" :key="i">
                <li>
                  <b>{{ heading.name }}</b>
                  <ul>
                    <li v-for="(question, j) in heading.questions" :key="j">
                      {{ question.name }}
                    </li>
                  </ul>
                </li>
              </ul>
            </template>

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
    Model: "Question",
    endpoint: "equipmentCategoryWithQuestions",
    headers: [
      {
        text: "Category",
        align: "left",
        sortable: true,
        key: "name",
        value: "name",
        filterable: true,
        filterSpecial: false,
      },

      {
        text: "Questions",
        align: "left",
        sortable: true,
        key: "questions",
        value: "questions",
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
    payload: {
      equipment_category_id: 0,
      headings: [{ name: "", questions: [{ name: "" }] }],
    },
    defaultPayload: {},

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
    equipmentCategoryList: [],
  }),

  async created() {
    this.defaultPayload = this.payload;
    this.loading = false;
    this.$axios.get(`equipmentCategoryList`).then(({ data }) => {
      this.equipmentCategoryList = data;
    });
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
    removeItem(index, id) {
      if (this.formAction == "Delete") {
        this.$axios
          .delete(`/questions-heading-delete/${id}`)
          .then(({ data }) => {
            this.errors = [];
            this.snackbar = true;
            this.response = this.Model + " deleted successfully";
            this.getDataFromApi();
            this.DialogBox = false;
            this.dialog = true;
            this.payload.headings.splice(index, 1);
          })
          .catch((err) => console.log(err));
      } else {
        this.payload.headings.splice(index, 1);
      }
    },
    removeQuestionItem(headingIndex, questionIndex, id) {
      if (this.formAction == "Delete") {
        this.$axios
          .delete(`questions/${id}`)
          .then(({ data }) => {
            this.errors = [];
            this.snackbar = true;
            this.response = this.Model + " deleted successfully";
            this.getDataFromApi();
            this.DialogBox = false;
            this.dialog = true;
            this.payload.headings[headingIndex].questions.splice(
              questionIndex,
              1
            );
          })
          .catch((err) => console.log(err));
      } else {
        this.payload.headings[headingIndex].questions.splice(questionIndex, 1);
      }
    },
    addHeading() {
      this.payload.headings.push({ name: "", questions: [{ name: "" }] });
    },
    addQuestion(index) {
      this.payload.headings[index].questions.push({ name: "" });
    },
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
      //   this.payload.name = "";
      this.payload = this.defaultPayload;
    },
    editItem(item) {
      this.disabled = false;
      this.formAction = "Edit";
      this.DialogBox = true;
      this.payload = item;
      this.payload.equipment_category_id = item.id;
    },
    viewItem(item) {
      this.disabled = true;
      this.formAction = "View";
      this.DialogBox = true;
      this.payload = item;
      this.payload.equipment_category_id = item.id;
    },
    deleteItem(item) {
      this.disabled = true;
      this.formAction = "Delete";
      this.DialogBox = true;
      this.payload = item;
      this.payload.equipment_category_id = item.id;
    },

    submit() {
      this.$axios
        .post(`questions`, this.payload)
        .then(({ data }) => {
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
      console.log(this.payload);
      return;
      this.$axios
        .put(`questions/` + this.payload.id, this.payload)
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
<style scoped>
@import "@/assets/tableStyles.css";
</style>
