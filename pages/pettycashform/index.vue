<template>
  <div>
    <!-- Konten -->
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

      <br>

      <!--Table-->
      <v-data-table
        :headers="headers"
        :items="pettycash_forms"
        :items-per-page="10"
        class="rounded-table"
        color="white"
      >
        <!--data table-->
        <template v-slot:item.date="{item}">
          <div>
            {{ item.date }}
          </div>
        </template>
        <template v-slot:item.user="{item}">
          <div>
            {{ item.user.name }}
          </div>
        </template>
        <template v-slot:item.method="{item}">
          <div>
            {{ item.method }}
          </div>
        </template>
        <template v-slot:item.amount="{item}">
          <div>
            Rp. {{ item.amount.toLocaleString('id-ID') }}
          </div>
        </template>
        <template v-slot:item.id="{item}">
          <nuxt-link :to="'/pettycashform/'+item.id" id="nuxt-link">
            <v-btn  class="my-2" dark small  color="teal">
              Detail Form
            </v-btn>
          </nuxt-link>
          <v-btn v-model="deleteForm" class="my-2"  dark small fab color="indigo" @click="confirmDeletePettyCashForm(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>

    <!-- Floating button nambah -->
    <v-btn
      id="tambah"
      @click="dialogStorePettyCashForm = true"
      class="mx-2"
      dark
      color="#008080"
      fab
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>

    <v-dialog v-model="dialogStorePettyCashForm" width="640px" persistent>
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

              <!-- Modal Buat Bagian Petty Cash Detail -->
<!--              <v-row>-->
<!--                <v-col cols="4">-->
<!--                  <v-text-field-->
<!--                    solo-->
<!--                    prepend-inner-icon="mdi-cash-multiple"-->
<!--                    v-model="budgetCode"-->
<!--                    hide-details-->
<!--                    label="Budget Code"-->
<!--                  ></v-text-field>-->
<!--                </v-col>-->
<!--                <v-col cols="4">-->
<!--                  <v-text-field-->
<!--                    solo-->
<!--                    prepend-inner-icon="mdi-cash-multiple"-->
<!--                    v-model="budgetName"-->
<!--                    hide-details-->
<!--                    label="Budget Name"-->
<!--                  ></v-text-field>-->
<!--                </v-col>-->
<!--                <v-col cols="4">-->
<!--                  <v-text-field-->
<!--                    solo-->
<!--                    prepend-inner-icon="mdi-cash-multiple"-->
<!--                    v-model="nominal"-->
<!--                    hide-details-->
<!--                    label="Nominal"-->
<!--                  ></v-text-field>-->
<!--                </v-col>-->
<!--              </v-row>-->

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
                  <v-btn height="50px" block big dark  color="#06beb6" @click="storePettyCashForm()" >Submit</v-btn>
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

    <!-- Dialog yakin atau ga -->
    <v-dialog v-model="dialogSure" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">Yakin akan menghapus?</v-card-title>
        <v-card-text>Kamu tidak akan dapat mengembalikan form yang sudah dihapus.</v-card-text>
        <v-card-actions>
          <v-row>
            <v-col  cols="6">
              <v-btn color="green darken-1" block text @click="dialogSure = false">Tidak</v-btn>
            </v-col>
            <v-col  cols="6">
              <v-btn color="green darken-1" text block @click="deletePettyCashForm()">Yakin</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogSure: false,
      deletedId: '',
      search: '',
      deleteForm: false,
      dialogStorePettyCashForm: false,
      datePicker: false,
      formPettyCashHeaderData: true,
      errorm: false,
      delay: 750,
      rules: {
        required: value => !!value || 'Required.',
      },
      headers: [
        { text: 'Tanggal Pembuatan', value: 'created_at' },
        { text: 'Tanggal Pemakaian', value: 'date' },
        { text: 'PIC', value: 'user.name' },
        { text: 'Allocation', value: 'allocation' },
        { text: 'Jumlah', value: 'amount' },
        { text: 'Detail', value: 'id', sortable: false }
      ],
      pettycash_forms: [],
      storePettyCashFormData: {
        date: '',
        allocation: '',
        amount: ''
      }
    }
  },
  methods: {
    async getPettyCashForms () {
      const params = {

      }
      await this.$axios.$get('/form/petty-cash', {params})
        .then((response) => {
          console.log(response)
          this.pettycash_forms = response.form_petty_cash
        })
    },
    async storePettyCashForm() {
      if (this.$refs.formPettyCashHeaderForm.validate()) {
        console.log(this.storePettyCashFormData.allocation)
        const body = new FormData()
        body.append('date', this.storePettyCashFormData.date)
        body.append('allocation', this.storePettyCashFormData.allocation)
        body.append('amount', this.storePettyCashFormData.amount)
        this.$axios({
          method: 'post',
          url: '/form/petty-cash',
          data: body
        })
          .then((response) => {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error)
          })
        this.$refs.formPettyCashHeaderForm.reset()
        this.dialogStorePettyCashForm = false
      }
    },
    async deletePettyCashForm () {
      const body = new FormData()
      body.append('id',this.deletedId)
      this.$axios({
        method: 'delete',
        url: '/form/petty-cash/'+this.deletedId,
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
    async confirmDeletePettyCashForm(item) {
      this.dialogSure = true
      this.deletedId = item.id
    }
  },
  mounted() {
    this.$store.commit('setCurrentPageTitle', 'Petty Cash Form')
    this.getPettyCashForms()
  },
  watch: {
    search () {
      this.getPettyCashForms()
    },
    dialogStorePettyCashForm: function() {
      setTimeout(() => this.getPettyCashForms(), this.delay);
    },
    dialogSure: function() {
      setTimeout(() => this.getPettyCashForms(), this.delay);
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
    background: transparent linear-gradient(to right, #06beb6, #48b1bf)
    no-repeat padding-box;
    box-shadow: 0px 3px 16px #00000029;

  }
  .rounded-table .v-data-table__wrapper,
  .rounded-other {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    box-shadow: 0px 3px 16px #00000029;
  }
</style>
