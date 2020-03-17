<template>
  <v-container class="py-0 my-0">
    INI HALAMAN DETAIL PETTY CASH
    <!-- Section Detail -->
    <v-row class="pb-5">
      <v-col cols="12">
        <div class="pa-1"/>
      </v-col>

      <!-- Header -->
      <v-col cols="12">
        <v-row justify="center" class="grad rounded-other">
          <v-col>
            <h3>Petty Cash Form</h3>
          </v-col>
        </v-row>
      </v-col>

      <!-- Left Pane -->
      <v-col cols="12" lg="12" >
        <!-- Header -->

        <!-- Id -->
        <v-row justify="center">
          <v-col cols="4">
            <h4>Id</h4>
          </v-col>
          <v-col cols="8">
            <p>{{ pettyCashForm.id }}</p>
          </v-col>
        </v-row>

        <!-- Created at -->
        <v-row>
          <v-col cols="4">
            <h4>Tanggal Pembuatan</h4>
          </v-col>
          <v-col cols="8">
            <p>{{ pettyCashForm.created_at }}</p>
          </v-col>
        </v-row>

        <!-- Updated at -->
        <v-row>
          <v-col cols="4">
            <h4>Terakhir diupdate</h4>
          </v-col>
          <v-col cols="8">
            <p>{{ pettyCashForm.updated_at }}</p>
          </v-col>
        </v-row>

        <!-- Tanggal Penggunaan -->
        <v-row>
          <v-col cols="4">
            <h4>Tanggal Penggunaan</h4>
          </v-col>
          <v-col cols="8">
            <p>{{ pettyCashForm.date }}</p>
          </v-col>
        </v-row>

        <!-- Pembuat -->
        <v-row>
          <v-col cols="4">
            <h4>Pembuat</h4>
          </v-col>
          <v-col cols="8">
            <div class="body-1">
              {{ pettyCashForm.user.name }}
            </div>
          </v-col>
        </v-row>

        <!-- Email -->
        <v-row>
          <v-col cols="4">
            <h4>Email</h4>
          </v-col>
          <v-col cols="8">
            <div class="body-1">
              {{ pettyCashForm.user.email }}
            </div>
          </v-col>
        </v-row>

        <!-- Division -->
        <v-row>
          <v-col cols="4">
            <h4>Division</h4>
          </v-col>
          <v-col cols="8">
            <p>{{ pettyCashForm.user.division }}</p>
          </v-col>
        </v-row>

        <!-- Allocation -->
        <v-row>
          <v-col cols="4">
            <h4>Allocation</h4>
          </v-col>
          <v-col cols="8">
            <p>{{ pettyCashForm.allocation }}</p>
          </v-col>
        </v-row>


        <!-- Amount -->
        <v-row>
          <v-col cols="4">
            <h4>Amount</h4>
          </v-col>
          <v-col cols="8">
            <p>Rp. {{ parseFloat(pettyCashForm.amount).toLocaleString() }}</p>
          </v-col>
        </v-row>

        <!-- Confirm as PIC -->
        <v-row>
          <v-col cols="4">
            <h4>PIC Confirmed</h4>
          </v-col>
          <v-col cols="8">
            <p v-if="pettyCashForm.is_confirmed_pic == 0">Belum disetujui</p>
            <p v-if="pettyCashForm.is_confirmed_pic == 1">Sudah disetujui</p>
          </v-col>
        </v-row>

        <!-- Confirm as Head Dept -->
        <v-row>
          <v-col cols="4">
            <h4>Manager Ops Confirmed</h4>
          </v-col>
          <v-col cols="8">
            <p v-if="pettyCashForm.is_confirmed_manager_ops == 0">Belum disetujui</p>
            <p v-if="pettyCashForm.is_confirmed_manager_ops == 1">Sudah disetujui</p>
          </v-col>
        </v-row>

        <!-- Confirm as Cashier -->
        <v-row>
          <v-col cols="4">
            <h4>Cashier Confirmed</h4>
          </v-col>
          <v-col cols="8">
            <p v-if="pettyCashForm.is_confirmed_cashier == 0">Belum disetujui</p>
            <p v-if="pettyCashForm.is_confirmed_cashier == 1">Sudah disetujui</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Section Action -->
    <template>
      <v-row justify-content="space-between" v-if="checkEdit(this.pettyCashForm)">
        <v-col>
          <v-btn @click="dialogSureDelete = true" block large color="#ECEFF1">
            Hapus
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="showDialogUpdatePettyCashForm()" block large dark color="#008080">
            Update
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify-content="space-between" v-if="pettyCashForm.is_confirmed_pic == 0">
        <v-col cols="12">
          <v-btn @click="showDialogConfirmForm('pic')" block large dark color="#008080">
            Konfirmasi sebagai PIC
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify-content="space-between" v-if="pettyCashForm.is_confirmed_manager_ops == 0">
        <v-col cols="12">
          <v-btn @click="showDialogConfirmForm('managerOps')" block large dark color="#008080">
            Konfirmasi sebagai Manager Ops
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify-content="space-between" v-if="pettyCashForm.is_confirmed_cashier == 0">
        <v-col cols="12">
          <v-btn @click="showDialogConfirmForm('cashier')" block large dark color="#008080">
            Konfirmasi sebagai Cashier
          </v-btn>
        </v-col>
      </v-row>
    </template>

    <!-- Dialog Yakin Konfirmasi -->
    <v-dialog v-model="dialogSureConfirm" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">Yakin akan mengkonfirmasi?</v-card-title>
        <v-card-text>Kamu tidak akan dapat melakukan perubahan terhadap form yang telah dikonfirmasi.</v-card-text>
        <v-card-actions>
          <v-row>
            <v-col  cols="6">
              <v-btn color="green darken-1" block text @click="dialogSureConfirm = false">Tidak</v-btn>
            </v-col>
            <v-col  cols="6">
              <v-btn color="green darken-1" text block @click="confirmPettyCashForm()">Yakin</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Yakin Hapus -->
    <v-dialog v-model="dialogSureDelete" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">Yakin akan menghapus?</v-card-title>
        <v-card-text>Kamu tidak akan dapat mengembalikan form yang sudah dihapus.</v-card-text>
        <v-card-actions>
          <v-row>
            <v-col  cols="6">
              <v-btn color="green darken-1" block text @click="dialogSureDelete = false">Tidak</v-btn>
            </v-col>
            <v-col  cols="6">
              <v-btn color="green darken-1" text block @click="deletePettyCashForm()">Yakin</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogUpdatePettyCashForm" width="640px" persistent>
      <v-card flat>
        <v-container fluid fill-height grid-list-md text-xs-center class="bg">
          <v-layout row wrap align-center justify-center>
            <v-card-title>
              <h1 slot="header" class="title">Buat Form Petty Cash</h1>
            </v-card-title>
            <v-form
              ref="formPettyCashHeaderForm"
              v-model="formPettyCashHeaderData"
              lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-menu
                    ref="datePicker"
                    v-model="datePicker"
                    :close-on-content-click="false"
                    :return-value="storePettyCashFormData.date"
                    transition="scale-transition"
                    min-width="290px"
                  >
                    <template v-slot:activator="{on}">
                      <v-text-field
                        v-model="storePettyCashFormData.date"
                        :rules="[rules.required]"
                        v-on="on"
                        solo
                        prepend-inner-icon="mdi-calendar"
                        label="Date"
                      />
                    </template>
                    <v-date-picker v-model="storePettyCashFormData.date" no-title scrollable>
                      <v-btn @click="datePicker = false" text color="primary">
                        Cancel
                      </v-btn>
                      <v-btn
                        @click="$refs.datePicker.save(storePettyCashFormData.date)"
                        text
                        color="primary"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    solo
                    prepend-inner-icon="mdi-home-map-marker"
                    v-model="storePettyCashFormData.allocation"
                    hide-details
                    label="Allocation / Peruntukan"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    solo
                    prepend-inner-icon="mdi-cash-multiple"
                    v-model="storePettyCashFormData.amount"
                    hide-details
                    label="Amount"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" v-show="errorm">
                  <v-alert type="error">Error alert</v-alert>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-btn height="50px" block big dark  color="#06beb6" @click="updatePettyCashForm()" >Submit</v-btn>
                </v-col>
                <v-col>
                  <v-btn height="50px" block big  @click.stop="dialogStorePettyCashForm = false ">Batal</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialogSureDelete: false,
        dialogSureConfirm: false,
        formPettyCashHeaderData: true,
        dialogUpdatePettyCashForm : false,
        errorm: false,
        datePicker: false,
        choosenPettyCashFormId: '',
        confirmAs: '',
        rules: {
          required: value => !!value || 'Required.',
        },
        pettyCashForm: {
          id: '',
          created_at: '',
          updated_at: '',
          user_id: '',
          date: '',
          allocation: '',
          amount: '',
          is_confirmed_pic: '',
          is_confirmed_manager_ops: '',
          is_confirmed_cashier: '',
          user: {
            id: '',
            name: '',
            email: '',
            division: ''
          }
        },
        storePettyCashFormData: {
          date: '',
          allocation: '',
          amount: ''
        }
      }
    },
    methods: {
      async getPettyCashForm () {
        await this.$axios
          .get('/form/petty-cash/'+this.choosenPettyCashFormId)
          .then((response) => {
            console.log(response)
            this.pettyCashForm = response.data.form_petty_cash
          })
      },
      async confirmAsPic () {
        const body = new FormData()
        body.append('is_confirmed_pic', 1)
        await this.$axios({
          method: 'post',
          url: '/form/petty-cash/'+this.choosenPettyCashFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.getPettyCashForm()
      },
      async confirmAsManagerOps () {
        const body = new FormData()
        body.append('is_confirmed_manager_ops', 1)
        await this.$axios({
          method: 'post',
          url: '/form/petty-cash/'+this.choosenPettyCashFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.getPettyCashForm()
      },
      async confirmAsCashier () {
        const body = new FormData()
        body.append('is_confirmed_cashier', 1)
        await this.$axios({
          method: 'post',
          url: '/form/petty-cash/'+this.choosenPettyCashFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.getPettyCashForm()
      },
      checkEdit (item) {
        if (item.is_confirmed_pic === 0  && item.is_confirmed_cashier === 0 && item.is_confirmed_manager_ops === 0 && item.user_id === this.$auth.user.id) {
          return true
        }
      },
      async showDialogConfirmForm(confirmAs) {
        this.dialogSureConfirm = true
        this.confirmAs = confirmAs
      },
      async confirmPettyCashForm() {
        if (this.confirmAs === 'pic') {
          this.confirmAsPic()
        } else if (this.confirmAs === 'managerOps') {
          this.confirmAsManagerOps()
        } else if (this.confirmAs === 'cashier') {
          this.confirmAsCashier()
        }
        this.confirmAs = ''
        this.dialogSureConfirm = false
      },
      async deletePettyCashForm () {
        this.$axios({
          method: 'delete',
          url: '/form/petty-cash/'+this.choosenPettyCashFormId,
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.dialogSureDelete = false
        this.$router.replace('/pettycashform')
      },
      async showDialogUpdatePettyCashForm () {
        this.dialogUpdatePettyCashForm = true
        this.storePettyCashFormData.date = this.pettyCashForm.date
        this.storePettyCashFormData.allocation = this.pettyCashForm.allocation
        this.storePettyCashFormData.amount = this.pettyCashForm.amount
      },
      async updatePettyCashForm() {
        if (this.$refs.formPettyCashHeaderForm.validate()) {
          const body = new FormData()
          body.append('date', this.storePettyCashFormData.date)
          body.append('allocation', this.storePettyCashFormData.allocation)
          body.append('amount', this.storePettyCashFormData.amount)
          this.$axios({
            method: 'post',
            url: '/form/petty-cash/'+this.choosenPettyCashFormId,
            data: body
          })
            .then((response) => {
              console.log(response)
            })
            .catch(function(error) {
              console.log(error)
            })
          this.$refs.formPettyCashHeaderForm.reset()
          this.dialogUpdatePettyCashForm = false
          this.getPettyCashForm()
        }
      },
    },
    mounted() {
      this.choosenPettyCashFormId = this.$route.params.id
      this.getPettyCashForm()
      this.$store.commit('setCurrentPageTitle', 'Form Petty Cash Detail')
    },
    watch: {

    }
  }
</script>

<style>
  .grad {
    color: white !important;
    background: transparent linear-gradient(to right, #06beb6, #48b1bf)
    no-repeat padding-box;
    box-shadow: 0px 3px 16px #00000029;
  }
</style>
