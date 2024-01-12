<template>
  <v-menu
    readonly
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="label"
        :hide-details="true"
        v-model="date"
        persistent-hint
        append-icon="mdi-calendar"
        readonly
        outlined
        dense
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      style="min-height: 320px"
      v-model="date"
      no-title
      @input="setDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ["label", "default_date","errors"],
  data: () => ({
    menu: false,
    date: null,
  }),
  created() {
    this.$emit("date", this.date = this.default_date);
  },
  methods: {
    setDate() {
      this.menu = false;
      this.$emit("date", this.date);
    },
  },
};
</script>
