<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" md="7">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>{{
                  $translate('components.form.title.petty_cash')
                }}</span>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      @click.stop="$export('pdf', 'petty', $route.params.id)"
                    >
                      <v-list-item-title class="text-capitalize">{{
                        $translate('export.pdf')
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.number') }}
                    </div>
                    <span class="font-weight-bold">
                      {{
                        input.number || $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.allocation') }}
                    </div>
                    <span>
                      {{
                        input.allocation ||
                          $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.amount') }}
                    </div>
                    <div>{{ input.amount | currency }}</div>
                    <span class="caption">
                      {{
                        $terbilang(input.amount) ||
                          $vuetify.lang.t('$vuetify.noDataText') | capitalize
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.status') }}
                    </div>
                    <div class="spacing-xssmall"></div>
                    <v-chip color="accent" label>
                      <span class="caption">
                        {{
                          input.status.status ||
                            $vuetify.lang.t('$vuetify.noDataText')
                        }}
                      </span>
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.created_at') }}
                    </div>
                    <span>
                      {{
                        input.created_at ||
                          $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.paid_at') }}
                    </div>
                    <span>{{
                      input.date || $vuetify.lang.t('$vuetify.noDataText')
                    }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Table -->
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>
                  {{ $translate('text.budget') }}
                </span>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-data-table
                    :items="input.details"
                    :headers="headers"
                  ></v-data-table>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5">
        <v-row>
          <!-- PIC -->
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">{{
                $translate('text.pic')
              }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.name') }}
                    </div>
                    <span>{{ input.pic.name }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.division') }}
                    </div>
                    <span>{{ input.pic.division }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.email') }}
                    </div>
                    <span>{{ input.pic.email }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Verification -->
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div class="caption primary--text text-capitalize">
                  {{ $translate('text.verification') }}
                </div>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-col v-if="checkVerifyPic()" cols="12">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('pic')"
                      >{{ $translate('text.pic') }}</v-btn
                    >
                  </v-col>
                  <v-col v-if="checkVerifyManagerOps()" cols="12">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('managerOps')"
                      >{{ $translate('text.manager_ops') }}</v-btn
                    >
                  </v-col>
                  <v-col v-if="checkVerifyCashier()" cols="12">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('cashier')"
                      >{{ $translate('text.cashier') }}</v-btn
                    >
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
      <v-col v-if="checkVerifyManagerOps()" cols="12">
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="openDialogSureReject()"
          >{{ $translate('components.button.reject') }}</v-btn
        >
      </v-col>
      <v-col v-if="checkIfUserWantToConfirmAlreadyPaid()" cols="12">
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="openDialogSureAlreadyPaid()"
          >{{ $translate('components.button.already_paid') }}</v-btn
        >
      </v-col>
      <v-col v-if="checkVerifyPic()" cols="12">
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="cancelPettyCashForm()"
          >{{ $translate('components.button.cancel') }}</v-btn
        >
      </v-col>
    </v-row>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureReject" persistent max-width="600">
          <v-card>
            <v-card-title class="title text-capitalize">
              {{ $translate('text.sure_reject_head') }}
            </v-card-title>
            <v-card-text class="overline">
              {{ $translate('text.sure_reject_body') }}
            </v-card-text>
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
                    @click.stop="rejectPettyCashForm()"
                  >
                    {{ $translate('components.button.sure_button_yes') }}
                  </v-btn>
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
            <v-card-title class="title text-capitalize">
              {{ $translate('text.sure_paid_head') }}
            </v-card-title>
            <v-card-text class="overline">
              {{ $translate('text.sure_paid_body') }}
            </v-card-text>
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
                    @click.stop="alreadyPaidPettyCashForm()"
                  >
                    {{ $translate('components.button.sure_button_yes') }}
                  </v-btn>
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
              {{ $translate('text.sure_verify_head') }}
            </v-card-title>
            <v-card-text class="overline">
              {{ $translate('text.sure_verify_body') }}
            </v-card-text>
            <v-card-text>
              <signature-pad :key="key" v-model="signature"></signature-pad>
            </v-card-text>
            <v-card-text>
              <v-container class="text-center">
                <span v-if="signature.isEmpty">Belum ada tanda tangan</span>
                <span v-else>Tanda tangan siap disimpan</span>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-row class="mx-0">
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="accent"
                    text
                    block
                    @click="closeDialogSureVerify()"
                    >{{ $translate('components.button.sure_button_no') }}</v-btn
                  >
                </v-col>
                <v-col class="px-0" cols="6">
                  <v-btn color="secondary" text block @click="verifyAs()">
                    {{ $translate('components.button.sure_button_yes') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <snackbar-alert
      v-model="alert"
      :success="success"
      :messages="messages"
    ></snackbar-alert>
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
      const minus = Number(value) < 0
      if (value == null || value === '') return 'Rp 0'
      if (value.toString().split('.').length > 2) return 'Rp ~'
      else if (value.toString().split('.').length > 1) {
        value = value.toString().split('.')
        value = value[0]
      }
      try {
        const result = value
          .toString()
          .match(/\d{1,3}(?=(\d{3})*$)/g)
          .join('.')
        return 'Rp ' + (minus === true ? '-' : '') + result
      } catch (error) {
        return 'Rp ~'
      }
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
        details: [],
        status: {},
        pic: {},
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
    this.getPettyCashForm()
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
    async getPettyCashForm() {
      try {
        this.input = await this.$api('petty', 'show', this.$route.params.id)
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    async verifyAsPic() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = `${this.$translate('alert.detail.sign', 'capitalize')}`
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('petty', 'verifyaspic', this.input)
        } catch (e) {
          this.success = false
          this.messages =
            `${this.$translate('alert.error', 'capitalize')}` + e.toString()
          this.alert = true
        }
      }
    },
    async verifyAsManagerOps() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = `${this.$translate('alert.detail.sign', 'capitalize')}`
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('petty', 'verifyasmanagerops', this.input)
        } catch (e) {
          this.success = false
          this.messages =
            `${this.$translate('alert.error', 'capitalize')}` + e.toString()
          this.alert = true
        }
      }
    },
    async verifyAsCashier() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = `${this.$translate('alert.detail.sign', 'capitalize')}`
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('petty', 'verifyascashier', this.input)
        } catch (e) {
          this.success = false
          this.messages =
            `${this.$translate('alert.error', 'capitalize')}` + e.toString()
          this.alert = true
        }
      }
    },
    async verifyAs() {
      switch (this.verifyRole) {
        case 'pic':
          await this.verifyAsPic()
          break
        case 'managerOps':
          await this.verifyAsManagerOps()
          break
        case 'cashier':
          await this.verifyAsCashier()
          break
        default:
          this.verifyRole = ''
      }
      this.verifyRole = ''
      await this.getPettyCashForm()
      this.closeDialogSureVerify()
    },
    async rejectPettyCashForm() {
      try {
        await this.$api('petty', 'reject', this.input)
        await this.getPettyCashForm()
        this.dialogSureReject = false
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    async alreadyPaidPettyCashForm() {
      try {
        await this.$api('petty', 'alreadypaid', this.input)
        await this.getPettyCashForm()
        this.dialogSureAlreadyPaid = false
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    async cancelPettyCashForm() {
      try {
        await this.$api('petty', 'cancel', this.input)
        await this.getPettyCashForm()
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    checkVerifyPic() {
      if (
        this.input.is_confirmed_pic === 0 &&
        this.input.status_id === 1 &&
        (this.$auth.user.id === this.input.pic.id ||
          this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkVerifyManagerOps() {
      if (
        this.input.is_confirmed_manager_ops === 0 &&
        this.input.is_confirmed_pic === 1 &&
        this.input.status_id === 1 &&
        (this.checkIfUserRoleIsManagerOps() || this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkVerifyCashier() {
      if (
        this.input.is_confirmed_cashier === 0 &&
        this.input.is_confirmed_pic === 1 &&
        this.input.is_confirmed_manager_ops === 1 &&
        this.input.status_id === 2 &&
        (this.checkIfUserRoleIsCashier() || this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkIfUserWantToConfirmAlreadyPaid() {
      if (
        (this.checkIfUserRoleIsAdmin() ||
          this.$auth.user.id === this.input.pic.id) &&
        this.input.status_id === 3
      ) {
        return true
      }
    },
    checkIfUserRoleIsAdmin() {
      return this.$auth.user.roles_list.includes('admin')
    },
    checkIfUserRoleIsManagerOps() {
      return this.$auth.user.roles_list.includes('manager_ops')
    },
    checkIfUserRoleIsCashier() {
      return this.$auth.user.roles_list.includes('cashier')
    }
  }
}
</script>
<style scoped></style>
