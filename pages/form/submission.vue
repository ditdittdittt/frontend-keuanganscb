<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">{{
        $translate('components.form.title.submission')
      }}</v-card-title>
      <v-card-subtitle class="overline">{{
        $translate('components.form.subtitle.submission')
      }}</v-card-subtitle>
    </v-card>
    <v-card raised class="back-card px-md-5">
      <v-card-text>
        <div class="spacing-medium"></div>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.form') + ' ' + $translate('text.request') }}
              </div>
              <v-combobox
                v-model="input.request"
                prepend-inner-icon="mdi-newspaper-plus"
                append-outer-icon="mdi-eye"
                :items="form.request"
                item-text="allocation"
                item-value="number"
                solo
                :rules="[rules.required]"
                :label="$translate('text.number', 'capitalize')"
                clearable
                auto-select-first
                cache-items
                return-object
                :loading="loading.formRequest"
                @change="setArrayBudgets()"
                @click:append-outer="showRequest(input.request)"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.allocation') }}
              </div>
              <v-text-field
                v-model="input.allocation"
                prepend-inner-icon="mdi-basket"
                solo
                :rules="[rules.required]"
                :label="$translate('text.allocation', 'capitalize')"
                clearable
                counter
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Request Details -->
          <template v-if="input.request">
            <v-row>
              <template v-for="(detail, i) in input.request.details">
                <v-col :key="'sub-bc-' + i" cols="12" md="4">
                  <div class="caption primary--text text-capitalize">
                    {{ '[' + (i + 1) + '] ' + $translate('text.budget_code') }}
                  </div>
                  <v-text-field
                    prepend-inner-icon="mdi-newspaper-variant"
                    :value="
                      detail.budget_code.code + '-' + detail.budget_code.name
                    "
                    :label="$translate('text.budget_code', 'capitalize')"
                    :messages="$translate('helper.messages.auto', 'capitalize')"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col :key="'sub-bc-nm-' + i" cols="12" md="4">
                  <div class="caption primary--text text-capitalize">
                    {{ '[' + (i + 1) + '] ' + $translate('text.use') }}
                  </div>
                  <v-text-field
                    v-model="input.budgets[i].nominal"
                    solo
                    type="number"
                    prepend-inner-icon="mdi-cash"
                    :rules="[rules.required]"
                    :label="$translate('text.use', 'capitalize')"
                    :messages="input.budgets[i].nominal | currency"
                    clearable
                    @change="setSingleBudget(i)"
                  ></v-text-field>
                </v-col>
                <v-col :key="'sub-bc-bl-' + i" cols="12" md="4">
                  <div class="caption primary--text text-capitalize">
                    {{ '[' + (i + 1) + '] ' + $translate('text.balance') }}
                  </div>
                  <v-text-field
                    :value="input.budgets[i].balance | currency"
                    solo
                    prepend-inner-icon="mdi-cash"
                    :label="$translate('text.balance', 'capitalize')"
                    :messages="$translate('helper.messages.auto', 'capitalize')"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-divider :key="'div-' + i"></v-divider>
              </template>
            </v-row>
          </template>
          <!-- Total -->
          <v-row class="flex">
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ 'total ' + $translate('text.use') }}
              </div>
              <v-text-field
                :value="input.use | currency"
                prepend-inner-icon="mdi-cash"
                solo
                :label="$translate('text.use', 'capitalize')"
                :messages="$translate('helper.messages.auto', 'capitalize')"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{
                  $translate('text.amount_in_word') +
                    ' ' +
                    $translate('text.use', 'capitalize')
                }}
              </div>
              <v-text-field
                :value="$terbilang(input.use) | capitalize"
                :label="
                  $translate('text.amount_in_word', 'capitalize') +
                    ' ' +
                    $translate('text.use')
                "
                :messages="$translate('helper.messages.auto', 'capitalize')"
                readonly
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ 'total ' + $translate('text.balance') }}
              </div>
              <v-text-field
                :value="input.balance | currency"
                prepend-inner-icon="mdi-cash-multiple"
                solo
                :label="$translate('text.balance', 'capitalize')"
                :messages="$translate('helper.messages.auto', 'capitalize')"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{
                  $translate('text.amount_in_word') +
                    ' ' +
                    $translate('text.balance', 'capitalize')
                }}
              </div>
              <v-text-field
                :value="$terbilang(input.balance) | capitalize"
                :label="
                  $translate('text.amount_in_word', 'capitalize') +
                    ' ' +
                    $translate('text.balance')
                "
                :messages="$translate('helper.messages.auto', 'capitalize')"
                readonly
                solo
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Notes -->
          <v-row>
            <v-col cols="12">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.note') }}
              </div>
              <v-textarea
                v-model="input.notes"
                counter
                solo
                :label="$translate('text.note', 'capitalize')"
                clearable
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <template v-if="loading.buttonStore">
          <circular-loading></circular-loading>
        </template>
        <template v-else>
          <v-btn
            block
            x-large
            dark
            color="secondary"
            elevation="8"
            @click.stop="storeSubmission()"
            >{{ $translate('components.button.submit') }}</v-btn
          >
        </template>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="modal.request" max-width="600" persistent>
      <v-card>
        <v-card-title class="text-uppercase title">
          <span>{{ $translate('components.form.title.request') }}</span>
        </v-card-title>
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
                  <td class="caption text-uppercase">
                    {{ currentRequest.allocation }}
                  </td>
                </tr>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    {{ $translate('text.payment_type') }}
                  </td>
                  <td class="caption text-uppercase">
                    {{ currentRequest.method }}
                  </td>
                </tr>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    {{ $translate('text.amount') }}
                  </td>
                  <td class="caption text-uppercase">
                    {{ currentRequest.amount | currency }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider></v-divider>
          <div class="spacing-xsmall"></div>
          <div class="caption primary--text text-capitalize">
            {{ $translate('text.budget_code') }}
          </div>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <template v-for="(detail, i) in currentRequest.details">
                  <tr :key="'detail' + i">
                    <td class="caption text-uppercase">
                      {{ detail.budget_code.code }}
                    </td>
                    <td class="caption text-uppercase">
                      {{ detail.budget_code.name }}
                    </td>
                    <td class="caption text-uppercase">
                      {{ detail.nominal | currency }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-row class="ma-0">
            <v-col>
              <v-btn block color="secondary" @click.stop="modal.request = false"
                >Tutup</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <snackbar-alert
      v-model="alert"
      :success="success"
      :messages="messages"
    ></snackbar-alert>
  </v-container>
</template>
<script>
export default {
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
      messages: '',
      loading: {
        buttonStore: false,
        formRequest: false
      },
      valid: true,
      input: {
        budgets: [{ id: null, nominal: null, balance: null }],
        request: {
          number: null,
          allocation: null,
          details: []
        },
        allocation: null,
        use: null,
        balance: null,
        notes: null
      },
      form: {
        request: []
      },
      rules: {
        positive: (value) =>
          value >= 0 || `${this.$translate('text.positive', 'capitalize')}`,
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      },
      currentRequest: {},
      modal: {
        request: false
      }
    }
  },
  watch: {
    'input.use'() {
      if (isNaN(this.input.request.amount) || isNaN(this.input.use)) return
      if (this.input.request) {
        this.input.balance = this.input.request.amount - this.input.use
      }
    }
  },
  mounted() {
    this.getAllRequestForms()
  },
  methods: {
    setArrayBudgets() {
      if (this.input.request) {
        this.input.budgets = this.$copy(
          Array.from({
            length: this.input.request.details.length
          }).fill({
            id: null,
            nominal: null,
            balance: null
          })
        )
      }
    },
    calculateTotalUse() {
      let sum = 0
      for (let i = 0; i < this.input.budgets.length; i++) {
        if (
          isNaN(this.input.budgets[i].nominal) ||
          this.input.budgets[i].nominal == null
        )
          sum += 0
        else sum += parseInt(this.input.budgets[i].nominal, 10)
      }
      this.input.use = sum
    },
    setSingleBudget(i) {
      if (i === null || i >= this.input.budgets.length) return
      this.input.budgets[i].balance =
        this.input.request.details[i].nominal - this.input.budgets[i].nominal
      this.input.budgets[i].id = this.input.request.details[i].budget_code_id
      this.calculateTotalUse()
    },
    showRequest() {
      if (this.input.request == null) return
      this.modal.request = true
      this.currentRequest = this.$copy(this.input.request)
    },
    async storeSubmission() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = `${this.$translate(
          'alert.formSubmission.error',
          'capitalize'
        )}`
        this.alert = true
        return
      }
      try {
        this.loading.buttonStore = true
        const result = await this.$api(
          'submission',
          'store',
          this.input
        ).finally((response) => {
          this.loading.buttonStore = false
          return response
        })
        if (result.status === 201) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.formSubmission.success',
            'capitalize'
          )}`
          this.alert = true
          this.$refs.form.reset()
        } else {
          this.success = false
          this.messages = `${this.$translate(
            'alert.formSubmission.failed',
            'capitalize'
          )}`
          this.alert = true
        }
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.buttonStore = false
      }
    },
    async getAllRequestForms() {
      try {
        this.loading.formRequest = true
        this.form.request = await this.$api('request', 'index', null).finally(
          () => (this.loading.formRequest = false)
        )
        this.form.request = this.form.request.filter(function(form) {
          return parseInt(form.status_id, 10) === 4
        })
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.formRequest = false
      }
    }
  }
}
</script>
<style scoped></style>
