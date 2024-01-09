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
        View Ticket

        <v-chip
          class="mx-2"
          dark
          small
          :color="statusRelatedColor(item.status)"
          >{{ item.status }}</v-chip
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
            <th>Title</th>
            <td>{{ payload.title }}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{{ payload.description }}</td>
          </tr>
          <tr>
            <th>Prority</th>
            <td>
              <v-chip dark small :color="priorityRelatedColor(item.prority)">{{
                item.prority
              }}</v-chip>
            </td>
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
          <tr>
            <th>History</th>
            <td>
              <TimeLine
                :key="getRandomId()"
                v-if="payload.ticket_history"
                :id="payload.id"
                :data="payload.ticket_history"
              />
            </td>
          </tr>
          <tr>
            <th>Ticket Open DateTime</th>
            <td>{{ payload.ticket_open_date_time }}</td>
          </tr>
          <tr>
            <th>Ticket Close DateTime</th>
            <td>{{ payload.ticket_close_date_time }}</td>
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
    priorityRelatedColor(value) {
      let color = {
        High: "red",
        Medium: "blue",
        Low: "grey",
      };
      return color[value];
    },

    statusRelatedColor(value) {
      let color = {
        Open: "green",
        "In Progress": "blue",
        Close: "grey",
      };
      return color[value];
    },
  },
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
