<template>
  <v-dialog persistent v-model="dialog" width="750">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        x-small
        :ripple="false"
        text
        title="Add Device"
        @click="addItem()"
        color="primary"
      >
        <v-icon dark white>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title dense>
        New Equipment
        <v-spacer></v-spacer>

        <v-icon @click="dialog = false" outlined color="primary">
          mdi-close-circle-outline
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col md="12">
              <v-autocomplete
                class="pb-0"
                v-model="equipment_category_id"
                @change="getFieldsByType"
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
          </v-row>
          <v-row>
            <v-col
              v-for="(item, index) in payload"
              :key="index"
              :cols="`${item.cols}`"
            >
              <v-text-field
                v-model="filteredPayload[item.value]"
                outlined
                dense
                :label="`${item.label} *`"
                :hide-details="!errors[item.value]"
                :error-messages="
                  errors && errors[item.value] ? errors[item.value][0] : ''
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <div class="text-right">
                <v-btn small :loading="loading" color="primary" @click="submit">
                  Submit
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["company_id"],
  data: () => ({
    filteredPayload: {},
    fieldsByType: require("../../menus/equipmentFields.json"),
    valid: false,
    popupDeviceId: null,
    dialog: false,
    filters: {},
    isFilter: false,
    totalRowsCount: 0,
    snack: false,
    equipment_category_id: 3,
    payload: {
      company_id: 0,
    },
    endpoint: "equipment",
    data: [],
    equipmentCategoryList: [],
    loading: false,
    errors: [],
    editedItem: null,
    equipmentCategoryByCompanyId: [],
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  async created() {
    this.getFieldsByType();
    this.$axios.get(`equipmentCategoryList`).then(({ data }) => {
      this.equipmentCategoryList = data.filter(e => e.id >= 1 && e.id <= 5);
    });
  },

  methods: {
    close() {
      this.dialog = false;
      this.errors = [];
    },
    addItem() {
      this.errors = [];
      this.dialog = true;
    },
    getFieldsByType() {
      this.errors = [];
      this.payload = {};
      this.payload = this.fieldsByType[this.equipment_category_id];
      this.filteredPayload = this.payload.reduce((acc, cur) => {
        acc[cur.value] = "";
        return acc;
      }, {});
    },
    submit() {
      this.filteredPayload.equipment_category_id = this.equipment_category_id;
      this.filteredPayload.company_id = this.company_id;

      this.loading = true;

      this.$axios
        .post(this.endpoint, this.filteredPayload)
        .then(({ data }) => {
          this.loading = false;
          if (!data.status) {
            this.errors = [];
            this.errors = data.errors;
            this.dialog = false;
          } else {
            this.$emit("response", "Device details are  Created successfully");
            this.dialog = false;
          }
        })
        .catch(({ response }) => {
          this.handleErrorResponse(response);
          this.loading = false;
        });
    },
    handleErrorResponse(response) {
      this.loading = false;
      if (!response) {
        return;
      }
      let { status, data } = response;

      if (status && status == 422) {
        this.errors = data.errors;
        return;
      }

      this.$emit("response", "Device details cannot create");
      this.dialog = false;
    },
  },
};
</script>
