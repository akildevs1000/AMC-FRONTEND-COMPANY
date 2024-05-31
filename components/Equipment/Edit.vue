<template>
  <div>
    <v-dialog v-model="dialog" width="750">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" color="secondary" small
          >mdi-pencil</v-icon
        >
        Edit
      </template>
      <v-card>
        <v-card-title dense>
          Edit Equipement
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
                  @change="getFieldsByType"
                  class="pb-0"
                  v-model="equipment_category_id"
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
                  <v-btn
                    small
                    :loading="loading"
                    color="primary"
                    @click="submit"
                  >
                    Submit
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data: () => ({
    filteredPayload: {},
    payload: {
      company_id: 0,
    },
    fieldsByType: require("../../menus/equipmentFields.json"),
    dialog: false,
    equipment_category_id: 3,
    endpoint: "equipment",
    equipmentCategoryList: [],
    loading: false,
    response: "",
    errors: [],
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    this.equipment_category_id = this.item.equipment_category_id;
    this.getFieldsByType();
    this.$axios.get(`equipmentCategoryList`).then(({ data }) => {
      this.equipmentCategoryList = data.filter((e) => e.id >= 1 && e.id <= 5);
    });
    this.errors = [];
  },

  methods: {
    close() {
      this.dialog = false;;
      this.errors = [];
    },
    getFieldsByType() {
      this.errors = [];
      this.payload = {};
      this.filteredPayload = {};

      this.payload = this.fieldsByType[this.equipment_category_id];

      let payload = this.payload.reduce((acc, cur) => {
        acc[cur.value] = "";
        return acc;
      }, {});

      if (this.equipment_category_id == this.item.equipment_category_id) {
        this.filteredPayload = {
          ...payload,
          ...this.item,
        };
      } else {
        this.filteredPayload = payload;
      }
    },
    submit() {
      this.filteredPayload.equipment_category_id = this.equipment_category_id;

      this.loading = true;

      this.$axios
        .put(`${this.endpoint}/${this.item.id}`, this.filteredPayload)
        .then(({ data }) => {
          this.loading = false;
          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.$emit("response", "Device details are updated successfully");
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

      this.$emit("response", "Device details cannot updat");
    },
  },
};
</script>
