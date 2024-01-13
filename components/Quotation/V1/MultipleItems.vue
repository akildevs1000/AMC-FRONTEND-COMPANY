<template>
  <div>
    <v-card
      outlined
      v-for="(item, index) in payload.items"
      :key="index"
      class="mb-5"
    >
      <v-card-title class="secondary--text">
        Item {{ index + 1 }}
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-text-field
              outlined
              dense
              label="Title"
              :hide-details="true"
              v-model="item.title"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select
              outlined
              dense
              label="Warranty"
              :hide-details="true"
              :items="[
                { id: '', name: 'Select Warranty' },
                { id: 'Yes', name: 'Yes' },
                { id: 'No', name: 'No' },
              ]"
              item-text="name"
              item-value="id"
              v-model="item.warranty"
              color="primary"
              @change="setValue"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              dense
              outlined
              label="Quantity"
              v-model="item.qty"
              :hide-details="true"
              type="number"
              @input="
                () => {
                  setValue(), setCalulation();
                }
              "
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-text-field
              dense
              outlined
              label="Unit Price"
              v-model="item.unit_price"
              :hide-details="true"
              type="number"
              @input="
                () => {
                  setValue(), setCalulation();
                }
              "
            ></v-text-field>
          </v-col>
          <v-col v-if="!disable" cols="1" class="text-center">
            <v-icon color="red" @click="removeItem(index)"
              >mdi-close-circle-outline</v-icon
            >
          </v-col>
        </v-row>
        <v-row>
          
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-textarea
              rows="3"
              outlined
              dense
              label="Description"
              :hide-details="true"
              v-model="item.description"
              @input="setValue"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-row>
      <v-col v-if="!disable">
        <v-btn class="primary" @click="addItemRow">
          <v-icon>mdi-plus</v-icon> Add</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    payload: {
      type: Object,
      default: function () {
        return {
          items: [
            {
              title: "Item Name",
              warranty: "Yes",
              qty: 10,
              unit_price: 10,
              description: "item description",
            },
            {
              title: "Item Name 2",
              warranty: "No",
              qty: 5,
              unit_price: 5,
              description: "item description 2",
            },
          ],
          sub_total: 0,
          vat: 0,
          total: 0,
        };
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.setCalulation();
  },
  methods: {
    setCalulation() {
      let sub_total = 0;
      this.payload.items.forEach(({ qty, unit_price }) => {
        sub_total += qty * unit_price;
      });
      this.payload.sub_total = sub_total;
      this.payload.vat = (sub_total / 100) * 5;
      this.payload.total = this.payload.vat + this.payload.sub_total;

      this.setValue();
    },
    removeItem(index) {
      this.payload.items.splice(index, 1);
      this.setCalulation();
    },
    addItemRow() {
      this.payload.items.push({
        title: "",
        warranty: "",
        qty: 0,
        unit_price: "",
        description: "",
      });
      this.setValue();
    },
    setValue() {
      this.$emit("selected", this.payload);
    },
  },
};
</script>
