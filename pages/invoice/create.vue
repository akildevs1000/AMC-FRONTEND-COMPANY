<template>
  <div>
    <div class="text-right">
    <SnippetsBack />
  </div>
    <div class="text-center ma-2">
      <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        max-width="400"
      >
        <v-card>
          <v-card-title class="headline"
            >Success! <v-spacer></v-spacer
            ><v-icon color="primary" @click="dialog = false"
              >mdi-close-circle-outline</v-icon
            ></v-card-title
          >
          <v-card-text> Invoice has been created </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <v-row>
      <v-col cols="9">
        <v-card outlined>
          <v-container class="pa-10">
            <div class="pb-5 text-center">
              <h2>INVOICE</h2>
            </div>
            <v-row class="my-3">
              <v-col cols="4">
                <v-autocomplete
                  @change="getRelatedCompany(payload.company_id)"
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
            <v-container class="grey lighten-4">
              <v-row no-gutters>
                <v-col cols="4">
                  <h3>
                    {{ payload.company.name ?? "---" }}
                  </h3>
                  <div>Address: {{ payload.company.location ?? "---" }}</div>
                  <div>
                    Phone: {{ payload.company.contact_number ?? "---" }}
                  </div>
                  <div>Email: {{ payload.company.email ?? "---" }}</div>
                </v-col>
                <v-col cols="4"></v-col>
                <v-col cols="4" class="text-right">
                  <div>
                    <b>Invoice #: {{ payload.invoice_number }}</b>
                  </div>
                  <div>Date: {{ payload.date }}</div>
                </v-col>
              </v-row>
            </v-container>
            <v-row  class="mt-2">
              <v-col cols="12">
                <v-text-field
                  label="LPO Number"
                  rows="3"
                  outlined
                  dense
                  :hide-details="true"
                  v-model="payload.lpo_number"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  rows="3"
                  outlined
                  dense
                  :hide-details="true"
                  v-model="payload.description"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row class="py-5">
              <v-col>
                <InvoiceV1MultipleItems
                  @selected="
                    (e) => {
                      payload = { ...payload, ...e };
                    }
                  "
                />
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-row class="pt-5">
              <v-col cols="3" offset="9">
                <v-row no-gutters>
                  <v-col class="secondary--text">Sub Total AED</v-col>
                  <v-col class="secondary--text text-right"
                    >{{ payload.sub_total ?? 0 }}
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col class="secondary--text">5% VAT</v-col>
                  <v-col class="secondary--text text-right"
                    >{{ payload.vat ?? 0 }}
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-5">
                  <v-col class="secondary--text">Total AED </v-col>
                  <v-col class="secondary--text text-right"
                    >{{ payload.total ?? 0 }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="my-1 text-right">
                <v-btn class="primary" :loading="loading" @click="submit">
                  <v-icon small>mdi-floppy</v-icon> Save</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card outlined>
          <v-container class="pa-10">
            <v-row no-gutters>
              <v-col cols="12" class="my-1">
                <v-btn
                  block
                  color="primary"
                  dense
                  @click="$refs.RightDrawRef.openRightDrawer()"
                >
                  <v-icon small color="white">mdi-email</v-icon>
                  Send Invoice
                </v-btn>
                <InvoiceV1RightDraw
                  ref="RightDrawRef"
                  :payload="payload"
                />
              </v-col>
              <v-col cols="12" class="my-1">
                <v-btn
                  block
                  color="primary"
                  dark
                  @click="$refs.PreviewRef.dialog = true"
                >
                  <v-icon small>mdi-email</v-icon>Preview
                </v-btn>
                <InvoiceV1Preview ref="PreviewRef" :payload="payload" />
              </v-col>
              <v-col cols="12" class="my-1">
                <v-btn
                  block
                  color="primary"
                  dark
                  @click="$refs.PrintRef.dialog = true"
                >
                  <v-icon small>mdi-printer</v-icon>Print
                </v-btn>
                <InvoiceV1Print ref="PrintRef" :payload="payload" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    dialog: false,
    loading: false,
    rightDrawer: false,
    payload: {
      company_id: 1,
      lpo_number:null,
      description: null,
      company: {},
      invoice_number: 0,
      date: null,
    },

    companies: [],
    errors: [],
  }),
  async created() {
    this.$axios.get("/amc_company_list").then(({ data }) => {
      this.companies = data;

      if (data.length) {
        this.payload.company_id = data.at(0).id;
        this.getRelatedCompany(data.at(0).id);
      }
    });

    this.$axios.get("/getLastInvoice").then(({ data }) => {
      let inv = data.id + 1;
      this.payload.invoice_number = "INV-" + (inv < 1000 ? inv + 1000 : inv);
      this.payload.date = data.date;
    });
  },
  methods: {
    getRelatedCompany(id) {
      this.payload.company = this.companies.find((e) => e.id == id);
      this.payload.description = `Dear ${this.payload.company.name}, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi amet et fugiat, blanditiis ducimus voluptas nisi veritatis, atque magnam aperiam vel eaque placeat.`;
    },
    submit() {
      this.$axios
        .post("/invoice", this.payload)
        .then(({ data }) => {
          this.loading = false;
          this.errors = [];
          this.dialog = true;
          setTimeout(() => this.$router.push("/invoice"), 3000);
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
