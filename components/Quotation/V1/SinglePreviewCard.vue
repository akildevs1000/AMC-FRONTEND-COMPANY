<template>
  <div
    style="background: white !important"
    elevation="0"
    flat
    class="px-5 py-3"
    :class="previewOnly ? ``: `my-print`"
  >
    <v-row>
      <v-col>
        <div style="width: 150px">
          <v-img :src="`/mail-logo.png`"></v-img>
        </div>
        <h4 class="mt-2">Akil Security & Alarm Systems LLC</h4>
        <div class="quotation-font-size">
          P.O.Box : 83481 , Dubai , United Arab Emirates
        </div>
        <div class="quotation-font-size">
          +971 4 3939 562 / +971 55 330 3991
        </div>
        <div class="quotation-font-size">
          mail@akilgroup.com, www.akilgroup.com
        </div>
        <div class="quotation-font-size">TRN : 100391417100003</div>
      </v-col>
      <v-col class="text-right">
        <div style="font-size: 40px">Quotation</div>
        <div>
          <b># {{ payload.quotation_number }}</b>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div>Bill to</div>
        <div>
          <b>{{ payload.company.name ?? "---" }}</b>
        </div>
      </v-col>
      <v-col cols="6" class="text-right">
        <div style="color: white">ignore text</div>
        <div>Quotation Date : {{ payload.date ?? "---" }}</div>
        <div></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div><b>Subject: </b>{{ payload.description ?? "---" }}</div>
      </v-col>
    </v-row>
    <div class="quotation-body" style="margin-top: 10px">
      <table>
        <thead>
          <tr style="background-color: #757575; color: #fff">
            <td>#</td>
            <td>Title & Description</td>
            <td>Warranty</td>
            <td>Qty</td>
            <td>Tax</td>
            <td></td>
            <td class="text-center">Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in payload.items" :key="index">
            <td>{{ index + 1 }}</td>
            <td class="description-td">
              <div>
                {{ item.title }}
              </div>
              <div class="description-text">
                {{ item.description }}
              </div>
            </td>
            <td>{{ item.warranty }}</td>
            <td>{{ convertToAmount(item.qty ?? 0) }}</td>
            <td>{{ convertToAmount((item.unit_price / 100) * 5 ?? 0) }}</td>
            <td></td>
            <td class="text-center" style="width: 50px">
              {{ convertToAmount(item.unit_price ?? 0) }}
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td style="width:100px;"><strong>Sub Total </strong></td>
            <td>{{ convertToAmount(payload.vat ?? 0) }}</td>
            <td></td>
            <td>
              <span>{{ convertToAmount(payload.sub_total ?? 0) }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="4"></td>
            <td><strong>Total</strong></td>
            <td></td>
            <td>
              <span>{{ convertToAmount(payload.total ?? 0) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <v-row no-gutters class="mb-5">
        <v-col cols="12">
          <div><b>Terms and Conditions</b></div>
          <ul>
            <li>
              The quotation includes details about warranties, if applicable,
              for the products or services.
            </li>
            <li>
              The quotation is based on the detailed scope of work provided by
              the client.
            </li>
            <li>A detailed payment schedule is outlined in the quotation.</li>
            <li>
              The quotation is valid for a specified period, usually stated in
              the document.
            </li>
          </ul>
        </v-col>
      </v-row>
      <div class="text-center footer-print">
        <v-divider></v-divider>
        <small
          >This is a system-generated quotation and does not require a
          signature.</small
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    payload: Object,
    previewOnly: {
      type: Boolean,
      default: false, // Set the default value to true
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    convertToAmount(value) {
      return parseFloat(value).toFixed(2);
    },
  },
};
</script>
<style scoped>
@import "@/assets/quotation-style.css";
</style>
