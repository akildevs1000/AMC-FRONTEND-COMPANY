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
        Edit Contract
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
            <th>Value</th>
            <td>
              <v-text-field
                dense
                outlined
                type="text"
                v-model="payload.value"
                :hide-details="!errors.value"
                :error-messages="errors && errors.value ? errors.value[0] : ''"
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>Contract Date</th>
            <td>
              <DatePicker
                label="Contract Date"
                :default_date="payload.date"
                @date="
                  (e) => {
                    payload.date = e;
                  }
                "
              />
            </td>
          </tr>
          <tr>
            <th>Start Date</th>
            <td>
              <DatePicker
                label="Start Date"
                :default_date="payload.start_date"
                @date="
                  (e) => {
                    payload.start_date = e;
                  }
                "
              />
            </td>
          </tr>
          <tr>
            <th>Expire Date</th>
            <td>
              <DatePicker
                label="Expire Date"
                :default_date="payload.expire_date"
                @date="
                  (e) => {
                    payload.expire_date = e;
                  }
                "
              />
            </td>
          </tr>
          <tr>
            <th>AMC Type</th>
            <td>
              <v-select
                :items="AMCTypes"
                label="Type Of AMC"
                item-value="id"
                item-text="name"
                dense
                outlined
                v-model="payload.amc_type_id"
                :hide-details="!errors.amc_type_id"
                :error-messages="
                  errors && errors.amc_type_id ? errors.amc_type_id[0] : ''
                "
              ></v-select>
            </td>
          </tr>

          <tr>
            <th>Visit Type</th>
            <td>
              <v-select
                :items="VisitTypes"
                item-value="id"
                item-text="name"
                label="Type Of Visit"
                dense
                outlined
                v-model="payload.visit_type_id"
                :hide-details="!errors.visit_type_id"
                :error-messages="
                  errors && errors.visit_type_id ? errors.visit_type_id[0] : ''
                "
              ></v-select>
            </td>
          </tr>

          <tr>
            <th>Service Call Type</th>
            <td>
              <v-select
                :items="ServiceCallTypes"
                item-value="id"
                item-text="name"
                label="Type Of Service Call"
                dense
                outlined
                v-model="payload.service_call_type_id"
                :hide-details="!errors.service_call_type_id"
                :error-messages="
                  errors && errors.service_call_type_id
                    ? errors.service_call_type_id[0]
                    : ''
                "
              ></v-select>
            </td>
          </tr>

          <tr>
            <th>Status</th>
            <td>
              <v-switch v-model="payload.status"></v-switch>
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
  props: ["id", "item"],
  data: () => ({
    dialog: false,
    loading: false,
    upload: {
      name: "",
    },
    payload: {},
    errors: [],

    AMCTypes: [],
    VisitTypes: [],
    ServiceCallTypes: [],
  }),
  created() {
    this.payload = this.item;
    this.$axios.get(`amc_type_list`).then(({ data }) => {
      this.AMCTypes = data;
    });
    this.$axios.get(`visit_type_list`).then(({ data }) => {
      this.VisitTypes = data;
    });
    this.$axios.get(`service_call_type_list`).then(({ data }) => {
      this.ServiceCallTypes = data;
    });
  },
  methods: {
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
          // this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },

    submit() {
      let payload = new FormData();

      payload.append("date", this.payload.date);
      payload.append("start_date", this.payload.start_date);
      payload.append("expire_date", this.payload.expire_date);
      payload.append("amc_type_id", this.payload.amc_type_id);
      payload.append("visit_type_id", this.payload.visit_type_id);
      payload.append("service_call_type_id", this.payload.service_call_type_id);
      payload.append("value", this.payload.value);

      if (this.upload.name) {
        payload.append("attachment", this.upload.name);
      }

      payload.append("status", this.payload.status);

      this.$axios
        .post("update-contract/" + this.payload.id, payload)
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
