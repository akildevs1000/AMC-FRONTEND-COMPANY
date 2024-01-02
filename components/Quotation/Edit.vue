<template>
  <v-dialog persistent v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-pencil </v-icon>
        Edit
      </span>
    </template>
    <v-card>
      <v-card-title>
        Edit Quotation # {{ payload.quotation_number }}
        <v-spacer></v-spacer>
        <v-row>
          <v-col md="12" cols="12" sm="12" class="text-right">
            <v-btn small class="primary" @click="addItem">
              Add Item(s)
              <v-icon small>mdi-plus-circle-outline</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row class="my-1">
          <v-col cols="6">
            <v-autocomplete
              label="Select Company"
              dense
              outlined
              v-model="payload.company_id"
              :items="companies"
              item-value="id"
              item-text="name"
              :hide-details="!errors.company_id"
              :error-messages="
                errors && errors.company_id ? errors.company_id[0] : ''
              "
            ></v-autocomplete>
          </v-col>
        </v-row>
        <table>
          <tr>
            <td>Title</td>
            <td>Warranty</td>
            <td>Qty</td>
            <td>Unit Price</td>
            <td>Description</td>
            <td class="text-center">Action</td>
          </tr>
          <tr v-for="(d, index) in payload.items" :key="index">
            <td style="width: 150px">
              <v-text-field
                dense
                outlined
                v-model="d.title"
                :hide-details="true"
              ></v-text-field>
            </td>
            <td style="width: 150px">
              <v-select
                :items="[
                  { id: '', name: 'Warranty' },
                  { id: 'Yes', name: 'Yes' },
                  { id: 'No', name: 'No' },
                ]"
                item-value="id"
                item-text="name"
                dense
                outlined
                v-model="d.warranty"
                :hide-details="true"
              ></v-select>
            </td>
            <td style="width: 100px">
              <v-text-field
                dense
                outlined
                v-model="d.qty"
                :hide-details="true"
                type="number"
                @input="setCalulation"
              ></v-text-field>
            </td>
            <td style="width: 100px">
              <v-text-field
                dense
                outlined
                v-model="d.unit_price"
                :hide-details="true"
                type="number"
                @input="setCalulation"
              ></v-text-field>
            </td>
            <td style="width: 250px">
              <v-text-field
                dense
                outlined
                v-model="d.description"
                :hide-details="true"
              ></v-text-field>
            </td>
            <td class="text-center">
              <v-icon center color="red" @click="removeItem(index)"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </table>
        <v-card elevation="0" class="mt-3">
          <v-row>
            <v-col cols="6">
              <v-textarea
                rows="4"
                label="Description"
                dense
                outlined
                type="text"
                v-model="payload.description"
                :hide-details="!errors.description"
                :error-messages="
                  errors && errors.description ? errors.description[0] : ''
                "
              ></v-textarea>
            </v-col>

            <v-col cols="6">
              <table>
                <tr>
                  <th>Sub Total AED</th>
                  <td>{{ payload.sub_total }}</td>
                </tr>
                <tr>
                  <th>5% VAT</th>
                  <td>{{ payload.vat }}</td>
                </tr>
                <tr>
                  <th>Total AED</th>
                  <td>{{ payload.total }}</td>
                </tr>
              </table>
            </v-col>
            <v-col cols="6">
              <v-select
                dense
                outlined
                v-model="payload.status"
                :items="[`pending`, `submitted`, `approved`, `cancelled`]"
                :hide-details="true"
              ></v-select>
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn small @click="dialog = false">Close</v-btn>
              <v-btn small :loading="loading" @click="submit" class="primary"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["id", "item"],
  data: () => ({
    dialog: false,
    snackbar: false,
    loading: false,
    upload: {
      name: "",
    },
    payload: {
      status: 1,
      company_id: null,
      description: "",
      items: [
        {
          title: "",
          warranty: "",
          qty: 0,
          unit_price: 0,
          description: "",
        },
      ],
      sub_total: 0,
      vat: 0,
      total: 0,
    },

    e1: 1,
    errors: [],
    companies: [],
  }),
  created() {
    this.payload = this.item;

    this.$axios
      .get("/amc_company_list")
      .then(({ data }) => (this.companies = data));
  },
  methods: {
    setCalulation() {
      let sub_total = 0;
      this.payload.items.forEach(({ qty, unit_price }) => {
        sub_total += qty * unit_price;
      });

      let vat = (sub_total / 100) * 5;
      let total = vat + sub_total;

      this.payload.sub_total = sub_total.toFixed(2);
      this.payload.vat = vat.toFixed(2);
      this.payload.total = total.toFixed(2);
    },
    removeItem(index) {
      this.payload.items.splice(index, 1);
      this.setCalulation();
    },
    addItem() {
      this.payload.items.push({
        title: "",
        warranty: "",
        qty: 0,
        unit_price: "",
        description: "",
      });
    },
    submit() {
      this.$axios
        .put("/quotation/" + this.payload.id, this.payload)
        .then(({ data }) => {
          this.loading = false;
          this.errors = [];
          this.$emit("success");
          this.dialog = false;
        })
        .catch(({ response }) => this.handleErrorResponse(response));
    },
    handleErrorResponse(response) {
      this.loading = false;
      if (!response) {
        this.$emit("error", "An unexpected error occurred.");
        return;
      }
      let { status, data, statusText } = response;

      if (status && status == 422) {
        this.errors = data.errors;
        return;
      }

      this.$emit("error", statusText);
    },
  },
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
