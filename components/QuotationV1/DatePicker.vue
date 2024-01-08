<template>
  <v-menu
    v-model="menu2"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        outlined
        dense
        v-model="computedDateFormatted"
        persistent-hint
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :hide-details="true"
      ></v-text-field>
    </template>
    <v-date-picker
      color="primary"
      v-model="date"
      no-title
      @input="setValue(date)"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  data: (vm) => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    menu2: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    setValue(date) {
      this.menu2 = false;
      this.$emit("selected", date);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
