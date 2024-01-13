<template>
  <v-dialog v-model="dialog" height="700" width="1100">
    <template v-slot:activator="{ on, attrs }">
      <span color="primary" 
        >{{text.substring(0,50)}}</span
      >
      <span v-bind="attrs" v-on="on" v-if="text.length > 100">...<span  class="blue--text">read more</span></span>
    </template>
    <v-card>
      <v-card-title>
        Full Summary
        <!-- {{ items.length }} -->
        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = false"
          ><v-icon color="primary">mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-title>

      <v-card-text>
       {{text}}
       
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: "",
    },
  },
  data: () => ({
    dialog: false,
    // text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius repellendus assumenda doloribus illo. Rem hic nemo eum et delectus minus quibusdam veritatis obcaecati totam, similique eos earum cumque itaque fugiat."
  }),
};
</script>
<style scoped>
@import "@/assets/tableStyles.css";
</style>
