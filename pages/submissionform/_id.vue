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
              <h3>Submission Form</h3>
            </v-col>
          </v-row>
        </v-col>

        <!-- Pane -->
        <v-col cols="12" lg="12">

          <!-- Id -->
          <v-row justify="center">
            <v-col cols="4">
              <h4>Id</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.id }}</p>
            </v-col>
          </v-row>

          <!-- Request Id -->
          <v-row justify="center">
            <v-col cols="4">
              <h4>Form Request Id</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.form_request.id }}</p>
            </v-col>
          </v-row>

          <!-- Created at -->
          <v-row>
            <v-col cols="4">
              <h4>Tanggal Pembuatan</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.created_at }}</p>
            </v-col>
          </v-row>

          <!-- Updated at -->
          <v-row>
            <v-col cols="4">
              <h4>Terakhir diupdate</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.updated_at }}</p>
            </v-col>
          </v-row>

          <!-- Date -->
          <v-row>
            <v-col cols="4">
              <h4>Tanggal Penggunaan</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.date }}</p>
            </v-col>
          </v-row>

          <!-- Pembuat -->
          <v-row>
            <v-col cols="4">
              <h4>Pembuat</h4>
            </v-col>
            <v-col cols="8">
              <div class="body-1">{{ submissionForm.user.name }}</div>
            </v-col>
          </v-row>

          <!-- Email -->
          <v-row>
            <v-col cols="4">
              <h4>Email</h4>
            </v-col>
            <v-col cols="8">
              <div class="body-1">{{ submissionForm.user.email }}</div>
            </v-col>
          </v-row>

          <!-- Division -->
          <v-row>
            <v-col cols="4">
              <h4>Division</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.user.division }}</p>
            </v-col>
          </v-row>

          <!-- Used -->
          <v-row>
            <v-col cols="4">
              <h4>Used</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.used }}</p>
            </v-col>
          </v-row>

          <!-- Balance -->
          <v-row>
            <v-col cols="4">
              <h4>Balance</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.balance }}</p>
            </v-col>
          </v-row>

          <!-- Allocation -->
          <v-row>
            <v-col cols="4">
              <h4>Allocation</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.allocation }}</p>
            </v-col>
          </v-row>

          <!-- Notes -->
          <v-row>
            <v-col cols="4">
              <h4>Notes</h4>
            </v-col>
            <v-col cols="8">
              <p>{{ submissionForm.notes }}</p>
            </v-col>
          </v-row>

          <!-- Confirm as PIC -->
          <v-row>
            <v-col cols="4">
              <h4>PIC Confirmed</h4>
            </v-col>
            <v-col cols="8">
              <p v-if="submissionForm.is_confirmed_pic == 0">Belum disetujui</p>
              <p v-if="submissionForm.is_confirmed_pic == 1">Sudah disetujui</p>
            </v-col>
          </v-row>

          <!-- Confirm as Verificator -->
          <v-row>
            <v-col cols="4">
              <h4>Verificator Confirmed</h4>
            </v-col>
            <v-col cols="8">
              <p v-if="submissionForm.is_confirmed_verificator == 0">Belum disetujui</p>
              <p v-if="submissionForm.is_confirmed_verificator == 1">Sudah disetujui</p>
            </v-col>
          </v-row>

          <!-- Confirm as Head Dept -->
          <v-row>
            <v-col cols="4">
              <h4>Head Department Confirmed</h4>
            </v-col>
            <v-col cols="8">
              <p v-if="submissionForm.is_confirmed_head_dept == 0">Belum disetujui</p>
              <p v-if="submissionForm.is_confirmed_head_dept == 1">Sudah disetujui</p>
            </v-col>
          </v-row>

          <!-- Confirm as Head Office -->
          <v-row>
            <v-col cols="4">
              <h4>Head Office Confirmed</h4>
            </v-col>
            <v-col cols="8">
              <p v-if="submissionForm.is_confirmed_head_office == 0">Belum disetujui</p>
              <p v-if="submissionForm.is_confirmed_head_office == 1">Sudah disetujui</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Section Action -->
      <template>
        <v-row justify-content="space-between" v-if="checkEdit(this.submissionForm)">
          <v-col>
            <v-btn @click="dialogSureDelete = true" block large color="#ECEFF1">Hapus</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="showDialogUpdateSubmissionForm()" block large dark color="#008080">Update</v-btn>
          </v-col>
        </v-row>
        <v-row justify-content="space-between" v-if="submissionForm.is_confirmed_pic == 0">
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
        <v-row justify-content="space-between" v-if="submissionForm.is_confirmed_verificator == 0">
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
        <v-row justify-content="space-between" v-if="submissionForm.is_confirmed_head_dept == 0">
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
        <v-row justify-content="space-between" v-if="submissionForm.is_confirmed_head_office == 0">
          <v-col cols="12">
            <v-btn
              @click="showDialogConfirmForm('headOffice')"
              block
              large
              dark
              color="#008080"
            >Konfirmasi sebagai Head Office</v-btn>
          </v-col>
        </v-row>
      </template>

      <!-- Modal Update -->
      <v-dialog v-model="dialogUpdateSubmissionForm" width="640px" persistent>
        <v-card flat>
          <v-container fluid fill-height grid-list-md text-xs-center class="bg">
            <v-layout row wrap align-center justify-center>
              <v-card-title>
                <h1 slot="header" class="title">Update Form Submission</h1>
              </v-card-title>
              <v-form ref="formSubmissionForm" v-model="formSubmissionFormData" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-menu
                      ref="datePicker"
                      v-model="datePicker"
                      :close-on-content-click="false"
                      :return-value="storeSubmissionFormData.date"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{on}">
                        <v-text-field
                          v-model="storeSubmissionFormData.date"
                          :rules="[rules.required]"
                          v-on="on"
                          prepend-inner-icon="mdi-calendar"
                          label="Date"
                        />
                      </template>
                      <v-date-picker v-model="storeSubmissionFormData.date" no-title scrollable>
                        <v-btn @click="datePicker = false" text color="primary">Cancel</v-btn>
                        <v-btn
                          @click="$refs.datePicker.save(storeSubmissionFormData.date)"
                          text
                          color="primary"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      prepend-inner-icon="mdi-cash-100"
                      v-model="storeSubmissionFormData.used"
                      hide-details
                      label="Used"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      prepend-inner-icon="mdi-chart-line"
                      v-model="storeSubmissionFormData.balance"
                      hide-details
                      label="Balance"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      prepend-inner-icon="mdi-home-map-marker"
                      v-model="storeSubmissionFormData.allocation"
                      hide-details
                      label="Allocation"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      rows="4"
                      cols="80"
                      prepend-inner-icon="mdi-file-delimited"
                      v-model="storeSubmissionFormData.notes"
                      hide-details
                      label="Notes"
                    ></v-textarea>
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
                      @click="updateSubmissionForm()"
                    >Submit</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      height="50px"
                      block
                      big
                      @click.stop="dialogUpdateSubmissionForm = false "
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
                <v-btn color="green darken-1" text block @click="deleteSubmissionForm()">Yakin</v-btn>
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
                <v-btn color="green darken-1" text block @click="confirmSubmissionForm()">Yakin</v-btn>
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
        formSubmissionFormData: true,
        dialogUpdateSubmissionForm: false,
        errorm: false,
        datePicker: false,
        choosenSubmissionFormId: '',
        confirmAs: '',
        rules: {
          required: (value) => !!value || 'Required.'
        },
        submissionForm: {
          id: '',
          created_at: '',
          updated_at: '',
          form_request_id: '',
          user_id: '',
          date: '',
          used: '',
          balance: '',
          allocation: '',
          notes: '',
          is_confirmed_pic: '',
          is_confirmed_verificator: '',
          is_confirmed_head_dept: '',
          is_confirmed_head_office: '',
          user : {},
          form_request: {}
        },
        storeSubmissionFormData: {
          date: '',
          used: '',
          balance: '',
          allocation: '',
          notes: ''
        }
      }
    },

    methods: {
      async getSubmissionForm() {
        await this.$axios
        .get('/form/submission/' + this.choosenSubmissionFormId)
        .then((response) => {
          console.log(response)
          this.submissionForm = response.data.form_submission
        })
      },
      async confirmAsPic() {
        const body = new FormData()
        body.append('is_confirmed_pic', 1)
        await this.$axios({
          method: 'post',
          url: '/form/submission/' + this.choosenSubmissionFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.getSubmissionForm()
      },
      async confirmAsVerificator() {
        const body = new FormData()
        body.append('is_confirmed_verificator', 1)
        await this.$axios({
          method: 'post',
          url: '/form/submission/' + this.choosenSubmissionFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.getSubmissionForm()
      },
      async confirmAsHeadDept() {
        const body = new FormData()
        body.append('is_confirmed_head_dept', 1)
        await this.$axios({
          method: 'post',
          url: '/form/submission/' + this.choosenSubmissionFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.getSubmissionForm()
      },
      async confirmAsHeadOffice() {
        const body = new FormData()
        body.append('is_confirmed_head_office', 1)
        await this.$axios({
          method: 'post',
          url: '/form/submission/' + this.choosenSubmissionFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.getSubmissionForm()
      },
      checkEdit(item){
        if (
          item.is_confirmed_pic === 0 &&
          item.is_confirmed_verificator === 0 &&
          item.is_confirmed_head_office === 0 &&
          item.is_confirmed_head_dept === 0 &&
          item.user_id === this.$auth.user.id
        ) {
          return true
        }
      },
      async deleteSubmissionForm() {
        const body = new FormData()
        body.append('id', this.choosenSubmissionFormId)
        this.$axios({
          method: 'delete',
          url: '/form/submission/' + this.choosenSubmissionFormId,
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.dialogSureDelete = false
        this.$router.replace('/submissionform')
      },
      async showDialogUpdateSubmissionForm() {
        this.dialogUpdateSubmissionForm = true
        this.storeSubmissionFormData.date = this.submissionForm.date
        this.storeSubmissionFormData.allocation = this.submissionForm.allocation
        this.storeSubmissionFormData.used = this.submissionForm.used
        this.storeSubmissionFormData.balance = this.submissionForm.balance
        this.storeSubmissionFormData.notes = this.submissionForm.notes
      },
      async updateSubmissionForm() {
        if (this.$refs.formSubmissionForm.validate()) {
          const body = new FormData()
          body.append('date', this.storeSubmissionFormData.date)
          body.append('allocation', this.storeSubmissionFormData.allocation)
          body.append('used', this.storeSubmissionFormData.used)
          body.append('balance', this.storeSubmissionFormData.balance)
          body.append('notes', this.storeSubmissionFormData.notes)
          this.$axios({
            method: 'post',
            url: '/form/submission/' + this.choosenSubmissionFormId,
            data: body
          })
            .then((response) => {
              console.log(response)
            })
            .catch(function(error) {
              console.log(error)
            })
          this.$refs.formSubmissionForm.reset()
          this.dialogUpdateSubmissionForm = false
          this.getSubmissionForm()
        }
      },
      async showDialogConfirmForm(confirmAs) {
        this.dialogSureConfirm = true
        this.confirmAs = confirmAs
      },
      async confirmSubmissionForm() {
        if (this.confirmAs === 'pic') {
          this.confirmAsPic()
        } else if (this.confirmAs === 'verificator') {
          this.confirmAsVerificator()
        } else if (this.confirmAs === 'headDept') {
          this.confirmAsHeadDept()
        } else if (this.confirmAs === 'headOffice') {
          this.confirmAsHeadOffice()
        }
        this.confirmAs = ''
        this.dialogSureConfirm = false
      }
    },

    mounted() {
      this.choosenSubmissionFormId = this.$route.params.id
      this.getSubmissionForm()
      this.$store.commit('setCurrentPageTitle', 'Form Submission Detail')
    },

    watch: {

    }
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
