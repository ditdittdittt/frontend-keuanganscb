<template>
  <div>
    <!--Konten-->
    <v-container>
      <!--Search-->
      <v-text-field
        v-model="search"
        label="Cari Request Form"
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
        :items="request_forms"
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
        <template v-slot:item.method="{item}">
          <div>{{ item.method }}</div>
        </template>
        <template v-slot:item.amount="{item}">
          <div>Rp. {{ item.amount.toLocaleString('id-ID') }}</div>
        </template>

        <template v-slot:item.id="{item}">
          <nuxt-link :to="'/requestform/'+item.id" id="nuxt-link">
            <v-btn class="my-2" dark small color="teal">Detail Form</v-btn>
          </nuxt-link>
          <v-btn
            v-model="deleteForm"
            class="my-2"
            dark
            small
            fab
            color="indigo"
            @click="confirmDeleteRequestForm(item)"
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
      @click="dialogTambahRequestForm = true"
      class="mx-2"
      dark
      color="#008080"
      fab
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <!-- Modal Dialog -->
    <v-dialog v-model="dialogTambahRequestForm" width="640px" persistent>
      <v-card flat>
        <v-container fluid fill-height grid-list-md text-xs-center class="bg">
          <v-layout row wrap align-center justify-center>
            <v-card-title>
              <h1 slot="header" class="title">Buat Form Request</h1>
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
                  <v-select
                    :items="items"
                    prepend-inner-icon="mdi-cube-send"
                    v-model="storeRequestFormData.method"
                    hide-details
                    label="Payment Method"
                  ></v-select>
                </v-col>
              </v-row>

              <div v-if="storeRequestFormData.method === 'Transfer'">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      prepend-inner-icon="mdi-cash-usd"
                      hide-details
                      label="Bank Name"
                      v-model="storeRequestFormData.bank_name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      prepend-inner-icon="mdi-cash-100"
                      hide-details
                      label="Bank Code"
                      v-model="storeRequestFormData.bank_code"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      prepend-inner-icon="mdi-numeric"
                      hide-details
                      label="Account Number"
                      v-model="storeRequestFormData.account_number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      prepend-inner-icon="mdi-clipboard-account"
                      hide-details
                      label="Account Owner"
                      v-model="storeRequestFormData.account_owner"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    rows="4"
                    cols="80"
                    label="Notes"
                    prepend-inner-icon="mdi-file-delimited"
                    v-model="storeRequestFormData.notes"
                    hide-details
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
                    @click="storeRequestForm()"
                  >Submit</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    height="50px"
                    block
                    big
                    @click.stop="dialogTambahRequestForm = false "
                  >Batal</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <!--modal yakin atau tidak -->
    <v-dialog v-model="dialogSure" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">Yakin akan menghapus?</v-card-title>
        <v-card-text>Kamu tidak akan dapat mengembalikan form yang sudah dihapus.</v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-btn color="green darken-1" block text @click="dialogSure = false">Tidak</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="green darken-1" text block @click="deleteRequestForm()">Yakin</v-btn>
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
      dialogTambahRequestForm: false,
      datePicker: false,
      formRequestFormData: true,
      errorm: false,
      delay: 750,
      items: ['Cash', 'Transfer'],
      rules: {
        required: (value) => !!value || 'Required.'
      },
      headers: [
        { text: 'Tanggal Pembuatan', value: 'created_at' },
        { text: 'Tanggal Pemakaian', value: 'date' },
        { text: 'PIC', value: 'user.name' },
        { text: 'Pembayaran', value: 'method' },
        { text: 'Jumlah', value: 'amount' },
        { text: 'Detail', value: 'id', sortable: false }
      ],
      request_forms: [],
      storeRequestFormData: {
        date: '',
        method: '',
        bank_name: '',
        bank_code: '',
        account_number: '',
        account_owner: '',
        allocation: '',
        amount: '',
        attachment: null,
        notes: ''
      }
    }
  },

  methods: {
    async getRequestForms() {
      const params = {}
      await this.$axios.$get('/form/request', { params }).then((response) => {
        console.log(response)
        this.request_forms = response.form_request
      })
    },

    async storeRequestForm() {
      if (this.$refs.formRequestForm.validate()) {
        const body = new FormData()
        body.append('date', this.storeRequestFormData.date)
        body.append('method', this.storeRequestFormData.method)
        body.append('cash', this.storeRequestFormData.method)
        body.append('transfer', this.storeRequestFormData.method)
        body.append('bank_name', this.storeRequestFormData.bank_name)
        body.append('bank_code', this.storeRequestFormData.bank_code)
        body.append('account_number', this.storeRequestFormData.account_number)
        body.append('account_owner', this.storeRequestFormData.account_owner)
        body.append('allocation', this.storeRequestFormData.allocation)
        body.append('amount', this.storeRequestFormData.amount)
        body.append('attachment', this.storeRequestFormData.attachment)
        body.append('notes', this.storeRequestFormData.notes)
        console.log('cash', this.storeRequestFormData.method)
        console.log('transfer', this.storeRequestFormData.method)
        this.$axios({
          method: 'post',
          url: '/form/request',
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.$refs.formRequestForm.reset()
        this.dialogTambahRequestForm = false
      }
    },

    async deleteRequestForm() {
      const body = new FormData()
      body.append('id', this.deletedId)
      this.$axios({
        method: 'delete',
        url: '/form/request/' + this.deletedId,
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

    async confirmDeleteRequestForm(item) {
      this.dialogSure = true
      this.deletedId = item.id
    }
  },

  mounted() {
    this.$store.commit('setCurrentPageTitle', 'Request Form')
    this.getRequestForms()
  },
  watch: {
    search() {
      this.getRequestForms()
    },
    dialogTambahRequestForm: function() {
      setTimeout(() => this.getRequestForms(), this.delay)
    },
    dialogSure: function() {
      setTimeout(() => this.getRequestForms(), this.delay)
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
