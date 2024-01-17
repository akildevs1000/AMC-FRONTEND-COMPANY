<template>
  <v-dialog v-model="dialog" width="750">
    <v-overlay :value="loading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <template v-slot:activator="{ on, attrs }">
      <span
        v-show="display"
        style="cursor: pointer"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon :color="iconColor" small> mdi-printer </v-icon>
        Print
      </span>
    </template>

    <QuotationV1SinglePreviewCard :payload="item" />
  </v-dialog>
</template>
<script>
export default {
  props: {
    item: Object,
    iconColor: String,
    display: {
      type: Boolean,
      default: true, // Set the default value to true
    },
  },
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
    printContent() {
      window.print();
    },
  },
};
</script>
<style>
@media print {
  /* Hide everything except the v-dialog content */
  @page {
    size: A4; /* Set your desired page size */
    margin-top: 30px; /* Adjust margins as needed */
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
