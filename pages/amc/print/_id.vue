<template>
  <div v-if="item && item.id" class="card-font-color report-print">
    <v-row class="mb-3">
      <v-col cols="12" class="text-right print-pages">
        {{ totalPages }}
        <!-- <div class="pageBox text-right">
          <div class="page-number"></div>
        </div> -->
      </v-col>
      <v-col cols="6">
        <div style="width: 150px">
          <v-img :src="`/mail-logo.png`"></v-img>
        </div>
      </v-col>
      <v-col cols="6" class="text-right">
        <div><b>AKIL SECURITY AND ALARM SYSTEMS</b></div>
        <div class="table-font-color">DUBAI - UNITED ARAB EMIRATES</div>
        <div class="table-font-color">+971 4 3939 562, INFO@AKILGROUP.COM</div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <div class="text-center">
          <h4 class="uppercase-text tb-border py-2">
            {{ item.equipment_category.name }} Preventive Maintenance Report
          </h4>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4 bottom-border"> Date: {{ item.date }} </v-col>
      <v-col cols="4 bottom-border">
        AMC Agreement Number: <b>A{{ item.amc.contract.id }}</b>
      </v-col>
      <v-col cols="4 bottom-border">
        Service Report Number:
        <span class="red--text">{{ item.id }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="grey white--text">
          <h5 class="pa-1">Customer</h5>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="12" class="bottom-border">
            Company Name: <b>{{ item.amc.contract.company.name }}</b>
          </v-col>
          <v-col cols="6" class="bottom-border">
            License Issuer:
            <b>{{ item.amc.contract.company.trade_license.issued_by }}</b>
          </v-col>
          <v-col cols="6" class="bottom-border">
            License Number:
            <b>{{ item.amc.contract.company.trade_license.license_no }}</b>
          </v-col>
          <v-col cols="12" class="bottom-border">
            Address:{{ item.amc.contract.company.address }}
          </v-col>
          <v-col cols="4" class="bottom-border"> LPO Number: </v-col>
          <v-col cols="4" class="bottom-border">
            AMC Since: {{ item.amc.contract.show_start_date }}
          </v-col>
          <v-col cols="4" class="bottom-border">
            AMC Expire: {{ item.amc.contract.show_expire_date }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12">
        <div class="grey white--text">
          <h5 class="pa-1">CheckList: {{ item.equipment_category.name }}</h5>
        </div>
      </v-col>
      <v-col>
        <table class="table-font-color">
          <thead>
            <tr>
              <th class="left-border text-center" style="width: 10px">S.No</th>
              <th class="left-borders table-description" style="width: 350px">
                Description
              </th>
              <th class="left-borders text-center">Status</th>
              <th class="left-borders text-center">Attachment</th>
              <th class="left-borders right-border text-center">Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in item.checklists.slice(0, 19)" :key="i">
              <td class="left-border text-center">
                {{ i + 1 }}
              </td>
              <td class="left-borders">
                {{ item.question.name }}
              </td>
              <td class="left-borders text-center">
                {{ item.selectedOption }}
              </td>
              <td class="left-borders text-center">
                {{ item.attachment ? `PIC ${i + 1}` : "" }}
              </td>
              <td class="left-borders right-border text-center">
                {{ item.remarks }}
              </td>
            </tr>
          </tbody>
        </table>

        <v-row
          class="mb-3 page-break print-pages"
          v-if="item.checklists.length > 18"
        >
          <v-col cols="6">
            <div style="width: 150px">
              <v-img :src="`/mail-logo.png`"></v-img>
            </div>
          </v-col>
          <v-col cols="6" class="text-right">
            <div><b>AKIL SECURITY AND ALARM SYSTEMS</b></div>
            <div class="table-font-color">DUBAI - UNITED ARAB EMIRATES</div>
            <div class="table-font-color">
              +971 4 3939 562, INFO@AKILGROUP.COM
            </div>
          </v-col>
        </v-row>
        <table v-if="item.checklists.length > 18" class="table-font-color">
          <thead>
            <tr>
              <th class="left-border text-center" style="width: 10px">S.No</th>
              <th class="left-borders table-description" style="width: 350px">
                Description
              </th>
              <th class="left-borders text-center">Status</th>
              <th class="left-borders text-center">Attachment</th>
              <th class="left-borders right-border text-center">Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in item.checklists.slice(19)" :key="i">
              <td class="left-border text-center">
                {{ i + 20 }}
              </td>
              <td class="left-borders">
                {{ item.question.name }}
              </td>
              <td class="left-borders text-center">
                {{ item.selectedOption }}
              </td>
              <td class="left-borders text-center">
                {{ item.attachment ? `PIC ${i + 20}` : "" }}
              </td>
              <td class="left-borders right-border text-center">
                {{ item.remarks }}
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="grey white--text">
          <h5 class="pa-1">General Observations & Comments</h5>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters class="">
      <v-col cols="12">
        <v-row class="px-2">
          <v-col cols="12" class="bottom-border"
            ><li v-for="(t, i) in item.summary.split(`\r\n`)" :key="i">
              {{ t }}
            </li></v-col
          >
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="grey grey--text">
          <h5 class="pa-1">ignore</h5>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="6">
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" class="bottom-border">Engineer</v-col>
            <v-col cols="12" class="bottom-border">Name</v-col>
            <v-col cols="12" class="bottom-border">Phone</v-col>
            <v-col cols="12" class="bottom-border">Sign</v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" class="bottom-border">Customer</v-col>
            <v-col cols="12" class="bottom-border">Name</v-col>
            <v-col cols="12" class="bottom-border">Phone</v-col>
            <v-col cols="12" class="bottom-border">Sign</v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- <div class="grey mt-5 white--text report-font text-center footer-print">
      <div>
        AKIL SECURITY AND ALARM SYSTEMS LLC - DUBAI - UNITED ARAB EMIRATES
      </div>
      <div>
        TEL + 971 4 39 39 562, P.O.BOX: 83481, MOBILE/WHATSAPP: + 971 55 330
        3991, EMAIL: MAIL@AKILGROUP.COM
      </div>
    </div> -->

    <div class="mt-5 top-border report-font footer-print">
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-col cols="8" class="text-center"
          >This is a system generated Preventive Maintenace Report
        </v-col>
        <v-col cols="2" class="text-right">1/{{ this.totalPages }} </v-col>
      </v-row>
      <!-- <div v-if="getResult && getResult.page">
        {{ (totalPages/totalPages) }} Of {{ totalPages }}
      </div> -->
    </div>
    <v-row
      v-for="(src, index) in attachments"
      :key="index"
      no-gutters
      class="mt-5 page-break print-pages"
    >
      <v-col cols="6">
        <div style="width: 150px">
          <v-img :src="`/mail-logo.png`"></v-img>
        </div>
      </v-col>
      <v-col cols="6" class="text-right">
        <div><b>AKIL SECURITY AND ALARM SYSTEMS</b></div>
        <div class="table-font-color">DUBAI - UNITED ARAB EMIRATES</div>
        <div class="table-font-color">+971 4 3939 562, INFO@AKILGROUP.COM</div>
      </v-col>

      <v-col cols="12" class="bottom-border">
        <div class="grey white--text">
          <h5 class="pa-1">{{ src.slug }}</h5>
        </div>
      </v-col>

      <v-col cols="12">
        <v-img :src="src.attachment"></v-img>
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
      pageCounter: 1,
      dialog: false,
      loading: true,
      checkboxModel: "",
      attachments: [],
      item: null,
      totalPages: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.setPageCount();
    }, 2000);
  },
  async created() {
    await this.$axios
      .get(`/form_entry/${this.$route.params.id}`)
      .then(({ data }) => {
        this.item = data;
        this.attachments = data.checklists
          .filter((e) => e !== null && e.attachment !== null)
          .map((e, i) => ({
            [`slug`]:
              e !== null && e.attachment !== null ? `PIC ${i + 1} ` : false,
            attachment: e.attachment,
          }));
      });
  },
  watch: {
    // this.printContent();
    // dialog(value) {
    //   if (value) {
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //       // this.printContent();
    //     }, 3000);
    //   }
    // },
  },
  methods: {
    setPageCount() {
      let content = document.querySelectorAll(".print-pages");
      this.totalPages = content.length;
      // this.diff = parseInt(this.totalPages);
    },
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
@import url("@/assets/amc-report.css");
</style>
