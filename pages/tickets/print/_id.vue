<template>
  <div v-if="item && item.id" class="card-font-color report-print">
    <v-row class="mb-3">
      <!-- <v-col cols="2" class="text-right"
        >{{ currentPage }}/{{ totalPages }}
      </v-col> -->
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
          <h4 class="uppercase-text tb-border py-2">Service Report</h4>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4 bottom-border"> Date: {{ item.date }} </v-col>
      <v-col cols="4 bottom-border">
        AMC Agreement Number: <b>A{{ item.ticket.company.contract.id }}</b>
      </v-col>
      <v-col cols="4 bottom-border">
        Ticket Number:
        <span class="red--text">{{ item.id }}</span>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="grey white--text">
          <h5 class="pa-1">Customer</h5>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="12" class="bottom-border">
            Company Name: <b>{{ item.ticket.company.name }}</b>
          </v-col>
          <v-col cols="6" class="bottom-border">
            License Issuer:
            <b>{{ item.ticket.company.trade_license.issued_by }}</b>
          </v-col>
          <v-col cols="6" class="bottom-border">
            License Number:
            <b>{{ item.ticket.company.trade_license.license_no }}</b>
          </v-col>
          <v-col cols="12" class="bottom-border">
            Address:{{ item.ticket.company.address }}
          </v-col>
          <v-col cols="4" class="bottom-border"> LPO Number: </v-col>
          <v-col cols="4" class="bottom-border">
            AMC Since: {{ item.ticket.company.contract.show_start_date }}
          </v-col>
          <v-col cols="4" class="bottom-border">
            AMC Expire: {{ item.ticket.company.contract.show_expire_date }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="grey white--text">
          <h5 class="pa-1">Customer Complain</h5>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="6" class="bottom-border">
            Reported By: {{ item.ticket.company.contact.name }},
            {{ item.ticket.company.contact.position }}
          </v-col>
          <v-col cols="6" class="bottom-border">
            Reported Date: {{ item.ticket.ticket_open_date_time }}
          </v-col>
          <v-col cols="6" class="bottom-border">
            Product Category:
            <b>{{ item.equipment_category.name }}</b>
          </v-col>
          <v-col cols="6" class="bottom-border">
            Problem:
            <b></b>
          </v-col>
          <v-col cols="12" class="bottom-border">
            Description:
            {{ item.ticket.description }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="grey white--text">
          <h5 class="pa-1">Engineer Report</h5>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="12" class="bottom-border">
            Actual Problem: {{ item.actual_problem }}
          </v-col>
          <v-col cols="12" class="bottom-border">
            Action Taken: {{ item.action_taken }}
          </v-col>
          <v-col cols="12" class="bottom-border">
            Description:
            {{ item.description }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="4"
        >Ticket Status :
        <span class="red--text">{{ item.ticket.status }}</span></v-col
      >
      <v-col cols="4"
        >Date :
        <span class="red--text">{{
          item.ticket.ticket_close_date_time
        }}</span></v-col
      >
      <v-col cols="4"
        >Engineer Name :
        <span class="red--text">{{ item.technician.name }}</span></v-col
      >
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" class="bottom-border">
        <div class="grey white--text">
          <h5 class="pa-1">Engineer Observations & Comments</h5>
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
        <div class="grey white--text">
          <h5 class="pa-1">Acknowledge</h5>
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
            <v-col></v-col>
            <v-col cols="12" class="bottom-border">Customer </v-col>
            <v-col cols="12" class="bottom-border">Name</v-col>
            <v-col cols="12" class="bottom-border">Phone</v-col>
            <v-col cols="12" class="bottom-border">Sign</v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <div v-if="renderPrint" class="mt-5 top-border report-font footer-print">
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-col cols="8" class="text-center"
          >This is a system generated Service Report
        </v-col>
        <v-col cols="2" class="text-right">{{ currentPage }}/{{ totalPages }}</v-col>
      </v-row>
      <!-- <div v-if="getResult && getResult.page">
        {{ (totalPages/totalPages) }} Of {{ totalPages }}
      </div> -->
    </div>

    <v-row
      v-if="item.before_attachment"
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
          <h5 class="pa-1">Before Attachment</h5>
        </div>
      </v-col>

      <v-col cols="12">
        <v-img style="width: 100%" :src="item.before_attachment"></v-img>
      </v-col>
    </v-row>

    <v-row
      v-if="item.after_attachment"
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
          <h5 class="pa-1">After Attachment</h5>
        </div>
      </v-col>

      <v-col cols="12">
        <v-img style="width: 100%" :src="item.after_attachment"></v-img>
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
      renderPrint: false,
      diff: 0,
      totalPages: 0,
      dialog: false,
      loading: true,
      checkboxModel: "",
      attachments: [],
      item: null,
      currentPage: 1,
    };
  },
  computed: {
    // getResult() {
    //   let value = parseInt(this.diff);
    //   let res = value - (value / value);
    //   this.diff -= value - res;
    //   return { page: res };
    // },
  },
  mounted() {
    setTimeout(() => {
      this.setPageCount();
      this.renderPrint = true;
    }, 5000);
  },
  async created() {
    await this.$axios
      .get(`/form_entry/${this.$route.params.id}`)
      .then(({ data }) => {
        console.log(data);
        this.item = data;
        // this.attachments = data.checklists
        //   .filter((e) => e !== null && e.attachment !== null)
        //   .map((e, i) => ({
        //     [`slug`]:
        //       e !== null && e.attachment !== null ? `PIC ${i + 1} ` : false,
        //     attachment: e.attachment,
        //   }));
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
    async getCurrentPage() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const current = this.totalPages - this.diff + 1;
          this.diff -= 1;
          this.currentPage = current;
          resolve(current);
        }, 1000);
      });
    },

    setPageCount() {
      let content = document.querySelectorAll(".print-pages");
      this.totalPages = content.length;
      this.diff = parseInt(this.totalPages);
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
