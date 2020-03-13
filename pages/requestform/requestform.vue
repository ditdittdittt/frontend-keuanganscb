<template>
  <v-container fluid fill-height grid-list-md text-xs-center class="bg">
    <v-layout row wrap align-center justify-center>
      <v-col cols="12" sm="8" md="4">
        <v-container text-center>
          <img src="~assets/img/Logo-SCB_Hitam.png" style="height:60px" class="mb-4 mt-2" />
          <h2 class="mb-1 headline font-weight-medium" style="color:white">
            Welcome to
            <span class="font-weight-bold" style="color : #F70032">SCB</span>
          </h2>
          <p class="mb-5" style="color:white">Please Register</p>
        </v-container>
        <h5 slot="header" class="title">Form Fund Request</h5>
        <v-form>
          <v-row>
            <v-text-field
              solo
              prepend-inner-icon="mdi-account"
              v-model="namePIC"
              hide-details
              label="Nama PIC"
              class="col-md-6 pr-md-1"
            ></v-text-field>
            <v-text-field
              solo
              prepend-inner-icon="mdi-account-multiple"
              v-model="division"
              hide-details
              label="Divisi"
              class="col-md-6 px-md-1"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              solo
              prepend-inner-icon="mdi-email"
              v-model="budgetCode"
              hide-details
              label="Budget Code"
              class="col-md-6 pr-md-1"
            ></v-text-field>
            <v-text-field
              solo
              prepend-inner-icon="mdi-email"
              v-model="budgetName"
              hide-details
              label="Budget Name"
              class="col-md-6 pl-md-1"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              solo
              prepend-inner-icon="mdi-email"
              v-model="allocation"
              hide-details
              label="Allocation (Peruntukan)"
              class="col-md-12"
            ></v-text-field>
            <v-col>
              <v-text-field
                solo
                prepend-inner-icon="mdi-email"
                v-model="ammount"
                hide-details
                label="Ammount (Jumlah)"
                class="col-md-5"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-email"
                v-model="inWords"
                hide-details
                label="In Words (Terbilang)"
                class="col-md-12"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-email"
                v-model="saldoAnggaran"
                hide-details
                label="Saldo Anggaran"
                class="col-md-5"
              ></v-text-field>
              <v-textarea
                rows="4"
                cols="80"
                placeholder="Here can be your description"
                solo
                prepend-inner-icon="mdi-email"
                v-model="notes"
                hide-details
                label="Notes"
                class="col-md-8"
              ></v-textarea>
            </v-col>
            <v-col v-show="errorm" cols="12">
              <v-alert type="error">Error alert</v-alert>
            </v-col>
          </v-row>

          <v-btn height="50px" block big dark @click="requestform()" class="grad">Submit</v-btn>
        </v-form>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'blank',
  auth: 'guest',
  data() {
    return {
      namePIC: '',
      divison: '',
      budgetCode: '',
      budgetName: '',
      allocation: '',
      ammount: '',
      inWords: '',
      saldoAnggaran: '',
      notes: '',
      errorm: false
    }
  },
  methods: {
    requestform() {
      const body = new FormData()
      body.append('namePIC', this.namePIC)
      body.append('division', this.division)
      body.append('budgetCode', this.budgetCode)
      body.append('bugdetName', this.budgetName)
      body.append('allocation', this.allocation)
      body.append('ammount', this.ammount)
      body.append('inWords', this.inWords)
      body.append('saldoAnggaran', this.saldoAnggaran)
      body.append('notes', this.notes)
      this.$axios({
        method: 'post',
        url: 'auth/requestform',
        data: body
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(() => this.$router.push('/'))
    }
  },
  mounted() {
    this.$store.commit('setCurrentPageTitle', 'requestform')
  }
}
</script>
<style>
.bg {
  /*background: linear-gradient(0deg, rgba(0, 0, 0, 0.425), rgba(0, 0, 0, 0.623)), url(~assets/img/bg.jpg) no-repeat center center;*/
  background-size: cover;
}
body {
  overflow: hidden;
}
</style>