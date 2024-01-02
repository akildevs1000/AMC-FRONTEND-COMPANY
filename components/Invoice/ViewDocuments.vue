<template>
  <v-dialog persistent v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-file </v-icon>
        View Documents
      </span>
    </template>
    <v-card>
      <v-card-title>
        View Documents # {{ item.invoice_number }}
        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = false"
          ><v-icon color="primary">mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <table>
          <tr>
            <th>Title</th>
            <th>Attachment</th>
          </tr>
          <tr v-for="(d, index) in item.documents" :key="index">
            <td style="width: 150px">
             {{d.title}}
            </td>
            <td style="width: 250px">
             <ViewAttachment v-if="d.attachment" :src="d.attachment" />
            </td>
          </tr>
        </table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["id", "item"],
  data: () => ({
    dialog: false,
  }),
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
