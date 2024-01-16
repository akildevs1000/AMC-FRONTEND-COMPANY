<template>
  <v-dialog v-model="dialog" width="620">
    <div class="white text-right">
      <v-icon @click="dialog = false" class="mx-3 mt-3" color="primary"
        >mdi-close-circle-outline</v-icon
      >
    </div>
    <InvoiceV1DOPreviewCard :payload="payload" />
  </v-dialog>
</template>
<script>
export default {
  props: ["payload"],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
