<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>{{ $translate('components.form.title.request') }}</span>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click.stop="$export('pdf', 'request', $route.params.id)">
                      <v-list-item-title class="text-capitalize">{{ $translate('export.pdf') }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.number') }}</div>
                    <span>
                      {{
                      input.number || $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.allocation') }}</div>
                    <span>
                      {{
                      input.allocation ||
                      $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.payment_type') }}</div>
                    <v-chip label small class="overline">
                      {{
                      input.method || $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.amount') }}</div>
                    <div>{{ input.amount | currency }}</div>
                    <span class="caption">
                      {{
                      $terbilang(input.amount) ||
                      $vuetify.lang.t('$vuetify.noDataText') | capitalize
                      }}
                    </span>
                  </v-col>
                  <v-col v-if="input.attachment" cols="12" md="6">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.file') }}</div>
                    <span class="text-capitalize">{{ $translate('text.view') }}</span>
                    <v-btn color="accent" icon x-small :href="input.attachment" target="_blank">
                      <v-icon small>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.note') }}</div>
                    <span>
                      {{
                      input.notes || $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col v-if="input.method === 'Transfer'" cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.bank_code') }}</div>
                    <span>
                      {{
                      input.bank_code ||
                      $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col v-if="input.method === 'Transfer'" cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.bank_name') }}</div>
                    <span>
                      {{
                      input.bank_name ||
                      $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col v-if="input.method === 'Transfer'" cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.account_number') }}</div>
                    <span>
                      {{
                      input.account_number ||
                      $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col v-if="input.method === 'Transfer'" cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.account_owner') }}</div>
                    <span>
                      {{
                      input.account_owner ||
                      $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.status') }}</div>
                    <span>
                      {{
                      input.status.status ||
                      $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div class="caption primary--text text-capitalize">{{ $translate('text.budget') }}</div>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-data-table :items="input.details" :headers="headers"></v-data-table>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div
                  class="caption primary--text text-capitalize"
                >{{ $translate('text.verification') }}</div>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-col v-if="checkVerifyPic()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('pic')"
                    >{{ $translate('text.pic') }}</v-btn>
                  </v-col>
                  <v-col v-if="checkVerifyVerificator()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('verificator')"
                    >{{ $translate('text.verificator') }}</v-btn>
                  </v-col>
                  <v-col v-if="checkVerifyHeadDept()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('headDept')"
                    >{{ $translate('text.head_dept') }}</v-btn>
                  </v-col>
                  <v-col v-if="checkVerifyCashier()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('cashier')"
                    >{{ $translate('text.cashier') }}</v-btn>
                  </v-col>
                  <v-col v-if="checkVerifyHeadOffice()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('headOffice')"
                    >{{ $translate('text.head_office') }}</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">{{ $translate('text.pic') }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.name') }}</div>
                    <span>{{ input.pic.name }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.division') }}</div>
                    <span>{{ input.pic.division }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.email') }}</div>
                    <span>{{ input.pic.email }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="spacing-small"></div>
    <v-row>
      <v-col v-if="checkVerifyHeadOffice() || checkVerifyHeadDept()">
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="openDialogSureReject()"
        >{{ $translate('components.button.reject') }}</v-btn>
      </v-col>
      <v-col v-if="checkIfUserWantToConfirmAlreadyPaid()">
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="openDialogSureAlreadyPaid()"
        >{{ $translate('components.button.already_paid') }}</v-btn>
      </v-col>
    </v-row>
    <!-- Alert -->
    <snackbar-alert v-model="alert" :success="success" :messages="messages"></snackbar-alert>
    <!-- Dialog -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureReject" persistent max-width="600">
          <v-card>
            <v-card-title class="title text-capitalize">{{
              $translate('text.sure_reject_head')
              }}</v-card-title>
            <v-card-text class="overline">{{
              $translate('text.sure_reject_body')
              }}</v-card-text>
            <v-card-actions>
              <v-row class="mx-0">
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="accent"
                    text
                    block
                    @click="closeDialogSureReject()"
                  >{{ $translate('components.button.sure_button_no') }}</v-btn
                  >
                </v-col>
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="secondary"
                    text
                    block
                    @click.stop="rejectRequestForm()"
                  >{{
                    $translate('components.button.sure_button_yes')
                    }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureAlreadyPaid" persistent max-width="600">
          <v-card>
            <v-card-title class="title text-capitalize">{{
              $translate('text.sure_paid_head')
              }}</v-card-title>
            <v-card-text class="overline">{{
              $translate('text.sure_paid_body')
              }}</v-card-text>
            <v-card-actions>
              <v-row class="mx-0">
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="accent"
                    text
                    block
                    @click="closeDialogSureAlreadyPaid()"
                  >{{ $translate('components.button.sure_button_no') }}</v-btn
                  >
                </v-col>
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="secondary"
                    text
                    block
                    @click.stop="alreadyPaidRequestForm()"
                  >{{
                    $translate('components.button.sure_button_yes')
                    }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureVerify" persistent max-width="600">
          <v-card>
            <v-card-title class="title text-capitalize">
              {{
              $translate('text.sure_verify_head')
              }}
            </v-card-title>
            <v-card-text class="overline">
              {{
              $translate('text.sure_verify_body')
              }}
            </v-card-text>
            <v-card-text>
              <signature-pad :key="key" v-model="signature"></signature-pad>
            </v-card-text>
            <v-card-actions>
              <v-row class="mx-0">
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="accent"
                    text
                    block
                    @click="closeDialogSureVerify()"
                  >{{ $translate('components.button.sure_button_no') }}</v-btn>
                </v-col>
                <v-col class="px-0" cols="6">
                  <v-btn color="secondary" text block @click="verifyAs()">
                    {{
                    $translate('components.button.sure_button_yes')
                    }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>
<script>
import SignaturePad from '~/components/SignaturePad.vue'
export default {
  components: {
    SignaturePad
  },
  filters: {
    currency(value) {
      if (value === null || value === '') return 'Rp 0'
      const result = Number(value)
        .toString()
        .match(/\d{1,3}(?=(\d{3})*$)/g)
        .join('.')
      return 'Rp ' + result
    },
    capitalize(value) {
      if (!value) return ''
      value = value
        .toString()
        .split(' ')
        .map((element) => element.charAt(0).toUpperCase() + element.slice(1))
      return value.join(' ')
    }
  },
  data() {
    return {
      alert: false,
      success: false,
      dialogSureReject: false,
      dialogSureAlreadyPaid: false,
      dialogSureVerify: false,
      messages: '',
      headers: [
        {
          text: `${this.$translate('text.budget_code', 'capitalize')}`,
          value: 'budget_code.code'
        },
        {
          text: `${this.$translate('text.budget_name', 'capitalize')}`,
          value: 'budget_code.name'
        },
        {
          text: `${this.$translate('text.budget_nominal', 'capitalize')}`,
          value: 'nominal'
        }
      ],
      input: {
        amount: '',
        pic: {},
        cashier: {},
        head_dept: {},
        verificator: {},
        status: {},
        budget_code: {},
        signature: {}
      },
      verifyRole: '',
      signature: {
        isEmpty: true,
        data: null
      },
      key: 0
    }
  },
  mounted() {
    this.getRequestForm()
  },
  methods: {
    openDialogSureVerify(role) {
      this.verifyRole = role
      this.dialogSureVerify = true
      this.signature.isEmpty = true
      this.signature.data = null
      this.rerender()
    },
    closeDialogSureVerify() {
      this.dialogSureVerify = false
      this.signature.isEmpty = true
      this.signature.data = null
    },
    openDialogSureReject() {
      this.dialogSureReject = true
    },
    closeDialogSureReject() {
      this.dialogSureReject = false
    },
    openDialogSureAlreadyPaid() {
      this.dialogSureAlreadyPaid = true
    },
    closeDialogSureAlreadyPaid() {
      this.dialogSureAlreadyPaid = false
    },
    rerender() {
      this.key++
    },
    async getRequestForm() {
      try {
        this.input = await this.$api('request', 'show', this.$route.params.id)
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async verifyAsPic() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = 'Gagal karena tidak ada tanda tangan'
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('request', 'verifyaspic', this.input)
        } catch (e) {
          this.success = false
          this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
          this.alert = true
        }
      }
    },
    async verifyAsVerificator() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = 'Gagal karena tidak ada tanda tangan'
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('request', 'verifyasverificator', this.input)
        } catch (e) {
          this.success = false
          this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
          this.alert = true
        }
      }
    },
    async verifyAsCashier() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = 'Gagal karena tidak ada tanda tangan'
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('request', 'verifyascashier', this.input)
        } catch (e) {
          this.success = false
          this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
          this.alert = true
        }
      }
    },
    async verifyAsHeadDept() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = 'Gagal karena tidak ada tanda tangan'
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('request', 'verifyasheaddept', this.input)
        } catch (e) {
          this.success = false
          this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
          this.alert = true
        }
      }
    },
    async verifyAsHeadOffice() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = 'Gagal karena tidak ada tanda tangan'
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('request', 'verifyasheadoffice', this.input)
        } catch (e) {
          this.success = false
          this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
          this.alert = true
        }
      }
    },
    async verifyAs() {
      switch (this.verifyRole) {
        case 'pic':
          await this.verifyAsPic()
          break
        case 'verificator':
          await this.verifyAsVerificator()
          break
        case 'cashier':
          await this.verifyAsCashier()
          break
        case 'headDept':
          await this.verifyAsHeadDept()
          break
        case 'headOffice':
          await this.verifyAsHeadOffice()
          break
        default:
          this.verifyRole = ''
      }
      this.verifyRole = ''
      await this.getRequestForm()
      this.closeDialogSureVerify()
    },
    async rejectRequestForm() {
      try {
        await this.$api('request', 'reject', this.input)
        await this.getRequestForm()
        this.dialogSureReject = false
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async alreadyPaidRequestForm() {
      try {
        await this.$api('request', 'alreadypaid', this.input)
        await this.getRequestForm()
        this.dialogSureAlreadyPaid = false
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    checkVerifyPic() {
      if (
        this.input.is_confirmed_pic === 0 &&
        this.input.status_id === 1 &&
        (this.$auth.user.id === this.input.pic.id || this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkVerifyHeadDept() {
      if (
        this.input.is_confirmed_head_dept === 0 &&
        this.input.is_confirmed_pic === 1 &&
        this.input.status_id === 1 &&
        (this.checkIfUserRoleIsHeadDept() || this.checkIfUserRoleIsHeadOffice() || this.checkIfUserRoleIsAdmin())

      ) {
        return true
      }
    },
    checkVerifyVerificator() {
      if (
        this.input.is_confirmed_verificator === 0 &&
        this.input.is_confirmed_pic === 1 &&
        this.input.is_confirmed_head_dept === 1 &&
        this.input.status_id === 1 &&
        (this.checkIfUserRoleIsAdmin() || this.checkIfUserRoleIsVerificator())
      ) {
        return true
      }
    },
    checkVerifyHeadOffice() {
      if (
        this.input.is_confirmed_head_office === 0 &&
        this.input.is_confirmed_pic === 1 &&
        this.input.is_confirmed_head_dept === 1 &&
        this.input.is_confirmed_verificator === 1 &&
        this.input.status_id === 1 &&
        (this.checkIfUserRoleIsHeadOffice() || this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkVerifyCashier() {
      if (
        this.input.is_confirmed_cashier === 0 &&
        this.input.is_confirmed_pic === 1 &&
        this.input.is_confirmed_head_dept === 1 &&
        this.input.is_confirmed_verificator === 1 &&
        this.input.is_confirmed_head_office === 1 &&
        this.input.status_id === 2 &&
        (this.checkIfUserRoleIsCashier() || this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkIfUserWantToConfirmAlreadyPaid() {
      if ((this.checkIfUserRoleIsAdmin() || this.$auth.user.id === this.input.pic.id) && this.input.status_id === 3) {
        return true
      }
    },
    checkIfUserRoleIsAdmin() {
      return this.$auth.user.roles_list.includes('admin')
    },
    checkIfUserRoleIsHeadDept() {
      return this.$auth.user.roles_list.includes('head_dept')
    },
    checkIfUserRoleIsVerificator() {
      return this.$auth.user.roles_list.includes('verificator')
    },
    checkIfUserRoleIsHeadOffice() {
      return this.$auth.user.roles_list.includes('head_office')
    },
    checkIfUserRoleIsCashier() {
      return this.$auth.user.roles_list.includes('cashier')
    }
  }
}
</script>
<style scoped></style>
