<template>
  <div>
    <div class="text-right"><SnippetsBack /></div>
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
          <v-card-text> Quotation has been cloned </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <v-row>
      <v-col cols="9">
        <v-card outlined>
          <v-container class="pa-10">
            <div class="pb-5 text-center">
              <h2>
                QUOTATION
                <v-icon color="primary">mdi-arrow-right</v-icon>
                INVOICE
              </h2>
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
                    <b>Quotaion #: {{ payload.quotation_number }}</b>
                  </div>
                  <div>Date: {{ payload.date }}</div>
                </v-col>
              </v-row>
            </v-container>
            <v-row class="mt-2">
              <v-col cols="12">
                <v-text-field
                  label="LPO Number"
                  outlined
                  dense
                  :hide-details="!errors.lpo_number"
                  :error-messages="
                    errors && errors.lpo_number ? errors.lpo_number[0] : ''
                  "
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
              <v-col v-if="payload.id">
                <QuotationV1MultipleItems
                  :payload="payload"
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
                  <v-icon small>mdi-file-document</v-icon> Convert to
                  Invoice</v-btn
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
                  class="primary"
                  block
                  dense
                  @click="$refs.childComponentRef.openRightDrawer()"
                >
                  <v-icon small color="black" class="white--text" dark
                    >mdi-email</v-icon
                  >
                  Send Quotation
                </v-btn>
                <QuotationV1RightDraw
                  ref="childComponentRef"
                  :payload="payload"
                />
              </v-col>
              <v-col cols="12" class="my-1">
                <QuotationV1Preview
                  :payload="payload"
                  label="Preview"
                  icon="eye"
                />
              </v-col>
              <v-col cols="12" class="my-1">
                <QuotationV1Print :payload="payload" />
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
      description: null,
      company: {},
      quotation_number: 0,
      date: null,
    },

    companies: [],
    errors: [],
  }),
  async created() {
    this.$axios.get("/amc_company_list").then(({ data }) => {
      this.companies = data;
    });

    this.$axios.get(`/quotation/${this.$route.params.id}`).then(({ data }) => {
      this.payload = data;
    });
  },
  methods: {
    getRelatedCompany(id) {
      this.payload.company = this.companies.find((e) => e.id == id);
    },

    submit() {
      this.payload.quotation_id = this.$route.params.id;
      this.$axios
        .post("/invoice", this.payload)
        .then(({ data }) => {
          this.loading = false;
          this.errors = [];
          setTimeout(() => this.$router.push("/quotation"), 3000);
        })
        .catch(({ response }) => this.handleErrorResponse(response));
    },

    handleErrorResponse(response) {
      this.loading = false;
      if (!response) {
        console.log("An unexpected error occurred.");
        return;
      }
      let { status, data } = response;

      if (status && status == 422) {
        this.errors = data.errors;
        console.log("catching...", response);
        return;
      }
    },
  },
};
</script>
