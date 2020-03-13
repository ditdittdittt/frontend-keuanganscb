<template>
  <card>
    <v-container fluid fill-height grid-list-md text-xs-center class="bg">
      <v-layout row wrap align-center justify-center>
        <v-form>
          <h5 slot="header" class="title">Petty Cash Form</h5>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-numeric"
                v-model="petty_id"
                hide-details
                label="No. Doc"
                class="col-md-6 pr-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-calendar"
                v-model="petty_date"
                hide-details
                label="Date"
                class="col-md-6 px-md-1"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-cube-send"
                v-model="payable_to"
                hide-details
                label="Payable to"
                class="col-md-12 pr-md-1"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-account"
                v-model="pic_id"
                hide-details
                label="PIC"
                class="col-md-12 pr-md-1"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-text-field
            solo
            prepend-inner-icon="mdi-cash-multiple"
            v-model="petty_ammount"
            hide-details
            label="Ammount"
            class="col-md-12"
          ></v-text-field>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-home-map-marker"
                v-model="petty_allocation"
                hide-details
                label="Allocation"
                class="col-md-12"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-numeric"
                v-model="petty_id"
                hide-details
                label="Budget Code"
                class="col-md-4 pr-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-alphabetical"
                v-model="petty_name"
                hide-details
                label="Budget Name"
                class="col-md-4 px-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-cash-usd"
                v-model="petty_nominal"
                hide-details
                label="Nominal"
                class="col-md-4 pl-md-1"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-textarea
                rows="4"
                cols="80"
                placeholder="Here can be your description"
                solo
                prepend-inner-icon="mdi-file-delimited"
                v-model="request_notes"
                hide-details
                label="Notes"
                class="col-md-12"
              ></v-textarea>
            </v-row>
          </v-col>
          <v-col v-show="errorm" cols="12">
            <v-alert type="error">Error alert</v-alert>
          </v-col>
          <v-btn
            height="50px"
            block
            big
            dark
            @click="submissionform()"
            class="grad"
            >Submit</v-btn
          >
        </v-form>
      </v-layout>
    </v-container>
  </card>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style></style>
