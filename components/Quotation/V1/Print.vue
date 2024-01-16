<template>
  <v-dialog v-model="dialog" width="620">
    <v-overlay :value="loading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <template v-slot:activator="{ on, attrs }">
      <v-btn block color="primary" dark v-bind="attrs" v-on="on">
        <v-icon small>mdi-printer</v-icon>Print
      </v-btn>
    </template>
    <QuotationV1SinglePreviewCard :payload="payload" />
  </v-dialog>
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
