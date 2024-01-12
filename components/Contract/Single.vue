<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-eye </v-icon>
        View
      </span>
    </template>
    <v-card>
      <v-card-title>
        View Contract
        <v-chip
          class="mx-2"
          dark
          small
          :color="item.status == 1 ? `green` : `red`"
          >{{ item.status == 1 ? "Active" : "InActive" }}</v-chip
        >

        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = false"
          ><v-icon color="primary">mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-title>

      <v-card-text>
        <table>
          <tr>
            <th>Reference #</th>
            <td>
              <b>{{ payload.id }}</b>
            </td>
          </tr>
          <tr>
            <th>Contract Value</th>
            <td>{{ payload.value }}</td>
          </tr>

          <tr>
            <th>Contract Date</th>
            <td>{{ payload.date }}</td>
          </tr>

          <tr>
            <th>Contract Start Date</th>
            <td>{{ payload.start_date }}</td>
          </tr>

          <tr>
            <th>Contract Expire Date</th>
            <td>{{ payload.expire_date }}</td>
          </tr>

          <tr>
            <th>AMC Type</th>
            <td>{{ payload.amc_type.name }}</td>
          </tr>

          <tr>
            <th>Visit Type</th>
            <td>{{ payload.visit_type.name }}</td>
          </tr>

          <tr>
            <th>Attachment</th>
            <td>
              <ViewAttachment
                v-if="payload.attachment"
                :src="payload.attachment"
              />
            </td>
          </tr>
        </table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["item"],

  data: () => ({
    dialog: false,
    payload: {},
  }),

  created() {
    this.payload = this.item;
  },
  methods: {
    getRandomId() {
      return Math.random().toString(36).substring(2);
    },
  },
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
