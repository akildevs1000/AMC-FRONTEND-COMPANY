<template>
    <div>
      <v-btn @click="showDialog">Show Dialog</v-btn>
  
      <v-overlay :value="loading">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
  
      <v-dialog v-model="dialog" max-width="300">
        <v-card>
          <v-card-title>
            Dialog Title
          </v-card-title>
          <v-card-text>
            <!-- Dialog content here -->
            Lorem ipsum dolor sit amet...
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="closeDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        loading: false,
      };
    },
    methods: {
      showDialog() {
        this.loading = true;
        // Simulate some async task
        setTimeout(() => {
          this.loading = false;
          this.dialog = true;
        }, 2000);
      },
      closeDialog() {
        this.dialog = false;
      },
    },
  };
  </script>
  