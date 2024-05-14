<template>
  <v-dialog v-model="dialog" height="700" width="700">
    <template v-slot:activator="{ on, attrs }">
      <!-- <v-icon color="primary" v-bind="attrs" v-on="on">mdi-attachment</v-icon> -->
      <v-icon v-if="items.length" color="primary" v-bind="attrs" v-on="on"
        >mdi-camera-outline</v-icon
      >
      <small class="mx-2">{{ items.length }}</small>
      <!-- <v-icon color="primary" v-bind="attrs" v-on="on">mdi-file-pdf</v-icon>
      <v-icon color="primary" v-bind="attrs" v-on="on">mdi-paperclip</v-icon> -->
    </template>

    <v-card flat>
      <v-card-title
        >{{ label }} <v-spacer></v-spacer>

        <v-icon @click="dialog = false" color="primary"
          >mdi-close-circle-outline</v-icon
        >
      </v-card-title>
      <v-container v-for="(photo, index) in items" :key="index">
        <v-toolbar dense flat rounded class="primary" dark>
          <h4>{{ photo || "---" }}</h4>
        </v-toolbar>
        <v-img
          class="my-1"
          :src="`http://192.168.2.24:8001/checklist/${form_entry_id}/${photo}`"
        ></v-img>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
    photos: {
      type: Array,
      default: [],
    },
    form_entry_id: {
      default: 0,
    },
  },
  data: () => ({
    dialog: false,
    items: [],
  }),
  created() {
    this.items = this.photos
      .flatMap((e) => e.questions.map((q) => q.attachment_name))
      .filter((e) => e !== null)
      .filter((e) => e !== undefined);
  },
};
</script>
