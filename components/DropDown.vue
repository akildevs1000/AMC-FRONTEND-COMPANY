<template>
  <v-select
    :items="items"
    item-value="id"
    item-text="name"
    :label="label"
    dense
    outlined
    v-model="value"
  ></v-select>
</template>

<script>
export default {
  props: ["label", "endpoint", "default_value"],
  data: () => ({
    value: null,
  }),
  created() {
    this.$emit("value", (this.value = this.default_value));
  },
  methods: {
    setDate() {
      this.$emit("value", this.value);
    },
  },
};
</script>
