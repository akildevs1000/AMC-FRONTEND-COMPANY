<template>
  <v-dialog persistent v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <span>
        <v-icon v-bind="attrs" v-on="on" outlined dark color="primary">
          mdi-plus-circle
        </v-icon>
      </span>
    </template>
    <v-card>
      <v-card-title>
        Create Quotation
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
            <td>Action</td>
          </tr>
          <tr v-for="(d, index) in payload.items" :key="index">
            <td style="width: 150px">
              <input
                v-model="d.title"
                type="text"
                class="pa-1"
                style="
                  width: 100%;
                  border-radius: 5px;
                  border: 1px solid #6946dd;
                "
              />
            </td>
            <td style="width: 150px">
              <select
                v-model="d.warranty"
                class="pa-1"
                style="
                  border: 1px solid #6946dd;
                  width: 100%;
                  border-radius: 5px;
                "
              >
                <option value="">Select Warranty</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </td>
            <td style="width: 100px">
              <input
                v-model="d.qty"
                type="number"
                class="pa-1"
                style="
                  border: 1px solid #6946dd;
                  width: 100%;
                  border-radius: 5px;
                "
                @input="setCalulation"
              />
            </td>
            <td style="width: 100px">
              <input
                v-model="d.unit_price"
                type="number"
                class="pa-1"
                style="
                  border: 1px solid #6946dd;
                  width: 100%;
                  border-radius: 5px;
                "
                @input="setCalulation"
              />
            </td>
            <td style="width: 250px">
              <input
                v-model="d.description"
                type="text"
                class="pa-1"
                style="
                  border: 1px solid #6946dd;
                  width: 100%;
                  border-radius: 5px;
                "
              />
            </td>
            <td>
              <v-icon center color="red" @click="removeItem(index)"
                >mdi-close-circle-outline</v-icon
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
                  <td>{{ payload.sub_total.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th>5% VAT</th>
                  <td>{{ payload.vat.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th>Total AED</th>
                  <td>{{ payload.total.toFixed(2) }}</td>
                </tr>
              </table>
            </v-col>
            <v-col cols="12" class="text-right my-1">
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
  data: () => ({
    dialog: false,
    snackbar: false,
    loading: false,
    upload: {
      name: "",
    },
    payload: {
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
      id: 30,
    },

    defaultPayload: {},

    e1: 1,
    errors: [],
    companies: [],
  }),
  created() {
    this.defaultPayload = this.payload;

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
      this.payload.sub_total = sub_total;
      this.payload.vat = (sub_total / 100) * 5;
      this.payload.total = this.payload.vat + this.payload.sub_total;
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
        .post("/quotation", this.payload)
        .then(({ data }) => {
          this.loading = false;
          this.errors = [];
          this.$emit("success");
          this.dialog = false;
          this.payload = this.defaultPayload;
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
        console.log("catching...", response);
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
