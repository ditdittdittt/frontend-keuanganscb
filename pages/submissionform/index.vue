<template>
  <card>
    <v-container fluid fill-height grid-list-md text-xs-center class="bg">
      <v-layout row wrap align-center justify-center>
        <v-form>
          <h5 slot="header" class="title">Edit Profile</h5>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-numeric"
                v-model="submission_id"
                hide-details
                label="No. Doc"
                class="col-md-6 pr-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-calendar-multiple"
                v-model="submission_date"
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
                prepend-inner-icon="mdi-file-document"
                v-model="request_id"
                hide-details
                label="No. Doc FR"
                class="col-md-6 pr-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-calendar-multiple"
                v-model="request_date"
                hide-details
                label="Date FR"
                class="col-md-6 px-md-1"
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
                class="col-md-6 pr-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-account-multiple"
                v-model="user_division"
                hide-details
                label="Division"
                class="col-md-6 px-md-1"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-text-field
            solo
            prepend-inner-icon="mdi-cash"
            v-model="request_ammount"
            hide-details
            label="Fund Req"
            class="col-md-12"
          ></v-text-field>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-cash-100"
                v-model="submission_used"
                hide-details
                label="Use"
                class="col-md-12"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-text-field
            solo
            prepend-inner-icon="mdi-chart-line"
            v-model="submission_balance"
            hide-details
            label="Balancing"
            class="col-md-12"
          ></v-text-field>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-home-map-marker"
                v-model="submission_allocation"
                hide-details
                label="Allocation"
                class="col-md-12"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-text-field
            solo
            prepend-inner-icon="mdi-cash-multiple"
            v-model="saldoAnggaran"
            hide-details
            label="Saldo Anggaran"
            class="col-md-12"
          ></v-text-field>
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
          <v-btn height="50px" block big dark @click="submissionform()" class="grad">Submit</v-btn>
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
<style>
</style>