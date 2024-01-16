<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-clipboard-check </v-icon>
        Assign
      </span>
    </template>
    <v-card>
      <v-card-title> Assign Ticket </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              :items="technicians"
              :item-text="`name`"
              item-value="id"
              label="Select Technician(s)"
              dense
              outlined
              v-model="technicianId"
              hide-details
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <DatePicker
              label="Schedule Date"
              :default_date="payload.schedule_date"
              @date="
                (e) => {
                  payload.schedule_date = e;
                }
              "
            />
          </v-col>
          <v-col cols="12" class="text-right">
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
    snackbar: false,
    response: "",
    preloader: false,
    loading: false,
    upload: {
      name: "",
    },

    payload: {
      ticketIds: [],
      technicianIds: [],
    },
    technicianId: null,

    e1: 1,
    errors: [],
    previewImage: "/no-business_profile.png",

    companies: [],
    technicians: [],
    priorities: [],
  }),
  created() {
    this.preloader = false;

    this.$axios
      .get("/technician_list")
      .then(
        ({ data }) =>
          (this.technicians = data.filter(
            (tech) => !this.item.technicians.some((call) => call.id == tech.id)
          ))
      );
    // .then(({ data }) => (this.technicians = data));
  },
  methods: {
    submit() {
      this.payload.ticketIds = [this.item.id];
      this.payload.technicianIds = [this.technicianId];

      this.$axios
        .post("/ticket_technician_assigning", this.payload)
        .then(({ data }) => {
          this.loading = false;
          this.errors = [];
          this.$emit("success");
          this.dialog = false;
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
