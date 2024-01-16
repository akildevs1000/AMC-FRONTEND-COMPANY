<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="620">
      <v-overlay :value="loading">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
      <InvoiceV1PreviewCard :payload="payload" />
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