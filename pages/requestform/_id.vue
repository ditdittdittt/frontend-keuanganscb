<template>
  <div>
    <v-container class="py-0 my-0">
      <!-- Section Detail -->
      <v-row class="pb-5">
        <v-col cols="12">
          <div class="pa-1" />
        </v-col>

        <!-- Header -->
        <v-col cols="12">
          <v-row justify="center" class="grad rounded-other">
            <v-col>
              <h3>Request Form</h3>
            </v-col>
          </v-row>
        </v-col>

        <!-- Left Pane -->
        <v-col cols="12" lg="12">
          <!-- Header -->

          <!-- Id -->
          <v-row justify="center">
            <v-col cols="4">
              <h4>Id</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ requestForm.id }}</p>
            </v-col>
          </v-row>

          <!-- Created at -->
          <v-row>
            <v-col cols="4">
              <h4>Tanggal Pembuatan</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ requestForm.created_at }}</p>
            </v-col>
          </v-row>

          <!-- Updated at -->
          <v-row>
            <v-col cols="4">
              <h4>Terakhir diupdate</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ requestForm.updated_at }}</p>
            </v-col>
          </v-row>

          <!-- Tanggal Penggunaan -->
          <v-row>
            <v-col cols="4">
              <h4>Tanggal Penggunaan</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ requestForm.date }}</p>
            </v-col>
          </v-row>

          <!-- Pembuat -->
          <v-row>
            <v-col cols="4">
              <h4>Pembuat</h4>
            </v-col>
            <v-col cols="8">
              <div class="body-1">{{ requestForm.user.name }}</div>
            </v-col>
          </v-row>

          <!-- Email -->
          <v-row>
            <v-col cols="4">
              <h4>Email</h4>
            </v-col>
            <v-col cols="8">
              <div class="body-1">{{ requestForm.user.email }}</div>
            </v-col>
          </v-row>

          <!-- Division -->
          <v-row>
            <v-col cols="4">
              <h4>Division</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ requestForm.user.division }}</p>
            </v-col>
          </v-row>

          <!-- Allocation -->
          <v-row>
            <v-col cols="4">
              <h4>Allocation</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ requestForm.allocation }}</p>
            </v-col>
          </v-row>

          <!-- Method -->
          <v-row>
            <v-col cols="4">
              <h4>Method</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ requestForm.method }}</p>
            </v-col>
          </v-row>

          <!-- Jumlah -->
          <v-row>
            <v-col cols="4">
              <h4>Amount</h4>
            </v-col>
            <v-col cols="8">
              <p>Rp. {{ parseFloat(requestForm.amount).toLocaleString() }}</p>
            </v-col>
          </v-row>

          <!-- Attachment -->
          <v-row>
            <v-col cols="4">
              <h4>Attachment</h4>
            </v-col>
            <v-col cols="8">
              <a @click="openFile()">Click here!</a>
            </v-col>
          </v-row>

          <!-- Notes -->
          <v-row>
            <v-col cols="4">
              <h4>Notes</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ requestForm.notes }}</p>
            </v-col>
          </v-row>

          <!-- Confirm as PIC -->
          <v-row>
            <v-col cols="4">
              <h4>PIC Confirmed</h4>
            </v-col>
            <v-col cols="8">
              <p v-if="requestForm.is_confirmed_pic == 0">Belum disetujui</p>
              <p v-if="requestForm.is_confirmed_pic == 1">Sudah disetujui</p>
            </v-col>
          </v-row>

          <!-- Confirm as Verificator -->
          <v-row>
            <v-col cols="4">
              <h4>Verificator Confirmed</h4>
            </v-col>
            <v-col cols="8">
              <p v-if="requestForm.is_confirmed_verificator == 0">Belum disetujui</p>
              <p v-if="requestForm.is_confirmed_verificator == 1">Sudah disetujui</p>
            </v-col>
          </v-row>

          <!-- Confirm as Head Dept -->
          <v-row>
            <v-col cols="4">
              <h4>Head Department Confirmed</h4>
            </v-col>
            <v-col cols="8">
              <p v-if="requestForm.is_confirmed_head_dept == 0">Belum disetujui</p>
              <p v-if="requestForm.is_confirmed_head_dept == 1">Sudah disetujui</p>
            </v-col>
          </v-row>

          <!-- Confirm as Cashier -->
          <v-row>
            <v-col cols="4">
              <h4>Cashier Confirmed</h4>
            </v-col>
            <v-col cols="8">
              <p v-if="requestForm.is_confirmed_cashier == 0">Belum disetujui</p>
              <p v-if="requestForm.is_confirmed_cashier == 1">Sudah disetujui</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Section Action -->
      <template>
        <v-row justify-content="space-between" v-if="checkEdit(this.requestForm)">
          <v-col>
            <v-btn @click="dialogSureDelete = true" block large color="#ECEFF1">Hapus</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="showDialogUpdateRequestForm()" block large dark color="#008080">Update</v-btn>
          </v-col>
        </v-row>
        <v-row justify-content="space-between" v-if="requestForm.is_confirmed_pic == 0">
          <v-col cols="12">
            <v-btn
              @click="showDialogConfirmForm('pic')"
              block
              large
              dark
              color="#008080"
            >Konfirmasi sebagai PIC</v-btn>
          </v-col>
        </v-row>
        <v-row justify-content="space-between" v-if="requestForm.is_confirmed_verificator == 0">
          <v-col cols="12">
            <v-btn
              @click="showDialogConfirmForm('verificator')"
              block
              large
              dark
              color="#008080"
            >Konfirmasi sebagai Verificator</v-btn>
          </v-col>
        </v-row>
        <v-row justify-content="space-between" v-if="requestForm.is_confirmed_head_dept == 0">
          <v-col cols="12">
            <v-btn
              @click="showDialogConfirmForm('headDept')"
              block
              large
              dark
              color="#008080"
            >Konfirmasi sebagai Head Dept</v-btn>
          </v-col>
        </v-row>
        <v-row justify-content="space-between" v-if="requestForm.is_confirmed_cashier == 0">
          <v-col cols="12">
            <v-btn
              @click="showDialogConfirmForm('cashier')"
              block
              large
              dark
              color="#008080"
            >Konfirmasi sebagai Cashier</v-btn>
          </v-col>
        </v-row>
      </template>

      <!-- Modal Update -->
      <v-dialog v-model="dialogUpdateRequestForm" width="640px" persistent>
        <v-card flat>
          <v-container fluid fill-height grid-list-md text-xs-center class="bg">
            <v-layout row wrap align-center justify-center>
              <v-card-title>
                <h1 slot="header" class="title">Update Form Request</h1>
              </v-card-title>
              <v-form ref="formRequestForm" v-model="formRequestFormData" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-menu
                      ref="datePicker"
                      v-model="datePicker"
                      :close-on-content-click="false"
                      :return-value="storeRequestFormData.date"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{on}">
                        <v-text-field
                          v-model="storeRequestFormData.date"
                          :rules="[rules.required]"
                          v-on="on"
                          prepend-inner-icon="mdi-calendar"
                          label="Date"
                        />
                      </template>
                      <v-date-picker v-model="storeRequestFormData.date" no-title scrollable>
                        <v-btn @click="datePicker = false" text color="primary">Cancel</v-btn>
                        <v-btn
                          @click="$refs.datePicker.save(storeRequestFormData.date)"
                          text
                          color="primary"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      prepend-inner-icon="mdi-home-map-marker"
                      v-model="storeRequestFormData.allocation"
                      hide-details
                      label="Allocation"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      prepend-inner-icon="mdi-cash-multiple"
                      v-model="storeRequestFormData.amount"
                      hide-details
                      label="Amount"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      prepend-inner-icon="mdi-cube-send"
                      v-model="storeRequestFormData.method"
                      hide-details
                      label="Cash / Transfer"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      rows="4"
                      cols="80"
                      placeholder="Catatan"
                      prepend-inner-icon="mdi-file-delimited"
                      v-model="storeRequestFormData.notes"
                      hide-details
                      label="Notes"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <!--                  <div id="example-3">-->
                    <!--                    <h4>Attachment</h4>-->
                    <!--                    <input type="checkbox" id="proker" value="Proker" v-model="storeRequestFormData.attachment" />-->
                    <!--                    <label for="proker">Program Kerja</label>-->
                    <!--                    <input type="checkbox" id="invoice" value="Invoice" v-model="storeRequestFormData.attachment" />-->
                    <!--                    <label for="invoice">Invoice</label>-->
                    <!--                    <input type="checkbox" id="fpbj" value="FPBJ" v-model="storeRequestFormData.attachment" />-->
                    <!--                    <label for="fpbj">FPBJ</label>-->
                    <!--                    <input type="checkbox" id="exsum" value="Exsum" v-model="storeRequestFormData.attachment" />-->
                    <!--                    <label for="exsum">Expense Summary</label>-->
                    <!--                  </div>-->
                    <v-file-input
                      v-model="storeRequestFormData.attachment"
                      chips
                      label="Attachment File"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" v-show="errorm">
                    <v-alert type="error">Error alert</v-alert>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-btn
                      height="50px"
                      block
                      big
                      dark
                      color="#06beb6"
                      @click="updateRequestForm()"
                    >Simpan</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      height="50px"
                      block
                      big
                      @click.stop="dialogUpdateRequestForm = false "
                    >Batal</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- Dialog Yakin Hapus -->
      <v-dialog v-model="dialogSureDelete" persistent max-width="320">
        <v-card>
          <v-card-title class="headline">Yakin akan menghapus?</v-card-title>
          <v-card-text>Kamu tidak akan dapat mengembalikan form yang sudah dihapus.</v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-btn color="green darken-1" block text @click="dialogSureDelete = false">Tidak</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="green darken-1" text block @click="deleteRequestForm()">Yakin</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog Yakin Konfirmasi -->
      <v-dialog v-model="dialogSureConfirm" persistent max-width="320">
        <v-card>
          <v-card-title class="headline">Yakin akan mengkonfirmasi?</v-card-title>
          <v-card-text>Kamu tidak akan dapat melakukan perubahan terhadap form yang telah dikonfirmasi.</v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-btn color="green darken-1" block text @click="dialogSureConfirm = false">Tidak</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="green darken-1" text block @click="confirmRequestForm()">Yakin</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogSureDelete: false,
      dialogSureConfirm: false,
      formRequestFormData: true,
      dialogUpdateRequestForm: false,
      errorm: false,
      datePicker: false,
      choosenRequestFormId: '',
      confirmAs: '',
      rules: {
        required: (value) => !!value || 'Required.'
      },
      requestForm: {
        id: '',
        created_at: '',
        updated_at: '',
        user_id: '',
        date: '',
        method: '',
        allocation: '',
        amount: '',
        attachment: null,
        notes: '',
        is_confirmed_pic: '',
        is_confirmed_verificator: '',
        is_confirmed_head_dept: '',
        is_confirmed_cashier: '',
        user: {}
      },
      storeRequestFormData: {
        date: '',
        method: '',
        allocation: '',
        amount: '',
        attachment: null,
        notes: ''
      }
    }
  },

  methods: {
    async openFile() {
      window.open(this.requestForm.attachment)
    },
    async getRequestForm() {
      await this.$axios
        .get('/form/request/' + this.choosenRequestFormId)
        .then((response) => {
          console.log(response)
          this.requestForm = response.data.form_request
        })
    },
    async confirmAsPic() {
      const body = new FormData()
      body.append('is_confirmed_pic', 1)
      await this.$axios({
        method: 'post',
        url: '/form/request/' + this.choosenRequestFormId,
        data: body
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      this.getRequestForm()
    },
    async confirmAsVerificator() {
      const body = new FormData()
      body.append('is_confirmed_verificator', 1)
      await this.$axios({
        method: 'post',
        url: '/form/request/' + this.choosenRequestFormId,
        data: body
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      this.getRequestForm()
    },
    async confirmAsHeadDept() {
      const body = new FormData()
      body.append('is_confirmed_head_dept', 1)
      await this.$axios({
        method: 'post',
        url: '/form/request/' + this.choosenRequestFormId,
        data: body
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      this.getRequestForm()
    },
    async confirmAsCashier() {
      const body = new FormData()
      body.append('is_confirmed_cashier', 1)
      await this.$axios({
        method: 'post',
        url: '/form/request/' + this.choosenRequestFormId,
        data: body
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      this.getRequestForm()
    },
    checkEdit(item) {
      if (
        item.is_confirmed_pic === 0 &&
        item.is_confirmed_verificator === 0 &&
        item.is_confirmed_cashier === 0 &&
        item.is_confirmed_head_dept === 0 &&
        item.user_id === this.$auth.user.id
      ) {
        return true
      }
    },
    async deleteRequestForm() {
      this.$axios({
        method: 'delete',
        url: '/form/request/' + this.choosenRequestFormId
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      this.dialogSureDelete = false
      this.$router.replace('/requestform')
    },
    async showDialogUpdateRequestForm() {
      this.dialogUpdateRequestForm = true
      this.storeRequestFormData.date = this.requestForm.date
      this.storeRequestFormData.allocation = this.requestForm.allocation
      this.storeRequestFormData.amount = this.requestForm.amount
      this.storeRequestFormData.method = this.requestForm.method
      this.storeRequestFormData.notes = this.requestForm.notes
      this.storeRequestFormData.attachment = this.requestForm.attachment
    },
    async updateRequestForm() {
      if (this.$refs.formRequestForm.validate()) {
        const body = new FormData()
        body.append('date', this.storeRequestFormData.date)
        body.append('method', this.storeRequestFormData.method)
        body.append('allocation', this.storeRequestFormData.allocation)
        body.append('amount', this.storeRequestFormData.amount)
        body.append('attachment', this.storeRequestFormData.attachment)
        body.append('notes', this.storeRequestFormData.notes)
        this.$axios({
          method: 'post',
          url: '/form/request/' + this.choosenRequestFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.$refs.formRequestForm.reset()
        this.dialogUpdateRequestForm = false
        this.getRequestForm()
      }
    },
    async showDialogConfirmForm(confirmAs) {
      this.dialogSureConfirm = true
      this.confirmAs = confirmAs
    },
    async confirmRequestForm() {
      if (this.confirmAs === 'pic') {
        this.confirmAsPic()
      } else if (this.confirmAs === 'verificator') {
        this.confirmAsVerificator()
      } else if (this.confirmAs === 'headDept') {
        this.confirmAsHeadDept()
      } else if (this.confirmAs === 'cashier') {
        this.confirmAsCashier()
      }
      this.confirmAs = ''
      this.dialogSureConfirm = false
    }
  },
  mounted() {
    this.choosenRequestFormId = this.$route.params.id
    this.getRequestForm()
    this.$store.commit('setCurrentPageTitle', 'Form Request Detail')
  },
  watch: {}
}
</script>
<style>
.grad {
  color: white !important;
  background: transparent linear-gradient(to right, #06beb6, #48b1bf) no-repeat
    padding-box;
  box-shadow: 0px 3px 16px #00000029;
}
</style>
