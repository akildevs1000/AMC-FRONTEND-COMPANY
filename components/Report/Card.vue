<template>
  <v-container
    style="background: white !important"
    elevation="0"
    :class="previewOnly ? `` : `report-print`"
  >
    <v-toolbar dense flat color="blue">
      <v-toolbar-title class="mx-auto white--text"
        ><b>SERVICE REPORT</b></v-toolbar-title
      >
    </v-toolbar>
    <div class="text-right ma-5 report-font">
      <span>Date and Time: </span
      ><span style="border-bottom: 1px solid" v-text="payload.date"></span>
      <span class="ml-5">Ticket Number: </span
      ><span style="border-bottom: 1px solid" v-text="payload.id"></span>
    </div>
    <div class="text-right ma-5 report-font">
      <span>Reported By: </span
      ><span style="border-bottom: 1px solid" v-text="payload.user.name"></span>
    </div>
    <div class="ma-5">
      <v-row no-gutters>
        <v-col cols="8">
          <table style="width: 100%" class="report-font">
            <tr>
              <td style="width: 100px">Company Name:</td>
              <td style="border-bottom: 1px solid">
                {{ payload.company.name }}
              </td>
            </tr>
          </table>
        </v-col>
        <v-col cols="4">
          <div class="d-flex report-font">
            <div>Location:</div>
            <div
              style="border-bottom: 1px solid; width: 70%"
              v-text="payload.company.location"
            ></div>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-row no-gutters class="ma-5 report-font">
      <v-col cols="6">
        <table style="width: 100%">
          <tr>
            <td style="width: 50px">Address:</td>
            <td class="report-font" style="border-bottom: 1px solid">
              {{ payload.address }}
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="3">
        <table style="width: 100%">
          <tr>
            <td style="width: 60px">AMC From:</td>
            <td style="border-bottom: 1px solid">
              {{ payload.date }}
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="3">
        <table style="width: 100%">
          <tr>
            <td style="width: 53px" class="report-font ml-2">AMC End:</td>
            <td class="report-font" style="border-bottom: 1px solid">
              {{ payload.date }}
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row no-gutters class="ma-5 report-font">
      <v-col cols="6">
        <table style="width: 100%">
          <tr>
            <td style="width: 100px" class="report-font">Product Category:</td>
            <td class="report-font" style="border-bottom: 1px solid">
              {{ payload.equipment_category.name }}
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="3">
        <table style="width: 100%">
          <tr>
            <td>Equipement:</td>
            <td style="border-bottom: 1px solid">
              {{ payload.equipment.name }}
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="3">
        <table style="width: 100%">
          <tr>
            <td class="report-font">Problem Since:</td>
            <td class="report-font" style="border-bottom: 1px solid">
              {{ payload.date }}
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="12" class="mt-5">
        <table style="width: 100%">
          <tr>
            <td style="width: 100px" class="report-font">Problem Reported:</td>
            <td class="report-font" style="border-bottom: 1px solid"></td>
          </tr>
        </table>
      </v-col>
      <v-col cols="12" class="mt-5">
        <table style="width: 100%">
          <tr>
            <td style="width: 140px" class="report-font">
              Description By Customer:
            </td>
            <td class="report-font" style="border-bottom: 1px solid"></td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <div
      class="text-right ma-5 report-font pt-5"
      style="border-top: 2px solid #2196f3"
    >
      <span>Entry Date and Time: </span
      ><span style="border-bottom: 1px solid" v-text="payload.date"></span>
      <span class="ml-5">Ticket Closed Date and Time: </span
      ><span style="border-bottom: 1px solid" v-text="payload.date"></span>
    </div>
    <div class="text-right ma-5 report-font">
      <span>Technician Name: </span
      ><span
        style="border-bottom: 1px solid"
        v-text="payload.technician.name"
      ></span>
    </div>

    <v-row class="mt-5" no-gutters style="width: 100%; border: 1px solid">
      <v-col cols="4" style="border-bottom: 1px solid">
        <table>
          <tr>
            <td style="width: 110px" class="report-font">Hardware Problem:</td>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="4" style="border-bottom: 1px solid">
        <table>
          <tr>
            <td style="width: 110px" class="report-font">Software Problem:</td>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="4" style="border-bottom: 1px solid">
        <table>
          <tr>
            <td style="width: 140px" class="report-font">
              Software Config Tamper:
            </td>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="4" style="border-bottom: 1px solid">
        <table>
          <tr>
            <td style="width: 110px" class="report-font">Hardware Tamper:</td>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="4" style="border-bottom: 1px solid">
        <table>
          <tr>
            <td style="width: 110px" class="report-font">Improper Power:</td>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="4" style="border-bottom: 1px solid">
        <table>
          <tr>
            <td style="width: 110px" class="report-font">Visus Attack:</td>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="4">
        <table>
          <tr>
            <td style="width: 110px" class="report-font">Misuse or Damage:</td>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="4">
        <table>
          <tr>
            <td style="width: 110px" class="report-font">
              Any Other (specify):
            </td>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
          </tr>
        </table>
      </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
    <v-row>
      <v-col>
        <fieldset
          style="text-align: center; min-height: 100px; border: 1px solid"
        >
          <legend>
            <div class="mx-5">Actual Problem Described by Technician</div>
          </legend>
        </fieldset>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <fieldset
          style="text-align: center; min-height: 100px; border: 1px solid"
        >
          <legend><div class="mx-5">Rectification Work</div></legend>
        </fieldset>
      </v-col>
    </v-row>

    <v-row class="mt-5 pa-1" no-gutters style="width: 100%">
      <v-col cols="2">
        <table>
          <tr>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
            <td style="width: 110px" class="report-font">Solved:</td>
          </tr>
        </table>
      </v-col>
      <v-col cols="2">
        <table>
          <tr>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
            <td style="width: 110px" class="report-font">Pending:</td>
          </tr>
        </table>
      </v-col>
      <v-col cols="2">
        <table>
          <tr>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
            <td style="width: 140px" class="report-font">Quotaion:</td>
          </tr>
        </table>
      </v-col>
      <v-col cols="3">
        <table>
          <tr>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
            <td style="width: 110px" class="report-font">Approval Required:</td>
          </tr>
        </table>
      </v-col>
      <v-col cols="3">
        <table>
          <tr>
            <td class="report-font">
              <v-checkbox dense v-model="checkboxModel" inline></v-checkbox>
            </td>
            <td style="width: 150px; border-bottom: 1px solid"></td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <fieldset
          style="
            text-align: center;
            min-height: 100px;
            border: 1px solid;
            border-radius: 7px;
          "
        >
          <legend><div class="mx-5">Engineer Signature</div></legend>
        </fieldset>
      </v-col>
      <v-col cols="6">
        <fieldset
          style="
            text-align: center;
            min-height: 100px;
            border: 1px solid;
            border-radius: 7px;
          "
        >
          <legend><div class="mx-5">Customer Signature</div></legend>
        </fieldset>
      </v-col>
    </v-row>
    <div class="blue mt-5 white--text report-font text-center">
      <div>
        AKIL SECURITY AND ALARM SYSTEMS LLC - DUBAI - UNITED ARAB EMIRATES
      </div>
      <div>
        TEL + 971 4 39 39 562, P.O.BOX: 83481, MOBILE/WHATSAPP: + 971 55 330
        3991, EMAIL: MAIL@AKILGROUP.COM
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  props: {
    payload: {
      type: Object,
      default: {
        id: "123456",
        company: {
          name: "Company Name",
          location: "Dubai",
        },
        user: {
          name: "Customer Name",
        },
        technician: {
          name: "Jhon",
        },
        equipment: {
          name: "Camera",
        },
        equipment_category: {
          name: "CCTV",
        },
        date: "2024-01-17",
        address:"XYZ COMPANY",
        description: "Sample Quotation Description",
      },
    },
    previewOnly: {
      type: Boolean,
      default: false, // Set the default value to true
    },
  },
  data() {
    return {
      dialog: false,
      checkboxModel: "",
    };
  },
  methods: {
    convertToAmount(value) {
      return parseFloat(value).toFixed(2);
    },
  },
};
</script>
<style scoped>
@import "@/assets/report-style.css";
</style>
