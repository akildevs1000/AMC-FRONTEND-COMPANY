<template>
  <v-container class="mt-5">
    <v-row v-if="attachments.length < 5">
      <v-col md="12" cols="12" sm="12" dense class="text-right">
        <v-btn small class="primary" @click="addItem">
          Add Item(s)
          <v-icon small>mdi-plus-circle-outline</v-icon></v-btn
        >
        <!-- <v-icon color="primary" @click="addItem">mdi-plus-circle</v-icon> -->
      </v-col>
    </v-row>
    <table class="my-1">
      <tr>
        <th>Title</th>
        <th>Attachment</th>
        <th>Start Date</th>
        <th>Expire Date</th>
        <th>Action</th>
      </tr>
      <tr v-for="(d, index) in attachments" :key="index">
        <td style="width: 250px">
          <v-text-field
            dense
            outlined
            type="text"
            v-model="d.title"
            :rules="TitleRules"
            :hide-details="true"
          ></v-text-field>
        </td>
        <td style="width: 250px">
          <UploadAttachment
            @file-selected="(e) => handleFileSelected(index, e)"
          />
        </td>
        <td style="width: 250px">
          <DatePicker
            label="Start Date"
            :default_date="d.start_date"
            @date="
              (e) => {
                d.start_date = e;
              }
            "
          />
        </td>
        <td style="width: 250px">
          <DatePicker
            label="Expire Date"
            :default_date="d.expire_date"
            @date="
              (e) => {
                d.expire_date = e;
              }
            "
          />
        </td>
        <td>
          <v-icon color="red" @click="removeItem(index)">mdi-delete</v-icon>
        </td>
      </tr>
    </table>
    <v-row no-gutters v-if="attachments.length && attachments.length < 5">
      <v-col cols="12" class="text-right">
        <v-btn small @click="submit" class="primary">Submit</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <table>
          <tr>
            <th>Reference Id #</th>
            <th>Title</th>
            <th>Attachment</th>
            <th>Action</th>
          </tr>
          <tr v-for="(d, index) in data" :key="index">
            <td>{{ d.id }}</td>
            <td>{{ d.title }}</td>
            <td>
              <ViewAttachment v-if="d.attachment" :src="d.attachment" />
            </td>
            <td cols="6">
              <v-icon color="red" @click="deleteItem(d.id, index)"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["id", "items"],
  data: () => ({
    loading: false,
    text: "",
    dateMenu: false,
    dateMenu2: false,
    dateMenu3: false,
    dateMenu4: false,
    attachments: [
      {
        title: "",
        attachment: "",
        start_date: "2024-01-02",
        expire_date: "2024-01-02",
      },
    ],
    data: [
      {
        title: "",
        attachment: "",
        start_date: "",
        expire_date: "",
      },
    ],
    payload: {},
    errors: [],
    FileRules: [
      (value) =>
        !value ||
        value.size < 200000 ||
        "File size should be less than 200 KB!",
    ],
    TitleRules: [(v) => !!v || "Title is required"],
    previewImage: `/no-business_profile.png`,
  }),
  async created() {
    this.data = this.items;
  },
  methods: {
    handleFileSelected(index, file) {
      this.attachments[index].attachment = file;
    },
    getRandomId() {
      return Math.random().toString(36).substring(2);
    },
    removeItem(index) {
      this.attachments.splice(index, 1);
    },

    deleteItem(id, index) {
      this.$axios
        .delete(`/amc/company/document/delete/${id}`)
        .then(({ data }) => {
          this.loading = false;
          if (!data.status) {
            alert("Cannot delete");
          } else {
            this.data.splice(index, 1);
          }
        })
        .catch((e) => console.log(e));
    },

    addItem() {
      this.attachments.push({
        title: "",
        attachment: "",
        start_date: "2024-01-02",
        expire_date: "2024-01-02",
      });
    },
    submit() {
      this.loading = true;
      let options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let payload = new FormData();

      this.attachments.forEach((e, i) => {
        payload.append(`items[${i}][attachment]`, e.attachment);
        payload.append(`items[${i}][title]`, e.title);
        payload.append(`items[${i}][start_date]`, e.start_date);
        payload.append(`items[${i}][expire_date]`, e.expire_date);
      });

      this.$axios
        .post(`/amc/company/document/${this.id}`, payload, options)
        .then(({ data }) => {
          this.loading = false;
          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.errors = [];
            this.$emit("child-success");
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
