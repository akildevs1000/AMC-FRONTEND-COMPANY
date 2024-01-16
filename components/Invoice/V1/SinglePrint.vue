<template>
  <v-dialog v-model="dialog" width="620">
    <v-overlay :value="loading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon :color="iconColor" small> mdi-printer </v-icon>
        Print
      </span>
    </template>

    <InvoiceV1PreviewCard :payload="item" />
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