<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-pencil </v-icon>
        Edit
      </span>
    </template>
    <v-card>
      <v-card-title>
        Edit Ticket
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
            <td>
              <v-text-field
                dense
                outlined
                type="text"
                v-model="payload.title"
                :hide-details="!errors.title"
                :error-messages="errors && errors.title ? errors.title[0] : ''"
                disabled
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>Description</th>
            <td>
              <v-textarea
                rows="3"
                dense
                outlined
                type="text"
                v-model="payload.description"
                :hide-details="!errors.description"
                :error-messages="
                  errors && errors.description ? errors.description[0] : ''
                "
                disabled
              ></v-textarea>
            </td>
          </tr>
          <tr>
            <th>Prority</th>
            <td>
              <v-select
                :items="priorities"
                item-value="id"
                item-text="name"
                dense
                outlined
                v-model="payload.priority_id"
                :hide-details="!errors.priority_id"
                :error-messages="
                  errors && errors.priority_id ? errors.priority_id[0] : ''
                "
              ></v-select>
            </td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
              <v-select
                :items="[`Open`, `In Progress`, `Pending`, `Close`]"
                dense
                outlined
                v-model="payload.status"
                :hide-details="!errors.status"
                :error-messages="
                  errors && errors.status ? errors.status[0] : ''
                "
              ></v-select>
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
          <tr>
            <th>Notes/Comments</th>
            <td>
              <v-textarea
                placeholder="Write comments"
                rows="3"
                dense
                outlined
                type="text"
                v-model="payload.comments"
                :hide-details="!errors.comments"
                :error-messages="
                  errors && errors.comments ? errors.comments[0] : ''
                "
              ></v-textarea>
            </td>
          </tr>
        </table>
        <v-row>
          <v-col cols="12" class="text-right mt-5">
            <v-btn small @click="dialog = false">Close</v-btn>
            <v-btn small :loading="loading" @click="submit" class="primary"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["item"],
  data: () => ({
    dialog: false,
    loading: false,
    upload: {
      name: "",
    },
    payload: {},
    errors: [],
    priorities: [],
    previewImage: "/no-business_profile.png",
  }),
  created() {
    this.payload = this.item;
    this.$axios
      .get("/priority_list")
      .then(({ data }) => (this.priorities = data));
  },
  methods: {
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

    onpick_attachment() {
      this.$refs.attachment_input.click();
    },

    attachment(e) {
      this.upload.name = e.target.files[0] || "";

      let input = this.$refs.attachment_input;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },

    submit() {
      let payload = new FormData();

      payload.append("title", this.payload.title);
      payload.append("priority_id", this.payload.priority_id);
      payload.append("status", this.payload.status);
      payload.append("description", this.payload.description);

      payload.append("user_id", this.$auth.user.id);

      if (this.payload.comments) {
        payload.append("comments", this.payload.comments);
      }

      this.$axios
        .post("update-ticket/" + this.payload.id, payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
            return;
          }

          this.errors = [];
          this.dialog = false;
          this.$emit("success");
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
