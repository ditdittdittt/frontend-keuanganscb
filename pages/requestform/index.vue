<template>
  <card>
    <v-container fluid fill-height grid-list-md text-xs-center class="bg">
      <v-layout row wrap align-center justify-center>
        <v-form>
          <h1 slot="header" class="title">Request Form</h1>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-account"
                v-model="pic_id"
                hide-details
                label="PIC"
                class="col-md-4 pr-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-account-multiple"
                v-model="user_division"
                hide-details
                label="Division"
                class="col-md-4 px-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-calendar"
                v-model="request_date"
                hide-details
                label="Date"
                class="col-md-4 pl-md-1"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-numeric"
                v-model="request_id"
                hide-details
                label="Budget Code"
                class="col-md-6 pr-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-alphabetical"
                v-model="request_name"
                hide-details
                label="Budget Name"
                class="col-md-6 px-md-1"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-home-map-marker"
                v-model="request_allocation"
                hide-details
                label="Allocation / Peruntukan"
                class="col-md-12"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-cash-multiple"
                v-model="request_ammount"
                hide-details
                label="Ammount / Jumlah"
                class="col-md-6 pr-md-1"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-cube-send"
                v-model="cash_OR_transfer"
                hide-details
                label="Cash / Transfer"
                class="col-md-6 px-md-1"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-text-field
                solo
                prepend-inner-icon="mdi-format-quote-close"
                v-model="inWords"
                hide-details
                label="In Words / Terbilang"
                class="col-md-12"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-vcol>
            <v-text-field
              solo
              prepend-inner-icon="mdi-cash"
              v-model="saldoAnggaran"
              hide-details
              label="Saldo Anggaran"
              class="col-md-12"
            ></v-text-field>
          </v-vcol>
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
            <v-row>
              <div id="example-3">
                <h4>Attachment</h4>
                <input type="checkbox" id="proker" value="Proker" v-model="attachment" />
                <label for="proker">Program Kerja</label>
                <input type="checkbox" id="invoice" value="Invoice" v-model="attachment" />
                <label for="invoice">Invoice</label>
                <input type="checkbox" id="fpbj" value="FPBJ" v-model="attachment" />
                <label for="fpbj">FPBJ</label>
                <input type="checkbox" id="exsum" value="Exsum" v-model="attachment" />
                <label for="exsum">Expense Summary</label>
              </div>
            </v-row>
          </v-col>
          <v-col v-show="errorm" cols="12">
            <v-alert type="error">Error alert</v-alert>
          </v-col>
          <v-btn height="50px" block big dark @click="requestform()" class="grad">Submit</v-btn>
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