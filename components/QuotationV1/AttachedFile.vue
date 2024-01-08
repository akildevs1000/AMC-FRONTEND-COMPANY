<template>
  <div>
    <v-dialog v-model="dialog" width="720">
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="primary" dark v-bind="attrs" v-on="on">
          <v-icon small>mdi-attachment</v-icon> Attachment
        </v-btn>
      </template>
      <div
        style="background: white !important"
        elevation="0"
        flat
        class="px-5 py-3 my-print"
      >
        <!-- <div>Sales Person: Ansari Kumar</div>
              <div>Stay: 6 Jan 2024 to 6 Jan 2024</div> -->

        <v-row>
          <v-col>
            <h3>Akil Security</h3>
            <div>Address: 123 Street, City</div>
            <div>Phone: 123-456-7890</div>
            <div>Email: info@example.com</div>
          </v-col>
          <v-col class="text-right">
            <div><b>Quotaion #: 00123</b></div>
            <div>Date: 6 Jan 2024</div>
          </v-col>
          <v-col cols="12">
            <v-card class="pa-1 mb-2" outlined>
              <div>Dear [Customer's Name],</div>
              <div>
                Congratulations on securing your reservation with us at
                [Hotel/Resort Name]! Your booking for a [Room Type] from
                [Check-in Date] to [Check-out Date] is confirmed, and we're
                excited to welcome you.
              </div>
            </v-card>
          </v-col>
        </v-row>

        <div class="quotation-body">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Room Type</th>
                <th>Adult</th>
                <th>Child</th>
                <th>Extra Bed</th>
                <th>Food</th>
                <th>Rate Per Room</th>
                <th>GST</th>
                <th>No Of Rooms</th>
                <th>No Of Nights</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in payload.item.items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.room }}</td>
                <td>{{ item.adult }}</td>
                <td>{{ item.child }}</td>
                <td>{{ item.extra_bed }}</td>
                <td>{{ item.food }}</td>
                <td>{{ item.rate_per_room }}</td>
                <td>{{ item.gst }}</td>
                <td>{{ item.no_of_rooms }}</td>
                <td>{{ item.no_of_nights }}</td>
                <td>{{ item.room_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td style="border: none" colspan="9"></td>
                <td><strong>Subtotal</strong></td>
                <td>
                  <strong>{{ payload.item.room_sub_total ?? 0 }}</strong>
                </td>
              </tr>
              <tr>
                <td style="border: none" colspan="9"></td>
                <td><strong>Extra</strong></td>
                <td>
                  <strong>{{ payload.item.extra ?? 0 }}</strong>
                </td>
              </tr>
              <tr>
                <td style="border: none" colspan="9"></td>
                <td><strong>Discount</strong></td>
                <td>
                  <strong>{{ payload.item.discount ?? 0 }}</strong>
                </td>
              </tr>
              <tr>
                <td style="border: none" colspan="9"></td>
                <td><strong>Total</strong></td>
                <td>
                  <strong>{{ payload.item.room_sub_total }}</strong>
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
        <footer class="footer" style="text-align: center !important">
          <p>
            Further Details: please visit our website
            <a href="https://www.hyderspark.com" target="_blank"
              >https://www.hyderspark.com</a
            >
          </p>
        </footer>
      </div>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["payload"],
  data() {
    return {
      wait: true,
      dialog: false,
    };
  },
  //   watch: {
  //     dialog(newValue, oldValue) {
  //       // Do something when dialogVisible changes
  //       if (newValue) {
  //         setTimeout(() => {
  //           this.printContent();
  //           this.wait = false;
  //         }, 3000);
  //       } else {
  //         //  this.printContent()
  //       }
  //     },
  //   },
  methods: {
    getRoomType(id) {
      let types = {
        1: "King",
        2: "Queen",
      };

      return types[id];
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
