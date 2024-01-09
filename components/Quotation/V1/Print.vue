<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="720">
      <v-overlay :value="loading">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
      <template v-slot:activator="{ on, attrs }">
        <v-btn block color="primary" dark v-bind="attrs" v-on="on">
          <v-icon small>mdi-printer</v-icon>Print
        </v-btn>
      </template>

      <div
        style="background: white !important"
        elevation="0"
        flat
        class="px-5 py-3 my-print"
      >
        <v-row>
          <v-col>
            <h3>
              {{ payload.company.name ?? "---" }}
            </h3>
            <div>Address: {{ payload.company.location ?? "---" }}</div>
            <div>
              Phone: {{ payload.company.contact_number ?? "---" }}
            </div>
            <div>Email: {{ payload.company.email ?? "---" }}</div>
          </v-col>
          <v-col class="text-right">
            <div>
              <b>Quotaion #: {{ payload.quotation_number }}</b>
            </div>
            <div>Date: {{ payload.date }}</div>
          </v-col>
          <v-col cols="12">
            <v-card class="pa-1 mb-2" outlined>
              <div>
                {{payload.description}}
              </div>
            </v-card>
          </v-col>
        </v-row>

        <div class="quotation-body">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Warranty</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in payload.items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.warranty }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.unit_price }}</td>
                <td>{{ item.description }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td style="border: none" colspan="5"></td>
                <td>
                  <strong
                    >Subtotal
                    <span style="float: right">{{
                      convertToAmount(payload.sub_total ?? 0)
                    }}</span></strong
                  >
                </td>
              </tr>
              <tr>
                <td style="border: none" colspan="5"></td>
                <td>
                  <strong
                    >5% VAT
                    <span style="float: right">{{
                      convertToAmount(payload.vat ?? 0)
                    }}</span></strong
                  >
                </td>
              </tr>
              <tr>
                <td style="border: none" colspan="5"></td>
                <td>
                  <strong
                    >Total
                    <span style="float: right">{{
                      convertToAmount(payload.total ?? 0)
                    }}</span></strong
                  >
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <v-card outlined class="pa-2">
          <v-row no-gutters>
            <v-col cols="6">
              <div><b>Bank Details</b></div>
              <div>Account Title: Jhon Doe</div>
              <div>Account Number: 111111111111</div>
              <div>IBAN: 11111111111111111</div>
              <div>Branch: India</div>
            </v-col>
            <v-col cols="6">
              <div><b>Terms and Conditions</b></div>
              <ul>
                <li>Confirm your booking by paying advance payment</li>
                <li>Room availibilty depends on the demand</li>
                <li>Full payment must be paid before your stay</li>
                <li>Unmarried couples are not allowed</li>
              </ul>
            </v-col>
          </v-row>
        </v-card>
        <div class="text-center mt-5">
          <p>
            Further Details: please visit our website
            <a href="https://www.hyderspark.com" target="_blank"
              >https://www.hyderspark.com</a
            >
          </p>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["payload"],
  data() {
    return {
      dialog: false,
      loading: true,
    };
  },
  watch: {
    dialog(value) {
      if (value) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.printContent();
        }, 3000);
      }
    },
  },
  methods: {
    convertToAmount(value) {
      return parseFloat(value).toFixed(2);
    },
    printContent() {
      window.print();
    },
  },
};
</script>
<style scoped>
@import "@/assets/quotation-style.css";
</style>
<style>
@media print {
  /* Hide everything except the v-dialog content */
  @page {
    size: A4; /* Set your desired page size */
    margin: 10px; /* Adjust margins as needed */
  }
  body {
    height: 100px !important;
    overflow: hidden !important;
  }
  body * {
    visibility: hidden;
  }
  /* Display only the v-dialog content */
  .my-print * {
    visibility: visible;
  }
  .my-print {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden; /* Prevent content from overflowing */
    page-break-inside: avoid !important; /* Attempt to keep content on a single page */
    padding: 10px; /* Adjust padding as needed */
  }
  .ignore-print {
    display: none !important;
  }
  .footer {
    position: fixed !important;
    bottom: 0;
    left: 20%;
    text-align: center !important;
  }
}
</style>