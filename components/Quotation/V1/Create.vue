<template>
  <v-container class="px-10">
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="true"
      temporary
      fixed
      width="350"
    >
      <v-toolbar flat color="" dense
        >Send Quotation <v-spacer></v-spacer
        ><v-icon @click="rightDrawer = false">mdi-close-circle-outline</v-icon></v-toolbar
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
            <!-- <QuotationV1AttachedFile :payload="payload" /> -->
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
    <v-row>
      <v-col cols="9">
        <v-card outlined>
          <v-container class="pa-10">
            <div class="pb-5 text-center">
              <h2>QUOTATION</h2>
            </div>
            <v-card outlined class="grey lighten-4">
              <v-row no-gutters>
                <v-col cols="7">
                  <div class="pa-5">
                    <h3 class="secondary--text">MATERIO</h3>
                    <div class="pt-2">
                      <p class="ma-0">Office 149, 450 South Brand Brooklyn</p>
                      <p class="ma-0">San Diego County, CA 91905, USA</p>
                      <p class="ma-0">+1 (123) 456 7891, +44 (876) 543 2198</p>
                    </div>
                  </div>
                </v-col>
                <v-col cols="5">
                  <div class="pa-5">
                    <v-row no-gutters>
                      <v-col cols="6">QUOTATION #</v-col>
                      <v-col cols="6" class="text-right mb-1">
                        <QuotationV1TextFieldReadOnly :value="`5037`"
                      /></v-col>
                      <v-col cols="6">Date</v-col>
                      <v-col cols="6" class="text-right mb-1">
                        <QuotationV1TextFieldReadOnly :value="`12 JAN 2024`"
                      /></v-col>
                      <v-col cols="6">Sales Man</v-col>
                      <v-col cols="6" class="text-right mb-1">
                        <v-select
                          outlined
                          dense
                          :hide-details="true"
                          :items="[
                            { id: 1, name: `Ansari Kumar` },
                            { id: 2, name: `John Doe` },
                          ]"
                          item-text="name"
                          item-value="id"
                          v-model="payload.user_id"
                          color="primary"
                        />
                      </v-col>
                      <v-col cols="6">Stay From: </v-col>
                      <v-col cols="6" class="text-right mb-1">
                        <QuotationV1DatePicker
                          @selected="
                            (e) => {
                              payload.stay_from = e;
                            }
                          "
                      /></v-col>
                      <v-col cols="6">Stay To: </v-col>
                      <v-col cols="6" class="text-right mb-1">
                        <QuotationV1DatePicker
                          @selected="
                            (e) => {
                              payload.stay_to = e;
                            }
                          "
                      /></v-col>
                      <v-col cols="6">Number of Rooms: </v-col>
                      <v-col cols="6" class="text-right mb-1">
                        <v-text-field
                          outlined
                          dense
                          placeholder="No Of Room"
                          type="number"
                          :hide-details="true"
                          v-model="payload.no_of_rooms"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-card>
            <!-- <v-row no-gutters>
              <v-col cols="4">
                <div class="pa-5">
                  <div>Quotation To</div>
                  <div class="my-3 secondary--text">
                    <v-select
                      outlined
                      dense
                      :hide-details="true"
                      :items="[
                        { id: 1, name: `Customer 1` },
                        { id: 2, name: `Customer 2` },
                      ]"
                      item-text="name"
                      item-value="id"
                      v-model="payload.customer_id"
                      color="primary"
                    />
                  </div>
                  <p class="ma-0">John Doe</p>
                  <p class="ma-0">Greeva Inc</p>
                  <p class="ma-0">112, Lorem Ipsum, Florida, USA</p>

                  <p class="ma-0">+1 123 3452 12</p>
                  <p class="ma-0">johndoe@greeva.com</p>
                </div>
              </v-col>
              <v-col cols="4" offset="2">
                <div class="pa-5">
                  <div>Bill To</div>
                  <v-row no-gutters class="my-1">
                    <v-col class="secondary--text">Total Due:</v-col>
                    <v-col class="secondary--text">$12,110.55</v-col>
                  </v-row>
                  <v-row no-gutters class="my-1">
                    <v-col class="secondary--text">Bank Name:</v-col>
                    <v-col class="secondary--text">American Bank </v-col>
                  </v-row>
                  <v-row no-gutters class="my-1">
                    <v-col class="secondary--text">Country: </v-col>
                    <v-col class="secondary--text">United States</v-col>
                  </v-row>
                  <v-row no-gutters class="my-1">
                    <v-col class="secondary--text">IBAN: </v-col>
                    <v-col class="secondary--text">ETD95476213 </v-col>
                  </v-row>
                  <v-row no-gutters class="my-1">
                    <v-col class="secondary--text">SWIFT Code: </v-col>
                    <v-col class="secondary--text">BR91905 </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row> -->
            <v-divider></v-divider>
            <v-row class="py-5">
              <v-col>
                <!-- {{ payload.grand_total = payload.item.room_sub_total }}  -->
                <QuotationV1MultipleItems @selected="handleCalculation" />
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-row class="pt-5">
              <v-col cols="6">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="Extra item name (optional)"
                      outlined
                      dense
                      :hide-details="true"
                      v-model="payload.extra_name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Extra item value (optional)"
                      outlined
                      dense
                      :hide-details="true"
                      v-model="payload.extra"
                      @input="setFinalCalulation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Discount"
                      outlined
                      dense
                      type="number"
                      :hide-details="true"
                      v-model="payload.discount"
                      @input="setFinalCalulation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Note"
                      rows="3"
                      outlined
                      dense
                      type="number"
                      :hide-details="true"
                      v-model="payload.note"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3" offset="3">
                <v-row no-gutters>
                  <v-col class="secondary--text">Subtotal:</v-col>
                  <v-col class="secondary--text text-right"
                    >{{ payload.item.room_sub_total }}
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col class="secondary--text">Extras:</v-col>
                  <v-col class="secondary--text text-right"
                    >{{ payload.extra }}
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col class="secondary--text">Discount:</v-col>
                  <v-col class="secondary--text text-right"
                    >{{ payload.discount }}
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-5">
                  <v-col class="secondary--text">Total:</v-col>
                  <v-col class="secondary--text text-right"
                    >{{ payload.grand_total }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="my-1">
                <v-btn class="primary">
                  <v-icon small>mdi-floppy</v-icon> Save</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card outlined>
          <v-container class="pa-10">
            <v-row no-gutters>
              <v-col cols="12" class="my-1">
                <v-btn block class="primary" @click="rightDrawer = true">
                  <v-icon small>mdi-email</v-icon> Send Quotation</v-btn
                >
              </v-col>
              <v-col cols="12" class="my-1">
                <QuotationV1Preview :payload="payload" />
              </v-col>
              <v-col cols="12" class="my-1">
                <QuotationV1Print :payload="payload" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rightDrawer: false,
    payload: {
      user_id: 1,
      stay_from: "",
      stay_to: "",
      no_of_rooms: 12,
      customer_id: 1,
      item: {
        room_sub_total: 0,
      },
      note: "testing",
      extra: 0,
      discount: 0,
      grand_total: 0,
    },
  }),
  methods: {
    handleCalculation(e) {
      this.payload.item = e;
      this.payload.grand_total = parseFloat(e.room_sub_total);
    },
    setFinalCalulation() {
      this.payload.grand_total =
        parseFloat(this.payload.extra) +
        parseFloat(this.payload.item.room_sub_total);
      this.payload.grand_total =
        parseFloat(this.payload.grand_total) -
        parseFloat(this.payload.discount);
    },
  },
};
</script>
