<template>
  <div v-if="item && item.id" class="report-print" ref="printableContent">
    <v-row no-gutters class="mb-3">
      <v-col cols="6">
        <div style="width: 150px">
          <v-img :src="`/mail-logo.png`"></v-img>
        </div>
      </v-col>
      <v-col cols="6" class="text-right">
        <h5 class="reds">AKIL SECURITY AND ALARM SYSTEMS</h5>
        <div class="greens" style="line-height: 1">
          <small>Khalid Bin Waleed Road, Dubai, UAE</small>
        </div>
        <div class="greens" style="line-height: 1">
          <small> Tel : 04 3939 562, mail@akilgroup.com</small>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <div class="text-center">
          <h5 class="uppercase-text py-1">
            {{ item.equipment_category.name }} Preventive Maintenance Report
          </h5>
        </div>
      </v-col>
      <v-col cols="2" offset="5">
        <div class="text-center tb-border">
          {{ item.date }}
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">Company Details</h5>
        </div>
      </v-col>
      <v-col cols="12">
        <table>
          <tr>
            <td style="width: 150px">Company Name</td>
            <td colspan="6">{{ item.amc.contract.company.name || "---" }}</td>
          </tr>

          <tr>
            <td>Management Company</td>
            <td colspan="4">King field management company</td>
            <td>Email</td>
            <td>manager@kingfield.com</td>
          </tr>

          <tr>
            <td>Manager</td>
            <td>{{ item.amc.contract.company.contact.name || "---" }}</td>
            <td>Email</td>
            <td colspan="2">
              {{ item.amc.contract.company.contact.email || "---" }}
            </td>
            <td>Phone</td>
            <td>{{ item.amc.contract.company.contact.number || "---" }}</td>
          </tr>
          <tr>
            <td>Action Plan Issued By</td>
            <td>Duabi Municipality</td>
            <td colspan="2">Plot No</td>
            <td>3920570</td>
            <td>Land DM No</td>
            <td>392-570</td>
          </tr>
          <tr>
            <td>Address</td>
            <td colspan="4">
              {{ item.amc.contract.company.address || "---" }}
            </td>
            <td>Makani Number</td>
            <td>{{ item.amc.contract.company.makani_number || "---" }}</td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">AMC Details</h5>
        </div>
      </v-col>
      <v-col cols="12">
        <!-- License Issuer: {{ item.amc.contract.company.trade_license.issued_by || "---" }}
            License Number: {{ item.amc.contract.company.trade_license.license_no || "---" }} -->
        <table>
          <tr>
            <td style="width: 150px">AMC Start Date</td>
            <td>{{ item.amc.contract.show_start_date || "---" }}</td>
            <td colspan="2">AMC Expire Date</td>
            <td>{{ item.amc.contract.show_expire_date || "---" }}</td>
          </tr>

          <tr>
            <td>Equipment</td>
            <td colspan="2">{{ item.equipment_category.name || "---" }}</td>
            <td>LPO Number</td>
            <td>LPO 1284</td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">Equipement Details</h5>
        </div>
      </v-col>
      <v-col cols="12" v-if="equipment">
        <table>
          <tr>
            <td style="width: 150px">Recorder</td>
            <td colspan="2">{{ equipment.recorder_brand }}</td>
            <td>Total Qty</td>
            <td>{{ equipment.recorder_qty }}</td>
            <td>HDD</td>
            <td>{{ equipment.recorder_capacity }}</td>
          </tr>
          <tr>
            <td style="width: 150px">Work Station</td>
            <td colspan="2">{{ equipment.work_station }}</td>
            <td>Total Qty</td>
            <td colspan="3">{{ equipment.work_station_qty }}</td>
          </tr>
          <tr>
            <td style="width: 150px">Camera</td>
            <td colspan="2">{{ equipment.camera }}</td>
            <td>Total Qty</td>
            <td colspan="3">{{ equipment.camera_qty }}</td>
          </tr>
          <tr>
            <td style="width: 150px">Monitor</td>
            <td colspan="2">{{ equipment.monitor }}</td>
            <td>Total Qty</td>
            <td colspan="3">{{ equipment.monitor_qty }}</td>
          </tr>
          <tr>
            <td style="width: 150px">UPS</td>
            <td>{{ equipment.ups }}</td>
            <td>{{ equipment.ups_specs }}</td>
            <td>Total Qty</td>
            <td colspan="3">{{ equipment.ups_qty }}</td>
          </tr>
          <tr>
            <td style="width: 150px">Network Switch</td>
            <td>{{ equipment.network }}</td>
            <td>{{ equipment.network_specs }}</td>
            <td>Total Qty</td>
            <td colspan="3">{{ equipment.network_qty }}</td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="2" offset="5">
        <div class="text-center tb-border">
          <b> CHECKLIST</b>
        </div>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="mt-3"
      v-for="(checklist, index) in item.checklist.checklist"
      :key="index"
    >
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">{{ index + 1 }}. {{ checklist.heading }}</h5>
        </div>
      </v-col>
      <v-col cols="12">
        <table>
          <tr
            v-for="(question, questionIndex) in checklist.questions"
            :key="questionIndex"
          >
            <td style="width: 50px">{{ index + 1 }}.{{ questionIndex + 1 }}</td>
            <td
              :class="`${
                (questionIndex + 1) % 14 === 0 ? 'page-break mt-15' : ''
              }`"
            >
              {{ question.question || "---" }} <br />
              <div :class="`${getCellStyle(question.selectedOption)}--text`">
                {{ question.remarks }}
              </div>
            </td>
            <td style="width: 100px">{{ question.attachment_name }}</td>
            <td
              style="width: 200px; border-bottom: 1px white solid !important"
              class="white--text text-center"
              :class="getCellStyle(question.selectedOption)"
            >
              {{ question.selectedOption || "---" }}
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">Technician Summary</h5>
        </div>
      </v-col>

      <v-col cols="12">
        <table class="mt-5">
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <div>
                {{ item.summary }}
              </div>
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">Customer Comments</h5>
        </div>
      </v-col>

      <v-col cols="12">
        <table class="mt-5">
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <div>
                {{ item.customer_note }}
              </div>
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row class="page-break">
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">Technician Signature</h5>
        </div>
      </v-col>

      <v-col cols="6">
        <table class="mt-5">
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <b>Name</b>
              <div>
                {{ item.technician.name }}
              </div>
            </td>
          </tr>
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <b>Phone</b>
              <div>
                {{ item.technician.phone_number }}
              </div>
            </td>
          </tr>
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <b>Email</b>
              <div>
                {{ item.technician.email }}
              </div>
            </td>
          </tr>
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <b>Date Time</b>
              <div>
                {{ item.technician_signed_datetime }}
              </div>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="6" class="d-flex justify-center">
        <v-card
          elevation="0"
          class="mt-2"
          style="width: 175px"
          v-if="item.sign"
        >
          <v-img :src="item.sign"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">Customer Signature</h5>
        </div>
      </v-col>

      <v-col cols="6">
        <table class="mt-5">
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <b>Name</b>
              <div>
                {{ item.customer_name }}
              </div>
            </td>
          </tr>
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <b>Phone</b>
              <div>
                {{ item.customer_phone }}
              </div>
            </td>
          </tr>
          <tr class="bottom-border">
            <td class="pa-1" style="border: none">
              <b>Date Time</b>
              <div>
                {{ item.customer_signed_datetime }}
              </div>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="6" class="d-flex justify-center">
        <v-card
          elevation="0"
          class="mt-2"
          style="width: 175px"
          v-if="item.customer_sign"
        >
          <v-img :src="item.customer_sign"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="footer-print top-border">
      <v-col cols="4" class="footer-font-size"
        ><small
          >{{ item.equipment_category.name }} Preventive Maintenance
          Report</small
        ></v-col
      >
      <v-col cols="4" class="footer-font-size text-center">
        <small> {{ item.date }}</small>
      </v-col>
      <v-col cols="4" class="footer-font-size text-right">
        <small>Page 1/1</small>
      </v-col>
    </v-row>

    <v-row class="page-break">
      <v-col cols="12" class="bottom-border">
        <div class="my-blue darken-3 white--text">
          <h5 class="pa-1">Attachments</h5>
        </div>
      </v-col>
      <v-col
        cols="6"
        v-for="(photo, index) in attachments"
        :key="index"
        class="pa-2"
      >
        <h4>
          {{ photo || "---" }}
        </h4>
        <v-img
          :src="`http://192.168.2.24:8001/checklist/${item.id}/${photo}`"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "print",
  auth: false,
  data() {
    return {
      dialog: false,
      loading: true,
      checkboxModel: "",
      attachments: [],
      item: null,
      totalPages: 0,
      equipment: {},
    };
  },
  mounted() {
    setTimeout(() => {
      this.printContent();
    }, 5000);
  },
  async created() {
    await this.$axios
      .get(`/form_entry/${this.$route.params.id}`)
      // .get(`https://amcbackend.mytime2cloud.com/api/form_entry/1`)
      .then(({ data }) => {
        this.item = data;
        this.attachments = data.checklist.checklist
          .flatMap((e) => e.questions.map((q) => q.attachment_name))
          .filter((e) => e !== null)
          .filter((e) => e !== undefined);

        this.equipment = data?.equipment_category?.equipment;
      });
  },
  watch: {},
  methods: {
    getCellStyle(selectedOption) {
      if (["Excellent", "Good", "Yes"].includes(selectedOption)) {
        return "my-green";
      } else if (["N/A"].includes(selectedOption)) {
        return "grey lighten-2";
      } else {
        return "my-red";
      }
    },

    printContent() {
      window.print();
    },
  },
};
</script>
<style scoped>
@import url("@/assets/amc-report.css");
</style>
