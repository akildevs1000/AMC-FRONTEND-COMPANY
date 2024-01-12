<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-clipboard-check </v-icon>
        Assign
      </span>
    </template>
    <v-card>
      <v-card-title> Assign Service Call </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              multiple
              :items="technicians"
              :item-text="`name`"
              item-value="id"
              label="Select Technician(s)"
              dense
              outlined
              v-model="payload.technicianIds"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" class="text-right my-1">
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
      serviceCallIds: [],
      technicianIds: [],
    },

    e1: 1,
    errors: [],
    previewImage: "/no-business_profile.png",

    companies: [],
    technicians: [],
    priorities: [],
  }),
  created() {
    this.preloader = false;

    this.payload.serviceCallIds = [this.item.id];

    this.$axios
      .get("/technician_list")
      .then(({ data }) => (this.technicians = data.filter(tech => !this.item.technicians.some(call => call.id == tech.id))));
  },
  methods: {
    submit() {
      this.$axios
        .post("/service_call_technician_assigning", this.payload)
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
