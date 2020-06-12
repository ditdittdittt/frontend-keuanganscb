<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" md="7">
        <v-row>
          <!-- Information -->
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
                    <v-list-item
                      @click.stop="$export('pdf', 'request', $route.params.id)"
                    >
                      <v-list-item-title class="text-capitalize">
                        {{ $translate('export.pdf') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click.stop="rawData = true">
                      <v-list-item-title class="text-capitalize">
                        {{ $translate('text.rawData') }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6" sm="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.number') }}
                    </div>
                    <span class="font-weight-bold">
                      {{
                        input.number || $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
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
                  <v-col cols="12" md="6" sm="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.payment_type') }}
                    </div>
                    <div class="spacing-xssmall"></div>
                    <v-btn v-if="input.method === 'cash'" disabled small>
                      {{
                        input.method || $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </v-btn>
                    <v-btn
                      v-if="input.method === 'transfer'"
                      color="secondary"
                      small
                      @click.stop="dialogRekening = true"
                    >
                      {{
                        input.method || $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
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
                  <v-col cols="12" md="6" sm="6">
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
                  <v-col cols="12" md="6" sm="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.paid_at') }}
                    </div>
                    <span>{{
                      input.date || $vuetify.lang.t('$vuetify.noDataText')
                    }}</span>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
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
                  <v-col cols="12" md="6" sm="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.note') }}
                    </div>
                    <span>
                      {{
                        input.notes || $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col v-if="input.attachment" cols="12" md="6" sm="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.file') }}
                    </div>
                    <div class="spacing-xssmall"></div>
                    <v-btn
                      color="secondary"
                      small
                      :href="input.attachment"
                      target="_blank"
                    >
                      {{ $translate('text.view') + ' file' }}
                    </v-btn>
                  </v-col>
                  <v-col v-if="input.form_submission" cols="12" md="6" sm="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.submission') }}
                    </div>
                    <div class="spacing-xssmall"></div>
                    <v-btn
                      color="secondary"
                      small
                      @click.stop="popUpSubmission()"
                    >
                      {{
                        input.form_submission.number
                          ? input.form_submission.number
                          : `${$translate('text.view')} ${$translate(
                              'text.submission'
                            )}`
                      }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Table -->
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>{{ $translate('text.budget') }}</span>
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
              <v-card-title class="text-capitalize primary white--text">
                {{ $translate('text.pic') }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.name') }}
                    </div>
                    <span>{{ input.pic.name }}</span>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.division') }}
                    </div>
                    <span>{{ input.pic.division }}</span>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.email') }}
                    </div>
                    <a
                      text
                      class="text-lowercase text--secondary pa-0 ma-0 font-weight-regular"
                      :href="'mailto:' + input.pic.email"
                      >{{ input.pic.email }}</a
                    >
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
                <template v-if="loading.saveSignature">
                  <circular-loading></circular-loading>
                </template>
                <template v-else>
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
                    <v-col v-if="checkVerifyVerificator()" cols="12">
                      <v-btn
                        large
                        elevation="8"
                        block
                        color="secondary"
                        @click.stop="openDialogSureVerify('verificator')"
                        >{{ $translate('text.verificator') }}</v-btn
                      >
                    </v-col>
                    <v-col v-if="checkVerifyHeadDept()" cols="12">
                      <v-btn
                        large
                        elevation="8"
                        block
                        color="secondary"
                        @click.stop="openDialogSureVerify('headDept')"
                        >{{ $translate('text.head_dept') }}</v-btn
                      >
                    </v-col>
                    <v-col v-if="checkVerifyHeadOffice()" cols="12">
                      <v-btn
                        large
                        elevation="8"
                        block
                        color="secondary"
                        @click.stop="openDialogSureVerify('headOffice')"
                        >{{ $translate('text.head_office') }}</v-btn
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
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="spacing-small"></div>
    <v-row>
      <v-col
        v-if="
          checkVerifyHeadOffice() ||
            checkVerifyVerificator() ||
            checkVerifyHeadDept()
        "
      >
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
      <v-col v-if="checkIfRequestFormNeedSubmission()">
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="openDialogSureNeedSubmission()"
          >{{ 'form submission' }}</v-btn
        >
      </v-col>
      <v-col v-if="checkVerifyPic()">
        <template v-if="loading.cancelForm">
          <circular-loading></circular-loading>
        </template>
        <template v-else>
          <v-btn
            block
            dark
            elevation="8"
            x-large
            color="accent"
            @click.stop="cancelRequestForm()"
            >{{ $translate('components.button.cancel') }}</v-btn
          >
        </template>
      </v-col>
    </v-row>
    <!-- Alert -->
    <snackbar-alert
      v-model="alert"
      :success="success"
      :messages="messages"
    ></snackbar-alert>
    <!-- Dialog Sure Reject -->
    <dialog-alert
      v-model="dialogSureReject"
      :title="$translate('text.sure_reject_head')"
      :message="$translate('text.sure_reject_body')"
      :load="loading.rejectForm"
      @no="dialogSureReject = false"
      @yes="rejectRequestForm"
    >
      <circular-loading></circular-loading>
    </dialog-alert>
    <!-- Dialog Sure Need Submission -->
    <dialog-alert
      v-model="dialogSureNeedSubmission"
      :title="$translate('text.sure_need_submission_head')"
      :message="$translate('text.sure_need_submission_body')"
      :load="loading.confirmationSubmission"
      @no="confirmIfRequestFormNoNeedSubmission"
      @yes="confirmIfRequestFormNeedSubmission"
    >
      <circular-loading></circular-loading>
    </dialog-alert>
    <!-- Dialog Sure Verify -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureVerify" persistent max-width="600">
          <v-card>
            <v-card-title class="title text-capitalize">{{
              $translate('text.sure_verify_head')
            }}</v-card-title>
            <v-card-text class="overline">{{
              $translate('text.sure_verify_body')
            }}</v-card-text>
            <v-card-text>
              <signature-pad :key="key" v-model="signature">
                <template v-if="!loading.saveSignature">
                  <span v-if="signature.isEmpty">
                    <v-alert prominent type="error" class="subtitle">
                      {{ $translate('text.no_signature_yet', 'capitalize') }}
                    </v-alert>
                  </span>
                  <span v-else>
                    <v-alert prominent type="success" class="subtitle">
                      {{ $translate('text.signature_is_ready', 'capitalize') }}
                    </v-alert>
                  </span>
                </template>
              </signature-pad>
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
                  <v-btn color="secondary" text block @click="verifyAs()">{{
                    $translate('components.button.sure_button_yes')
                  }}</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- Dialog Rekening -->
    <template>
      <v-dialog v-model="dialogRekening" max-width="600" persistent>
        <v-card>
          <v-card-title class="text-uppercase title">{{
            $translate('text.bank_account')
          }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(rek, i) in rekening"
                :key="'rekening' + i"
                cols="12"
                md="6"
              >
                <v-card outlined>
                  <v-card-text>
                    <v-row>
                      <v-col
                        cols="12"
                        xs="4"
                        sm="6"
                        class="py-0 text-capitalize font-weight-bold caption"
                        >{{ $translate('text.bank_name') }}</v-col
                      >
                      <v-col cols="12" xs="8" sm="6" class="py-0 overline">
                        {{ rek.bank_name }}
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                      <v-col
                        cols="12"
                        xs="4"
                        sm="6"
                        class="py-0 text-capitalize font-weight-bold caption"
                        >{{ $translate('text.bank_code') }}</v-col
                      >
                      <v-col cols="12" xs="8" sm="6" class="py-0 overline">{{
                        rek.bank_code
                      }}</v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                      <v-col
                        cols="12"
                        xs="4"
                        sm="6"
                        class="py-0 text-capitalize font-weight-bold caption"
                        >{{ $translate('text.account_number') }}</v-col
                      >
                      <v-col cols="12" xs="8" sm="6" class="py-0 overline">{{
                        rek.account_number
                      }}</v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                      <v-col
                        cols="12"
                        xs="4"
                        sm="6"
                        class="py-0 text-capitalize font-weight-bold caption"
                        >{{ $translate('text.account_owner') }}</v-col
                      >
                      <v-col cols="12" xs="8" sm="6" class="py-0 overline">{{
                        rek.account_owner
                      }}</v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="ma-0">
              <v-col>
                <v-btn
                  dark
                  color="secondary"
                  block
                  @click.stop="dialogRekening = false"
                  >{{ $translate('components.button.close') }}</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- Dialog Request -->
    <template>
      <v-dialog v-model="dialogSubmission" max-width="600" persistent>
        <v-card>
          <v-card-title class="text-uppercase title">{{
            $translate('text.submission')
          }}</v-card-title>
          <v-card-text>
            <div class="spacing-xsmall"></div>
            <div class="caption primary--text text-capitalize">
              {{ $translate('text.information') }}
            </div>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="caption font-weight-bold text-capitalize">
                      {{ $translate('text.allocation') }}
                    </td>
                    <td class="text-capitalize">
                      {{ currentSubmission.allocation }}
                    </td>
                  </tr>
                  <tr>
                    <td class="caption font-weight-bold text-capitalize">
                      {{ $translate('text.use') }}
                    </td>
                    <td>{{ currentSubmission.used | currency }}</td>
                  </tr>
                  <tr>
                    <td class="caption font-weight-bold text-capitalize">
                      {{ $translate('text.balance') }}
                    </td>
                    <td>{{ currentSubmission.balance | currency }}</td>
                  </tr>
                  <tr>
                    <td class="caption font-weight-bold text-capitalize">
                      {{ $translate('text.paid_at') }}
                    </td>
                    <td>{{ currentSubmission.date }}</td>
                  </tr>
                  <tr>
                    <td class="caption font-weight-bold text-capitalize">
                      {{ $translate('text.number') }}
                    </td>
                    <td>{{ currentSubmission.number }}</td>
                  </tr>
                  <tr>
                    <td class="caption font-weight-bold text-capitalize">
                      {{ $translate('text.number') + ' invoice' }}
                    </td>
                    <td>{{ currentSubmission.invoice_number }}</td>
                  </tr>
                  <tr>
                    <td class="caption font-weight-bold text-capitalize">
                      {{ $translate('text.submission') }}
                    </td>
                    <td>
                      <v-btn
                        color="secondary"
                        x-small
                        :to="'/detail/submission/' + currentSubmission.id"
                      >
                        {{ $translate('text.view') }}
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-row class="ma-0">
              <v-col>
                <v-btn
                  dark
                  color="secondary"
                  block
                  @click.stop="dialogSubmission = false"
                  >{{ $translate('components.button.close') }}</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- Raw Data -->
    <v-dialog
      v-model="rawData"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="accent">
          <v-btn icon dark @click="rawData = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $translate('text.rawData') }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <pre>{{ input }}</pre>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      dialogSureNeedSubmission: false,
      dialogSureVerify: false,
      dialogRekening: false,
      dialogSubmission: false,
      loading: {
        saveSignature: false,
        confirmationSubmission: false,
        rejectForm: false,
        cancelForm: false
      },
      rawData: false,
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
      currentSubmission: {},
      key: 0,
      rekening: []
    }
  },
  mounted() {
    this.getRequestForm()
  },
  methods: {
    initValue() {
      const bankCode = this.splitCsv(this.input.bank_code) ?? []
      const bankName = this.splitCsv(this.input.bank_name) ?? []
      const accountNumber = this.splitCsv(this.input.account_number) ?? []
      const accountOwner = this.splitCsv(this.input.account_owner) ?? []
      this.rekening = []
      for (let i = 0; i < bankCode.length; i++) {
        this.rekening.push({
          bank_code: bankCode[i],
          bank_name: bankName[i],
          account_number: accountNumber[i],
          account_owner: accountOwner[i]
        })
      }
    },
    splitCsv(data) {
      if (data) {
        return data.split(',')
      }
      return null
    },
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
    openDialogSureNeedSubmission() {
      this.dialogSureNeedSubmission = true
    },
    rerender() {
      this.key++
    },
    popUpSubmission() {
      this.currentSubmission = this.$copy(this.input.form_submission)
      this.dialogSubmission = true
    },
    async getRequestForm() {
      try {
        this.rekening = []
        await this.$api('request', 'show', this.$route.params.id)
          .then((response) => {
            this.input = response
          })
          .then((_) => {
            this.initValue()
          })
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    verifyAs() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = `${this.$translate('alert.detail.sign', 'capitalize')}`
        this.alert = true
      } else {
        try {
          this.loading.saveSignature = true
          this.input.signature = this.$copy(this.signature)
          this.$api(
            'request',
            'verifyas' + this.verifyRole.toString().toLowerCase(),
            this.input
          ).finally(async () => {
            await this.getRequestForm()
            this.loading.saveSignature = false
          })
        } catch (e) {
          this.success = false
          this.messages =
            `${this.$translate('alert.error', 'capitalize')}` + e.toString()
          this.alert = true
        }
      }
      this.verifyRole = ''
      this.closeDialogSureVerify()
    },
    rejectRequestForm() {
      try {
        this.loading.rejectForm = true
        this.$api('request', 'reject', this.input).finally(async () => {
          this.loading.rejectForm = false
          await this.getRequestForm()
          this.dialogSureReject = false
        })
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    confirmIfRequestFormNeedSubmission() {
      try {
        this.loading.confirmationSubmission = true
        this.$api('request', 'confirmneedsubmission', this.input).finally(
          async () => {
            await this.getRequestForm()
            this.dialogSureNeedSubmission = false
            this.loading.confirmationSubmission = false
          }
        )
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    confirmIfRequestFormNoNeedSubmission() {
      try {
        this.loading.confirmationSubmission = true
        this.$api('request', 'confirmnoneedsubmission', this.input).finally(
          async () => {
            await this.getRequestForm()
            this.dialogSureNeedSubmission = false
            this.loading.confirmationSubmission = false
          }
        )
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    cancelRequestForm() {
      try {
        this.loading.cancelForm = true
        this.$api('request', 'cancel', this.input).finally(async () => {
          await this.getRequestForm()
          this.loading.cancelForm = false
        })
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    checkVerifyPic() {
      if (
        parseInt(this.input.is_confirmed_pic, 10) === 0 &&
        parseInt(this.input.status_id, 10) === 1 &&
        (this.$auth.user.id === this.input.pic.id ||
          this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkVerifyHeadDept() {
      if (
        parseInt(this.input.is_confirmed_head_dept, 10) === 0 &&
        parseInt(this.input.is_confirmed_pic, 10) === 1 &&
        parseInt(this.input.status_id, 10) === 1 &&
        (this.checkIfUserRoleIsHeadDept() ||
          this.checkIfUserRoleIsHeadOffice() ||
          this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkVerifyVerificator() {
      if (
        parseInt(this.input.is_confirmed_verificator, 10) === 0 &&
        parseInt(this.input.is_confirmed_pic, 10) === 1 &&
        parseInt(this.input.is_confirmed_head_dept, 10) === 1 &&
        parseInt(this.input.status_id, 10) === 1 &&
        (this.checkIfUserRoleIsAdmin() || this.checkIfUserRoleIsVerificator())
      ) {
        return true
      }
    },
    checkVerifyHeadOffice() {
      if (
        parseInt(this.input.is_confirmed_head_office, 10) === 0 &&
        parseInt(this.input.is_confirmed_pic, 10) === 1 &&
        parseInt(this.input.is_confirmed_head_dept, 10) === 1 &&
        parseInt(this.input.is_confirmed_verificator, 10) === 1 &&
        parseInt(this.input.status_id, 10) === 1 &&
        (this.checkIfUserRoleIsHeadOffice() || this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkVerifyCashier() {
      if (
        parseInt(this.input.is_confirmed_cashier, 10) === 0 &&
        parseInt(this.input.is_confirmed_pic, 10) === 1 &&
        parseInt(this.input.is_confirmed_head_dept, 10) === 1 &&
        parseInt(this.input.is_confirmed_verificator, 10) === 1 &&
        parseInt(this.input.is_confirmed_head_office, 10) === 1 &&
        parseInt(this.input.status_id, 10) === 2 &&
        (this.checkIfUserRoleIsCashier() || this.checkIfUserRoleIsAdmin())
      ) {
        return true
      }
    },
    checkIfRequestFormNeedSubmission() {
      if (
        (this.checkIfUserRoleIsAdmin() || this.checkIfUserRoleIsCashier()) &&
        parseInt(this.input.status_id, 10) === 3
      ) {
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
