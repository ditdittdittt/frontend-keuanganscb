<template>
  <v-container class="py-0 my-0">
    <!-- Section Detail -->
    <v-row class="pb-5">

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
            <p>Rp. {{ parseFloat(pettyCashForm.amount).toLocaleString('id-ID') }}</p>
          </v-col>
        </v-row>

        <!-- Status -->
        <v-row>
          <v-col cols="4">
            <h4>Status</h4>
          </v-col>
          <v-col cols="8">
            <p>{{ pettyCashForm.status.status }}</p>
          </v-col>
        </v-row>

        <!-- Detailnya -->
        <v-data-table
          :headers="headers"
          :items="pettyCashForm.details"
          :items-per-page="10"
          class="rounded-table"
          color="white"
        >

          <!--data table-->
          <template v-slot:item.budget_code="{item}">
            <div>{{ item.budget_code.code }}</div>
          </template>
          <template v-slot:item.budget_name="{item}">
            <div>{{ item.budget_code.name }}</div>
          </template>
          <template v-slot:item.nominal="{item}">
            <div>Rp. {{ parseFloat(item.nominal).toLocaleString('id-ID') }}</div>
          </template>
          <template v-slot:item.id="{item}">
            <v-btn v-if="checkEdit()" class="my-2" dark small color="teal" @click="showDialogUpdatePettyCashDetail(item)">
              Update
            </v-btn>
            <v-btn
              v-if="checkEdit()"
              v-model="deletePettyCashDetailModel"
              class="my-2"
              dark
              small
              fab
              color="indigo"
              @click="deletePettyCashDetail(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>

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
      <v-row justify-content="space-between" v-if="checkEdit()">
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

    <!-- Dialog Update Petty Cash Header -->
    <v-dialog v-model="dialogUpdatePettyCashForm" width="640px" persistent>
      <v-card flat>
        <v-container fluid fill-height grid-list-md text-xs-center class="bg">
          <v-layout row wrap align-center justify-center>
            <v-card-title>
              <h1 slot="header" class="title">Update Form Petty Cash</h1>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="formPettyCashHeaderForm"
                v-model="formPettyCashHeaderData"
                lazy-validation
              >
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
                        <v-btn @click="datePicker = false" text color="primary">Cancel</v-btn>
                        <v-btn
                          @click="$refs.datePicker.save(storePettyCashFormData.date)"
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
                      solo
                      prepend-inner-icon="mdi-home-map-marker"
                      v-model="storePettyCashFormData.allocation"
                      hide-details
                      label="Allocation / Peruntukan"
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
                    <v-btn
                      height="50px"
                      block
                      big
                      dark
                      color="#06beb6"
                      @click="updatePettyCashForm()"
                    >Submit</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      height="50px"
                      block
                      big
                      @click.stop="dialogUpdatePettyCashForm= false"
                    >Batal</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Dialog Update Petty Cash Detail -->
    <v-dialog v-model="dialogUpdatePettyCashDetail" width="640px" persistent>
      <v-card flat>
        <v-container fluid fill-height grid-list-md text-xs-center class="bg">
          <v-layout row wrap align-center justify-center>
            <v-card-title>
              <h1 slot="header" class="title">Update Detail</h1>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="formPettyCashDetailForm"
                v-model="formPettyCashDetailData"
                lazy-validation
              >

                <!-- Budget -->
                <v-row>
                  <template>
                    <v-col cols="6" class="py-1">
                      <v-autocomplete
                        v-model="pettyCashDetail.budget_code.code"
                        :items="budgetCodeList.map(budgetCode => budgetCode.code)"
                        placeholder="Code"></v-autocomplete>
                    </v-col>
                    <!--                    <v-col cols="4" class="py-1" :key="'name-'+i">-->
                    <!--                      <v-text-field v-model="budgetList[i].budget_name" solo label="Name">-->
                    <!--                        {{ budgetCodeList.find(budgetCode => budgetCode.code == budgetList[i].budget_code).name }}-->
                    <!--                      </v-text-field>-->
                    <!--                    </v-col>-->
                    <v-col cols="6" class="py-1">
                      <v-text-field v-model="pettyCashDetail.nominal" solo label="Nominal"></v-text-field>
                    </v-col>
                  </template>
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
                      @click="updatePettyCashDetail()"
                    >Submit</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      height="50px"
                      block
                      big
                      @click.stop="dialogUpdatePettyCashDetail= false"
                    >Batal</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Dialog Store Petty Cash Detail -->
    <v-dialog v-model="dialogStorePettyCashDetail" width="640px" persistent>
      <v-card flat>
        <v-container fluid fill-height grid-list-md text-xs-center class="bg">
          <v-layout row wrap align-center justify-center>
            <v-card-title>
              <h1 slot="header" class="title">Simpan Detail</h1>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="formStorePettyCashDetailForm"
                v-model="formStorePettyCashDetailData"
                lazy-validation
              >

                <!-- Budget -->
                <v-row>
                  <template>
                    <v-col cols="6" class="py-1">
                      <v-combobox
                        v-model="storePettyCashDetailData.budget_code"
                        :items="budgetCodeList.map(budgetCode => budgetCode.code)"
                        placeholder="Code"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="6" class="py-1">
                      <v-text-field v-model="storePettyCashDetailData.nominal" solo label="Nominal"></v-text-field>
                    </v-col>
                  </template>
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
                      @click="storePettyCashDetail()"
                    >Submit</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      height="50px"
                      block
                      big
                      @click.stop="dialogStorePettyCashDetail= false"
                    >Batal</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Floating button nambah -->
    <v-btn
      id="tambah"
      @click="showDialogStorePettyCashDetail()"
      class="mx-2"
      dark
      color="#008080"
      fab
      v-if="checkEdit()"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialogSureDelete: false,
        dialogSureConfirm: false,
        formPettyCashHeaderData: true,
        formPettyCashDetailData: true,
        formStorePettyCashDetailData: true,
        dialogUpdatePettyCashDetail: false,
        dialogUpdatePettyCashForm : false,
        dialogStorePettyCashDetail: false,
        deletePettyCashDetailModel: false,
        errorm: false,
        datePicker: false,
        choosenPettyCashFormId: '',
        confirmAs: '',
        rules: {
          required: value => !!value || 'Required.',
        },
        pettyCashForm: {
          user: {},
          details: [],
          status: {}
        },
        storePettyCashFormData: {
          date: '',
          allocation: '',
          amount: '',
        },
        headers: [
          { text: 'Budget Code', value: 'budget_code' },
          { text: 'Budget Name', value: 'budget_name' },
          { text: 'Nominal', value: 'nominal' },
          { text: 'Detail', value: 'id', sortable: false }
        ],
        budgetCodeList: [],
        pettyCashDetail: {
          budget_code: {
            code: null,
            name: null
          },
          nominal: null
        },
        storePettyCashDetailData: {
          budget_code: '',
          nominal: ''
        }
      }
    },
    methods: {
      async showDialogStorePettyCashDetail(){
        this.storePettyCashDetailData.budget_code = this.budgetCodeList[0].code
        this.storePettyCashDetailData.nominal = null
        this.dialogStorePettyCashDetail = true
      },
      async deletePettyCashDetail(item){
        const body = new FormData()
        body.append('id', item.id)
        await this.$axios({
          method: 'delete',
          url: '/form/petty-cash/' + this.choosenPettyCashFormId +'/detail/' + item.id,
          data: body
        })
          .then((response) => {
          })
          .catch(function(error) {
            console.log(error)
          })
        await this.getPettyCashForm()
        await this.updateAmount()
      },
      async storePettyCashDetail(){
        let budgetCodeId = this.budgetCodeList.find(x => x.code === this.storePettyCashDetailData.budget_code).id
        const body = new FormData()
        body.append('budget_code_id', budgetCodeId)
        body.append('nominal', this.storePettyCashDetailData.nominal)
        await this.$axios({
          method: 'post',
          url: '/form/petty-cash/'+this.choosenPettyCashFormId+'/detail',
          data: body
        })
          .then((response) => {
          })
          .catch(function(error) {
            console.log(error)
          })
        await this.getPettyCashForm()
        await this.updateAmount()
        this.dialogStorePettyCashDetail = false

      },
      async updatePettyCashDetail(){
        let budgetCodeId = this.budgetCodeList.find(x => x.code === this.pettyCashDetail.budget_code.code).id
        const body = new FormData()
        body.append('budget_code_id', budgetCodeId)
        body.append('nominal', this.pettyCashDetail.nominal)
        await this.$axios({
          method: 'post',
          url: '/form/petty-cash/'+this.choosenPettyCashFormId+'/detail/'+this.pettyCashDetail.id,
          data: body
        })
          .then((response) => {
          })
          .catch(function(error) {
            console.log(error)
          })
        this.dialogUpdatePettyCashDetail = false
        this.$refs.formPettyCashDetailForm.reset()
        await this.getPettyCashForm()
        await this.updateAmount()
      },
      showDialogUpdatePettyCashDetail(item){
        this.dialogUpdatePettyCashDetail = true
        this.pettyCashDetail = item
      },
      async updateAmount() {
        var amount = 0
        for (let i=0; i<this.pettyCashForm.details.length; i++){
          amount = amount + Number(this.pettyCashForm.details[i].nominal)
        }
        const body = new FormData()
        if (this.pettyCashForm.details.length === 0){
          body.append('amount', 0)
        } else {
          body.append('amount', amount)
        }
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
      getAmount() {
        var amount = 0
        for (let i=0; i<this.pettyCashForm.details.length; i++){
          amount = amount + Number(this.pettyCashForm.details[i].nominal)
        }
        this.storePettyCashFormData.amount = amount
      },
      async getBudgetCode () {
        await this.$axios.$get('/budget-code')
          .then((response) => {
            this.budgetCodeList = response.budget_code
          })
      },
      async getPettyCashForm () {
        await this.$axios
          .get('/form/petty-cash/'+this.choosenPettyCashFormId)
          .then((response) => {
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
          })
          .catch(function(error) {
            console.log(error)
          })
        this.getPettyCashForm()
      },
      checkEdit () {
        if (this.pettyCashForm.is_confirmed_pic === 0  && this.pettyCashForm.is_confirmed_cashier === 0 && this.pettyCashForm.is_confirmed_manager_ops === 0 && this.pettyCashForm.user_id === this.$auth.user.id) {
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
      },
      async updatePettyCashForm() {
        if (this.$refs.formPettyCashHeaderForm.validate()) {
          this.getAmount()
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
      this.getBudgetCode()
    },
    watch: {

    },
  }
</script>

<style>
  .grad {
    color: white !important;
    background: transparent linear-gradient(to right, #06beb6, #48b1bf)
    no-repeat padding-box;
    box-shadow: 0px 3px 16px #00000029;
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
  #tambah {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>
