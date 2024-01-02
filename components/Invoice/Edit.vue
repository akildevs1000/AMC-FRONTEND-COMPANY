<template>
  <v-dialog persistent v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-pencil </v-icon>
        Edit
      </span>
    </template>
    <v-card>
      <v-card-title>
        Edit Invoice # {{ payload.invoice_number }}
        <v-spacer></v-spacer>
        <v-row>
          <v-col md="12" cols="12" sm="12" class="text-right">
            <v-icon center color="primary" @click="dialog = false"
              >mdi-close-circle-outline</v-icon
            >
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-tabs>
          <v-tab>Items</v-tab>
          <v-tab>Document</v-tab>

          <v-tab-item>
            <div class="text-right">
              <v-btn small class="primary mb-1" @click="addItem">
                Add Item(s)
                <v-icon small>mdi-plus-circle-outline</v-icon></v-btn
              >
            </div>
            <table>
              <tr>
                <td>Title</td>
                <td>Warranty</td>
                <td>Qty</td>
                <td>Unit Price</td>
                <td>Description</td>
                <td class="text-center">Action</td>
              </tr>
              <tr v-for="(d, index) in item.items" :key="index">
                <td style="width: 150px">
                  <v-text-field
                    dense
                    outlined
                    v-model="d.title"
                    :hide-details="true"
                  ></v-text-field>
                </td>
                <td style="width: 150px">
                  <v-select
                    :items="[
                      { id: '', name: 'Warranty' },
                      { id: 'Yes', name: 'Yes' },
                      { id: 'No', name: 'No' },
                    ]"
                    item-value="id"
                    item-text="name"
                    dense
                    outlined
                    v-model="d.warranty"
                    :hide-details="true"
                  ></v-select>
                </td>
                <td style="width: 100px">
                  <v-text-field
                    dense
                    outlined
                    v-model="d.qty"
                    :hide-details="true"
                    type="number"
                    @input="setCalulation"
                  ></v-text-field>
                </td>
                <td style="width: 100px">
                  <v-text-field
                    dense
                    outlined
                    v-model="d.unit_price"
                    :hide-details="true"
                    type="number"
                    @input="setCalulation"
                  ></v-text-field>
                </td>
                <td style="width: 250px">
                  <v-text-field
                    dense
                    outlined
                    v-model="d.description"
                    :hide-details="true"
                  ></v-text-field>
                </td>
                <td class="text-center">
                  <v-icon center color="red" @click="removeItem(index)"
                    >mdi-delete</v-icon
                  >
                </td>
              </tr>
            </table>
            <v-card elevation="0" class="mt-3">
              <v-row>
                <v-col cols="6">
                  <v-textarea
                    rows="4"
                    label="Description"
                    dense
                    outlined
                    type="text"
                    v-model="item.description"
                    :hide-details="true"
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <table>
                    <tr>
                      <th>Sub Total AED</th>
                      <td>{{ item.sub_total }}</td>
                    </tr>
                    <tr>
                      <th>5% VAT</th>
                      <td>{{ item.vat }}</td>
                    </tr>
                    <tr>
                      <th>Total AED</th>
                      <td>{{ item.total }}</td>
                    </tr>
                  </table>
                </v-col>
                <v-col cols="12" class="text-right my-1">
                  <v-btn small @click="dialog = false">Close</v-btn>
                  <v-btn
                    small
                    :loading="loading"
                    @click="submit"
                    class="primary"
                    >Submit</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <div class="text-right">
              <v-btn small class="primary mb-1" @click="addDocumentItem">
                Add Document(s)
                <v-icon small>mdi-plus-circle-outline</v-icon></v-btn
              >
            </div>
            <table>
              <tr>
                <td>Title</td>
                <td>Attachment</td>
                <td class="text-center">Action</td>
              </tr>
              <tr v-for="(d, index) in documents" :key="index">
                <td style="width: 250px">
                  <v-text-field
                    dense
                    outlined
                    v-model="d.title"
                    :hide-details="true"
                  ></v-text-field>
                </td>
                <td style="width: 250px">
                  <div style="display: flex">
                    <UploadAttachment
                      @file-selected="(e) => handleFileSelected(index, e)"
                    />
                  </div>
                </td>
                <td class="text-center">
                  <v-icon center color="red" @click="removeDocumentItem(index)"
                    >mdi-delete</v-icon
                  >
                </td>
              </tr>
            </table>
            <v-card elevation="0" class="mt-3">
              <v-row>
                <v-col cols="12" class="text-right my-1">
                  <v-btn small @click="dialog = false">Close</v-btn>
                  <v-btn
                    small
                    :loading="loading"
                    @click="uploadDocuments"
                    class="primary"
                    >Submit</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
            <table class="my-5">
              <tr>
                <td>Title</td>
                <td>Attachment</td>
                <td class="text-center">Actions</td>
              </tr>
              <tr v-for="(d, index) in item.documents" :key="index">
                <td style="width: 250px">
                  <v-text-field
                    dense
                    outlined
                    v-model="d.title"
                    :hide-details="true"
                    readonly
                  ></v-text-field>
                </td>
                <td style="width: 250px">
                  <div style="display: flex">
                    <ViewAttachment v-if="d.attachment" :src="d.attachment" />
                  </div>
                </td>
                <td class="text-center">
                  <v-icon color="red" @click="deleteItem(d.id, index)"
                    >mdi-delete</v-icon
                  >
                </td>
              </tr>
            </table>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["id", "item"],
  data: () => ({
    dialog: false,
    snackbar: false,
    loading: false,
    upload: {
      name: "",
    },
    documents: [],
    payload: {
      status: 1,
      company_id: 1,
      description: "",
      items: [
        {
          title: "",
          warranty: "",
          qty: 0,
          unit_price: 0,
          description: "",
        },
      ],
      sub_total: 0,
      vat: 0,
      total: 0,
    },

    e1: 1,
    errors: [],
  }),
  created() {
    this.payload = this.item;
  },
  methods: {
    handleFileSelected(index, file) {
      this.documents[index].attachment = file;
    },
    setCalulation() {
      let sub_total = 0;
      this.payload.items.forEach(({ qty, unit_price }) => {
        sub_total += qty * unit_price;
      });

      let vat = (sub_total / 100) * 5;
      let total = vat + sub_total;

      this.payload.sub_total = sub_total.toFixed(2);
      this.payload.vat = vat.toFixed(2);
      this.payload.total = total.toFixed(2);
    },
    removeItem(index) {
      this.payload.items.splice(index, 1);
      this.setCalulation();
    },
    addItem() {
      this.payload.items.push({
        title: "",
        warranty: "",
        qty: 0,
        unit_price: "",
        description: "",
      });
    },
    removeDocumentItem(index) {
      this.documents.splice(index, 1);
    },
    addDocumentItem() {
      this.documents.push({
        title: "",
        attachment: "",
      });
    },
    submit() {
      this.payload.company_id = this.id;

      this.$axios
        .put("/invoice/" + this.payload.id, this.payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
            return;
          }

          this.errors = [];
          this.$emit("success");
          this.dialog = false;
        })
        .catch((e) => console.log(e));
    },
    uploadDocuments() {
      let options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let payload = new FormData();

      this.documents.forEach((e, i) => {
        payload.append(`items[${i}][attachment]`, e.attachment);
        payload.append(`items[${i}][title]`, e.title);
      });

      this.$axios
        .post(`/invoice/document/${this.payload.id}`, payload, options)
        .then(({ data }) => {
          this.loading = false;
          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.errors = [];
            this.$emit("success");
            this.dialog = false;
          }
        })
        .catch((e) => console.log(e));
    },

    deleteItem(id, index) {
      this.$axios
        .delete(`/invoice/document/delete/${id}`)
        .then(({ data }) => {
          this.loading = false;
          if (!data.status) {
            alert("Cannot delete");
          } else {
            this.payload.documents.splice(index, 1);
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
