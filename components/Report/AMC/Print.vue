<template>
  <v-dialog v-model="dialog" width="700">
    <!-- <v-overlay :value="loading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-overlay> -->
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon :color="iconColor" small> mdi-eye </v-icon>
        View
      </span>
    </template>

    <ReportAMCCard :payload="item" />
  </v-dialog>
</template>
<script>
export default {
  props: ["item", "iconColor"],
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
          // this.printContent();
        }, 3000);
      }
    },
  },
  methods: {
    printContent() {
      window.print();
    },
  },
};
</script>

<!-- <style>
.report-font span,
.report-font div,
.report-font {
  font-size: 9pt !important;
}
@media print {
  /* Hide everything except the v-dialog content */
  @page {
    size: A4;
    margin-top: 30px;
  }
  /* body {
    height: 100px !important;
    overflow: hidden !important;
  } */

  body * {
    visibility: hidden;
  }
  /* Display only the v-dialog content */
  .report-print * {
    visibility: visible;
    font-family: "Open Sans", sans-serif;
  }
  body {
    font-family: sans-serif;
    margin: 0;
  }
  .report-font span,
  .report-font div,
  .report-font {
    font-size: 9pt !important;
  }
  .footer-print {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .ignore-print {
    display: none !important;
  }
  .report-print {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 10px; /* Adjust padding as needed */
  }
}
</style> -->
