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
            <v-select
              outlined
              dense
              :hide-details="true"
              :items="item.room_type"
              item-text="name"
              item-value="id"
              v-model="item.room_type_id"
              color="primary"
              @change="setValue"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined
              dense
              label="Adult"
              type="number"
              :hide-details="true"
              v-model="item.adult"
              @input="setValue"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined
              dense
              label="Child"
              type="number"
              :hide-details="true"
              v-model="item.child"
              @input="setValue"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined
              dense
              label="Extra Bed"
              type="number"
              :hide-details="true"
              v-model="item.extra_bed"
              @input="setValue"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined
              dense
              label="Food"
              :hide-details="true"
              v-model="item.food"
              @input="setValue"
            ></v-text-field>
          </v-col>
          <v-col v-if="!disable" cols="1" class="text-center">
            <v-icon color="red" @click="removeItem(index)"
              >mdi-close-circle-outline</v-icon
            >
          </v-col>

          <v-col cols="2">
            <v-text-field
              outlined
              dense
              label="Rate Per Room"
              type="number"
              :hide-details="true"
              v-model="item.rate_per_room"
              @input="
                () => {
                  setValue(), setCalulation();
                }
              "
            ></v-text-field>
          </v-col>

          <!-- <v-col cols="2">
            <v-text-field
              outlined
              dense
              label="GST"
              type="number"
              :hide-details="true"
              v-model="item.gst"
              readonly
            ></v-text-field>
          </v-col> -->
          <v-col cols="2">
            <v-text-field
              outlined
              dense
              label="No Of Rooms"
              type="number"
              :hide-details="true"
              v-model="item.no_of_rooms"
              @input="
                () => {
                  setValue(), setCalulation();
                }
              "
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-text-field
              outlined
              dense
              label="No Of Nights"
              type="number"
              :hide-details="true"
              v-model="item.no_of_nights"
              @input="
                () => {
                  setValue(), setCalulation();
                }
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-alert dense color="grey">
              Gst: {{ item.gst }}, Room Total : {{ item.room_total }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-row>
      <v-col v-if="!disable">
        <v-btn class="primary" @click="addItemRow">
          <v-icon>mdi-plus</v-icon> Add Item</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-alert dense color="grey">
          Gst: {{ payload.gst_sub_total }}, Room Rate Total :{{
            payload.room_rate_total
          }}
          Room Total : {{ payload.room_sub_total }}
        </v-alert>
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
  },
  data() {
    return {
      payload: {
        items: [
          {
            room_type_id: 1,
            room_type: [
              { id: 1, name: "Queen" },
              { id: 2, name: "King" },
            ],
            adult: 1,
            child: 1,
            extra_bed: 1,
            food: "Breakfast",
            rate_per_room: 2500,
            gst: 0,
            no_of_rooms: 10,
            no_of_nights: 3,
            room_total: 0,
          },
          {
            room_type_id: 2,
            room_type: [
              { id: 1, name: "Queen" },
              { id: 2, name: "King" },
            ],
            adult: 1,
            child: 1,
            extra_bed: 1,
            food: "MEP",
            rate_per_room: 4500,
            gst: 0,
            no_of_rooms: 2,
            no_of_nights: 2,
            room_total: 0,
          },
        ],
        gst_sub_total: 0,
        room_sub_total: 0,
        room_rate_total: 0,
      },
    };
  },
  created() {
    this.setCalulation();
  },
  methods: {
    setCalulation() {
      let gst_sub_total = 0;
      let room_sub_total = 0;
      let room_rate_total = 0;

      this.payload.items.forEach((item) => {
        gst_sub_total += item.gst = (item.rate_per_room / 100) * 12;
        room_rate_total += parseFloat(item.rate_per_room);

        room_sub_total += item.room_total =
          (parseFloat(item.rate_per_room) + parseFloat(item.gst)) *
          parseFloat(item.no_of_rooms) *
          parseFloat(item.no_of_nights);
      });
      this.payload.gst_sub_total = gst_sub_total;
      this.payload.room_sub_total = room_sub_total;
      this.payload.room_rate_total = room_rate_total;
      this.$emit("selected", this.payload);

      // this.payload.room_grand_total = room_grand_total;
    },
    removeItem(index) {
      this.payload.items.splice(index, 1);
      this.setCalulation();
    },
    addItemRow() {
      // Add an empty item row
      this.payload.items.push({
        room_type_id: 1,
        room_type: [
          { id: 1, name: "Queen" },
          { id: 2, name: "King" },
        ],
        adult: 0,
        child: 0,
        extra_bed: 0,
        food: null,
        rate_per_room: 0,
        gst: 0,
        no_of_rooms: 0,
        no_of_nights: 0,
      });
    },
    setValue() {
      this.$emit("selected", this.payload);
    },
  },
};
</script>
