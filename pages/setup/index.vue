<template>
  <v-tabs color="deep-purple accent-4" right>
    <v-tab>Business Type</v-tab>
    <v-tab>Equipment Category</v-tab>
    <v-tab>AMC Type</v-tab>
    <v-tab>Visit Type</v-tab>
    <v-tab>Service Call Type</v-tab>
    <v-tab>Priority</v-tab>

    <v-tab-item> <SnippetsSetupBusinessType /> </v-tab-item>
    <v-tab-item> <SnippetsSetupEquipmentCategory /> </v-tab-item>
    <v-tab-item> <SnippetsSetupAMCType /> </v-tab-item>
    <v-tab-item> <SnippetsSetupVisitType /> </v-tab-item>
    <v-tab-item> <SnippetsSetupServiceCallType /> </v-tab-item>
    <v-tab-item> <SnippetsSetupPriority /> </v-tab-item>

  </v-tabs>
</template>