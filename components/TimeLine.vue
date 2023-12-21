<template>
  <v-dialog v-model="dialog" height="700" width="800">
    <template v-slot:activator="{ on, attrs }">
      <!-- <v-btn rounded class="" small v-bind="attrs" v-on="on">View History</v-btn> -->
      <v-icon color="primary" v-bind="attrs" v-on="on">mdi-history</v-icon>
    </template>
    <v-card>
      <v-card-title
        >Ticket # {{ id }}
        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = false"
          ><v-icon color="primary">mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="overflow: scroll; max-height: 600px">
        <v-timeline dense>
          <v-timeline-item
            color="primary"
            small
            v-for="(item, index) in data"
            :key="index"
          >
            <v-row>
              <v-col cols="6">
                <b>{{ index + 1 }}. {{ item.title }}</b>
                <div>{{ item.comments }}</div>
                <div>User: {{ item?.user?.email }}</div>
              </v-col>
              <v-col class="text-right" cols="6"> {{ item.dateTime }} </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
    },
    data: {
      type: Array,
      required: true,
      default: {},
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
