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