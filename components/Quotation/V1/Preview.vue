<template>
  <v-dialog v-model="dialog" width="620">
    <template v-slot:activator="{ on, attrs }">
      <v-btn block color="primary" dark v-bind="attrs" v-on="on">
        <v-icon small>mdi-{{ icon }}</v-icon
        >{{ label }}
      </v-btn>
    </template>
    <QuotationV1SinglePreviewCard :payload="payload" />
  </v-dialog>
</template>
<script>
export default {
  props: ["payload", "label", "icon"],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
