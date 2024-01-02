<template>
  <v-dialog persistent v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <span style="cursor: pointer" text v-bind="attrs" v-on="on">
        <v-icon color="secondary" small> mdi-eye </v-icon>
        View
      </span>
    </template>
    <v-card>
      <v-card-title>
        View Quotation # {{ item.quotation_number }}
        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = false"
          ><v-icon color="primary">mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <table>
          <tr>
            <th>Title</th>
            <th>Warranty</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Description</th>
          </tr>
          <tr v-for="(d, index) in item.items" :key="index">
            <td style="width: 150px">
              {{ d.title }}
            </td>
            <td style="width: 150px">
              {{ d.warranty }}
            </td>
            <td style="width: 100px">
              {{ d.qty }}
            </td>
            <td style="width: 100px">
              {{ d.unit_price }}
            </td>
            <td style="width: 250px">
              {{ d.description }}
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
                readonly
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
          </v-row>
        </v-card>
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
