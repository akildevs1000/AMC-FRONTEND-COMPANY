<template>
  <v-tabs color="deep-purple accent-4" right>
    <v-tab>Questions</v-tab>
    <v-tab>Technicians</v-tab>
    <v-tab>Business Type</v-tab>
    <v-tab>Equipment Category</v-tab>
    <v-tab>AMC Type</v-tab>
    <v-tab>Visit Type</v-tab>
    <!-- <v-tab>Service Call Type</v-tab> -->
    <v-tab>Priority</v-tab>

    <v-tab-item> <SetupQuestion /> </v-tab-item>
    <v-tab-item> <SetupTechnician /> </v-tab-item>
    <v-tab-item> <SetupBusinessType /> </v-tab-item>
    <v-tab-item> <SetupEquipmentCategory /> </v-tab-item>
    <v-tab-item> <SetupAMCType /> </v-tab-item>
    <v-tab-item> <SetupVisitType /> </v-tab-item>
    <!-- <v-tab-item> <SetupServiceCallType /> </v-tab-item> -->
    <v-tab-item> <SetupPriority /> </v-tab-item>
  </v-tabs>
</template>
