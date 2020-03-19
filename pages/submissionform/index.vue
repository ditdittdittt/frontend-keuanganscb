<template>
  <div>
    <!--Konten-->
    <v-container>
      <!--Search-->
      <v-text-field
        v-model="search"
        label="Cari Submission Form"
        prepend-inner-icon="mdi-magnify"
        single-line
        solo
        hide-details
        class="pb=2"
      />

      <br />

      <!--Table-->
      <v-data-table
        :headers="headers"
        :items="submission_forms"
        :items-per-page="10"
        class="rounded-table"
        color="black"
      >
        <!--data table-->
        <template v-slot:item.date="{item}">
          <div>{{ item.date }}</div>
        </template>
        <template v-slot:item.user="{item}">
          <div>{{ item.user.name }}</div>
        </template>
        <template v-slot:item.allocation="{item}">
          <div>{{ item.allocation }}</div>
        </template>
        <template v-slot:item.used="{item}">
          <div>Rp. {{ item.used.toLocaleString('id-ID') }}</div>
        </template>
        <template v-slot:item.balance="{item}">
          <div>Rp. {{ item.balance.toLocaleString('id-ID') }}</div>
        </template>

        <template v-slot:item.id="{item}">
          <nuxt-link :to="'/submissionform/'+item.id" id="nuxt-link">
            <v-btn class="my-2" dark small color="teal">Detail Form</v-btn>
          </nuxt-link>
          <v-btn
            v-model="deleteForm"
            class="my-2"
            dark
            small
            fab
            color="indigo"
            @click="confirmDeleteSubmissionForm(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
    <!-- End Konten -->

    <!-- Floating button nambah -->
    <v-btn
      id="tambah"
      @click="dialogTambahSubmissionForm = true"
      class="mx-2"
      dark
      color="#008080"
      fab
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <!-- Modal Dialog -->

    <v-dialog v-model="dialogTambahSubmissionForm" width="640px" persistent>
      <v-card flat>
        <v-container fluid fill-height grid-list-md text-xs-center class="bg">
          <v-layout row wrap align-center justify-center>
            <v-card-title>
              <h1 slot="header" class="title">Buat Form Submission</h1>
            </v-card-title>
            <v-form ref="formSubmissionForm" v-model="formSubmissionFormData" lazy-validation>
              <v-row>
                <v-col cols="6">
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
                <v-col cols="6">
                  <v-text-field
                    prepend-inner-icon="mdi-numeric"
                    v-model="storeSubmissionFormData.request_id"
                    hide-details
                    label="Request ID"
                  ></v-text-field>
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
                    @click="storeSubmissionForm()"
                  >Submit</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    height="50px"
                    block
                    big
                    @click.stop="dialogTambahSubmissionForm = false "
                  >Batal</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <!--modal yakin atau tidak -->
    <v-dialog v-model="dialogSure" persistent max-width="310">
      <!--      <template v-slot:activator="{ on }">-->
      <!--        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>-->
      <!--      </template>-->
      <v-card>
        <v-card-title class="headline">Yakin akan menghapus?</v-card-title>
        <v-card-text>Kamu tidak akan dapat mengembalikan form yang sudah dihapus.</v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-btn color="green darken-1" text @click="dialogSure = false">Tidak</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="green darken-1" text @click="deleteSubmissionForm()">Yakin</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogSure: false,
      deletedId: '',
      search: '',
      deleteForm: false,
      dialogTambahSubmissionForm: false,
      datePicker: false,
      formSubmissionFormData: true,
      errorm: false,
      delay: 750,
      rules: {
        required: (value) => !!value || 'Required.'
      },
      headers: [
        { text: 'Tanggal Pembuatan', value: 'created_at' },
        { text: 'Tanggal Pemakaian', value: 'date' },
        { text: 'PIC', value: 'user.name' },
        { text: 'Allocation', value: 'allocation' },
        { text: 'Terpakai', value: 'used' },
        { text: 'Sisa', value: 'balance' },
        { text: 'Detail', value: 'id', sortable: false }
      ],
      submission_forms: [],
      storeSubmissionFormData: {
        request_id: '',
        date: '',
        used: '',
        balance: '',
        allocation: '',
        notes: ''
      }
    }
  },

  methods: {
    async getSubmissionForms() {
      const params = {}
      await this.$axios
        .$get('/form/submission', { params })
        .then((response) => {
          console.log(response)
          this.submission_forms = response.form_submission
        })
    },

    async storeSubmissionForm() {
      if (this.$refs.formSubmissionForm.validate()) {
        const body = new FormData()
        body.append('form_request_id', this.storeSubmissionFormData.request_id)
        body.append('date', this.storeSubmissionFormData.date)
        body.append('used', this.storeSubmissionFormData.used)
        body.append('balance', this.storeSubmissionFormData.balance)
        body.append('allocation', this.storeSubmissionFormData.allocation)
        body.append('notes', this.storeSubmissionFormData.notes)
        this.$axios({
          method: 'post',
          url: '/form/submission',
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.$refs.formSubmissionForm.reset()
        this.dialogTambahSubmissionForm = false
      }
    },

    async deleteSubmissionForm() {
      const body = new FormData()
      body.append('id', this.deletedId)
      this.$axios({
        method: 'delete',
        url: '/form/submission/' + this.deletedId,
        data: body
      })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      this.deletedId = ''
      this.dialogSure = false
    },

    async confirmDeleteSubmissionForm(item) {
      this.dialogSure = true
      this.deletedId = item.id
    }
  },

  mounted() {
    this.$store.commit('setCurrentPageTitle', 'Submission Form')
    this.getSubmissionForms()
  },
  watch: {
    search() {
      this.getSubmissionForms()
    },
    dialogTambahSubmissionForm: function() {
      setTimeout(() => this.getSubmissionForms(), this.delay)
    },
    dialogSure: function() {
      setTimeout(() => this.getSubmissionForms(), this.delay)
    }
  }
}
</script>
<style>
  #tambah {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
  .visited {
    background-color: #e92048;
  }
  .spacer {
    height: 160px;
  }
  #nuxt-link {
    text-decoration: none;
  }
  .v-data-table-header {
    color: white;
    background: transparent linear-gradient(to right, #06beb6, #48b1bf) no-repeat
    padding-box;
    box-shadow: 0px 3px 16px #00000029;
  }
  .rounded-table .v-data-table__wrapper,
  .rounded-other {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    box-shadow: 0px 3px 16px #00000029;
  }
</style>
