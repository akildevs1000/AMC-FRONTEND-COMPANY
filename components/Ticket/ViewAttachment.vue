<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-eye </v-icon>
        Attachment
      </span>
    </template>
    <div class="text-right white">
      <v-btn icon @click="dialog = false"
        ><v-icon color="primary">mdi-close-circle-outline</v-icon></v-btn
      >
    </div>
    <v-img :src="src" :alt="altText"></v-img>
  </v-dialog>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
      default: "",
    },
    altText: {
      type: String,
      default: "Image",
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>