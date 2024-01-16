<template>
  <div>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="true"
      temporary
      fixed
      width="350"
    >
      <v-toolbar flat color="" dense
        >Send Invoice <v-spacer></v-spacer
        ><v-icon @click="closeRightDrawer"
          >mdi-close-circle-outline</v-icon
        ></v-toolbar
      >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              placeholder="From"
              :hide-details="true"
              v-model="payload.from"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              placeholder="To"
              :hide-details="true"
              v-model="payload.to"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              placeholder="Subject"
              :hide-details="true"
              v-model="payload.subject"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              rows="3"
              outlined
              dense
              placeholder="Subject"
              :hide-details="true"
              v-model="payload.message"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <InvoiceV1Preview
              :payload="payload"
              label="Attachment"
              icon="attachment"
            />
          </v-col>
          <v-col cols="12">
            <v-btn outlined dense color="primary">Submit</v-btn>
            <v-btn outlined dense color="grey" @click="rightDrawer = false"
              >Close</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <!-- <v-btn outlined ref="rdBTN"  class="" @click="rightDrawer = true">
      <v-icon small>mdi-email</v-icon> Send Invoice</v-btn
    > -->
  </div>
</template>
<script>
export default {
  props: ["payload"],
  data() {
    return {
      rightDrawer: false,
    };
  },
  watch: {},
  methods:{
    openRightDrawer() {
      this.rightDrawer = true;
    },
    closeRightDrawer() {
      this.rightDrawer = false;
    },
  }
};
</script>
