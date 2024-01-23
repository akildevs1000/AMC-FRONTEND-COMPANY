<template>
    <v-container
    style="background: white !important"
    elevation="0"
    class="card-font-color report-print"
  >
    <v-row class="pa-5">
      <v-col cols="6">
        <div style="width: 250px">
          <v-img :src="`/mail-logo.png`"></v-img>
        </div>
      </v-col>
      <v-col cols="6" class="text-right">
        <div>
          <h4 class="mt-2">AKIL SECURITY AND ALARM SYSTEMS</h4>
        </div>
        <div class="table-font-color">DUBAI - UNITED ARAB EMIRATES</div>
        <div class="table-font-color">+971 4 3939 562, INFO@AKILGROUP.COM</div>
      </v-col>

      <!-- <v-col cols="12">
        <div class="text-center">
          <h4 class="uppercase-text tb-border">
            <v-container>
              {{ item.equipment_category.name }} Preventive Maintenance
              Service Report
            </v-container>
          </h4>
        </div>
        <div class="bottom-border">
          <v-container> Date </v-container>
        </div>
      </v-col> -->
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <div class="text-center">
          <h4 class="uppercase-text tb-border py-2">
            {{ item.equipment_category.name }} Preventive Maintenance Service
            Report
          </h4>
        </div>
      </v-col>
      <v-col cols="12" class="mx-2">
        <v-row no-gutters>
          <v-col cols="4"> Date: {{ item.date }} </v-col>
          <v-col cols="4">
            AMC Agreement Number: <b>A{{ item.amc.contract.id }}</b>
          </v-col>
          <v-col cols="4">
            Service Report Number:
            <span class="red--text">{{ item.id }}</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="page-break">
      <v-col cols="12" class="tb-border py-1">
        <div class="grey white--text">
          <h5 class="">
            <v-container> Customer </v-container>
          </h5>
        </div>
      </v-col>
      <v-col cols="12">
        <v-container>
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
        </v-container>
      </v-col>
    </v-row>

    <v-row class="pb-3">
      <v-col>
        <table class="table-font-color">
          <thead>
            <tr>
              <th
                class="left-border right-border grey white--text"
                style="text-align: left"
                colspan="6"
              >
                CheckList: {{ item.equipment_category.name }}
              </th>
            </tr>
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
            <tr v-for="(item, i) in item.checklists" :key="i">
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
                {{ item.attachment ? `Attachment ${i + 1}` : "" }}
              </td>
              <td class="left-borders right-border text-center">
                {{ item.remarks }}
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" class="tb-border py-1">
        <div class="grey white--text">
          <h5 class="">
            <v-container> General Observations & Comments </v-container>
          </h5>
        </div>
      </v-col>
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col cols="12" class="bottom-border"> </v-col>
            <v-col cols="12" class="bottom-border"> </v-col>
            <v-col cols="12" class="bottom-border"> </v-col>
            <v-col cols="12" class="bottom-border"> </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" class="tb-border py-1">
        <div class="grey white--text">
          <h5 class="">
            <v-container> </v-container>
          </h5>
        </div>
      </v-col>
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

    <!-- <div class="grey mt-5 white--text report-font text-center page-break-before">
      <div>
        AKIL SECURITY AND ALARM SYSTEMS LLC - DUBAI - UNITED ARAB EMIRATES
      </div>
      <div>
        TEL + 971 4 39 39 562, P.O.BOX: 83481, MOBILE/WHATSAPP: + 971 55 330
        3991, EMAIL: MAIL@AKILGROUP.COM
      </div>
    </div> -->

    <v-row no-gutters class="mt-5" >
      <v-col
        class="my-2"
        cols="12"
        v-for="(src, index) in attachments"
        :key="index"
      >
        <v-card outlined>
          <v-container>
            <div class="card-font-color display-1 text-center">
              {{ src.slug }}
            </div>
            <v-img :src="src.attachment"></v-img>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["item", "iconColor"],
  data() {
    return {
      dialog: false,
      loading: true,
      checkboxModel: "",
      attachments: [],
    };
  },
  created() {
    this.attachments = this.item.checklists
      .filter((e) => e !== null && e.attachment !== null)
      .map((e, i) => ({
        [`slug`]:
          e !== null && e.attachment !== null ? `Attachment ${i + 1} ` : false,
        attachment: e.attachment,
      }));
  },
  watch: {
    dialog(value) {
      if (value) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          // this.printContent();
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
@import url("@/assets/amc-report.css");
</style>