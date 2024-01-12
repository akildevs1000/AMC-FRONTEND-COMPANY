<template>
  <v-dialog v-model="dialog" height="700" width="1100">
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="primary" v-bind="attrs" v-on="on"
        >mdi-clipboard-check</v-icon
      >
      Checklist
    </template>
    <v-card>
      <v-card-title>
        View Checklist
        <!-- {{ items.length }} -->
        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = false"
          ><v-icon color="primary">mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-title>

      <v-card-text>
        <table>
          <tr>
            <th style="width: 200px">Question</th>
            <th style="width: 0px; padding: 0px !important" class="text-center">
              Status
            </th>
            <th style="width: 0px; padding: 0px !important" class="text-center">
              Attachment
            </th>
            <th style="width: 230px">Remarks</th>
          </tr>

          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.question.name }}</td>
            <td class="text-center">{{ item.selectedOption }}</td>
            <td style="width: 0px; padding: 0px !important" class="text-center">
              <ViewAttachment v-if="item.attachment" :src="item.attachment" />
            </td>
            <td>{{ item.remarks }}</td>
          </tr>
        </table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
