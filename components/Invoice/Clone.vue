<template>
  <v-dialog persistent v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-content-duplicate </v-icon>
        Clone
      </span>
    </template>
    <v-card>
      <v-card-title>
        Clone Quotation
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
                  border: 1px solid #6946dd;
                  width: 100%;
                  border-radius: 5px;
                "
              />
            </td>
            <td style="width: 150px">
              <select
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
                :hide-details="true"
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
      company_id: 1,
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
    defaultPayload:{},
    e1: 1,
    errors: [],
  }),
  created() {
    this.payload = this.item;
    this.defaultPayload = this.payload;

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
        console.log(this.payload);
      this.payload.company_id = this.id;

      this.$axios
        .post("/quotation", this.payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
            return;
          }

          this.errors = [];
          this.$emit("success");
          this.dialog = false;
          this.payload = this.defaultPayload;
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
