<template>
  <v-text-field
    outlined
    dense
    :placeholder="value"
    persistent-hint
    readonly
    disabled
    :hide-details="true"
  ></v-text-field>
</template>
<script>
export default {
  props: ["value"],
};
</script>
