<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">
        {{ $translate('components.form.title.request') }}
      </v-card-title>
      <v-card-subtitle class="overline">
        {{ $translate('components.form.subtitle.request') }}
      </v-card-subtitle>
    </v-card>
    <v-card raised class="back-card px-md-5">
      <v-card-text>
        <div class="spacing-medium"></div>
        <v-form ref="form" v-model="valid">
          <template v-for="(budget, i) in input.budgets">
            <v-row :key="'budget-' + i">
              <v-col cols="12" md="6" sm="6">
                <div class="caption primary--text text-capitalize">
                  [{{ i + 1 }}] {{ $translate('text.budget') }}
                </div>
                <v-combobox
                  v-model="input.budgets[i].code"
                  prepend-inner-icon="mdi-newspaper-plus"
                  :items="data.budgetList"
                  item-text="code"
                  solo
                  :rules="[rules.required]"
                  :label="$translate('text.budget', 'capitalize')"
                  clearable
                  cache-items
                  :loading="loading.detailBudget"
                >
                  <template v-slot:selection="{ item }">{{
                    item.code + ' - ' + item.name
                  }}</template>
                </v-combobox>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <div class="caption primary--text text-capitalize">
                  [{{ i + 1 }}] {{ $translate('text.budget_nominal') }}
                </div>
                <v-text-field
                  v-model="input.budgets[i].nominal"
                  solo
                  type="number"
                  prepend-inner-icon="mdi-cash"
                  :rules="[rules.required]"
                  :label="$translate('text.budget_nominal', 'capitalize')"
                  :hint="input.budgets[i].nominal | currency"
                  clearable
                  @change="
                    () => {
                      calculateSum()
                      checkIfBudgetNominalBelowBudgeBalance(input.budgets[i])
                    }
                  "
                ></v-text-field>
              </v-col>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </template>
          <v-row align="center" justify="end">
            <v-spacer></v-spacer>
            <v-col>
              <v-btn
                small
                elevation="8"
                dark
                color="error"
                @click.stop="deleteBudget()"
                >{{ $translate('components.button.delete') + ' item' }}</v-btn
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn
                small
                elevation="8"
                dark
                color="secondary"
                @click.stop="addBudget()"
                >{{ $translate('components.button.add') + ' item' }}</v-btn
              >
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.amount') }}
              </div>
              <v-text-field
                :value="input.amount"
                prepend-inner-icon="mdi-cash"
                prefix="Rp"
                type="number"
                readonly
                persistent-hint
                solo
                :rules="[rules.required, rules.positive]"
                :label="$translate('text.amount', 'capitalize')"
                :hint="input.amount | currency"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.amount_in_word') }}
              </div>
              <v-text-field
                :value="$terbilang(input.amount) | capitalize"
                :label="$translate('text.amount_in_word', 'capitalize')"
                :messages="
                  $translate('helper.messages.amount_in_word', 'capitalize')
                "
                readonly
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.allocation') }}
              </div>
              <v-text-field
                v-model="input.allocation"
                prepend-inner-icon="mdi-basket"
                clearable
                counter
                solo
                :rules="[rules.required]"
                :label="$translate('text.allocation', 'capitalize')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.payment_type') }}
              </div>
              <v-radio-group v-model="input.method" dense row mandatory>
                <v-radio
                  :label="$translate('text.cash', 'capitalize')"
                  value="cash"
                ></v-radio>
                <v-radio
                  :label="$translate('text.transfer', 'capitalize')"
                  value="transfer"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <template v-if="input.method === 'transfer'">
            <v-row>
              <v-col>
                <div class="caption primary--text text-capitalize">
                  {{ $translate('text.account_number') }}
                </div>
                <v-select
                  v-model="input.rekening"
                  :items="rekening"
                  item-text="account_owner"
                  :menu-props="{ maxHeight: '400' }"
                  :label="$translate('text.account_number', 'capitalize')"
                  :rules="[rules.required]"
                  multiple
                  solo
                  persistent-hint
                  return-object
                  :loading="loading.allRekening"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip label color="accent">
                      <span class="font-weight-bold">
                        {{ item.account_owner }}
                      </span>
                      <span>{{ ' - ' + item.account_number }}</span>
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </template>
          <v-row>
            <v-col cols="12">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.note') }}
              </div>
              <v-textarea
                v-model="input.notes"
                clearable
                counter
                solo
                :label="$translate('text.note', 'capitalize')"
              ></v-textarea>
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.additional_file') }}
              </div>
              <v-file-input
                v-model="input.attachment"
                show-size
                clearable
                solo
                :label="$translate('text.attachment_file', 'capitalize')"
                :messages="
                  $translate('helper.messages.attachment_file', 'capitalize')
                "
              ></v-file-input>
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
            @click.stop="storeRequest()"
            >{{ $translate('components.button.submit') }}</v-btn
          >
        </template>
      </v-card-actions>
    </v-card>
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
      today: null,
      loading: {
        buttonStore: false,
        detailBudget: false,
        allRekening: false
      },
      valid: true,
      data: {
        budgetList: []
      },
      input: {
        budgets: [{ code: null, nominal: null }],
        allocation: null,
        method: null,
        amount: null,
        notes: null,
        attachment: null,
        rekening: null
      },
      rekening: [],
      rules: {
        positive: (value) =>
          value >= 0 || `${this.$translate('text.positive', 'capitalize')}`,
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  mounted() {
    this.getBudgetList()
    this.getAllRekening()
  },
  methods: {
    calculateSum() {
      let sum = 0
      for (let i = 0; i < this.input.budgets.length; i++) {
        if (isNaN(this.input.budgets[i].nominal)) continue
        sum += parseInt(this.input.budgets[i].nominal)
      }
      this.input.amount = sum
      return sum
    },
    addBudget() {
      this.input.budgets.push({ code: null, nominal: null })
      console.log(this.input.budgets)
      console.log(this.data.budgetList)
      console.log()
    },
    deleteBudget() {
      if (this.input.budgets.length > 1) {
        this.input.budgets.pop()
      }
    },
    async getAllRekening() {
      try {
        this.loading.allRekening = true
        this.rekening = await this.$api('rekening', 'index', null).finally(
          () => (this.loading.allRekening = false)
        )
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.allRekening = true
      }
    },
    async storeRequest() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = `${this.$translate(
          'alert.formRequest.error',
          'capitalize'
        )}`
        this.alert = true
        return
      }
      try {
        this.loading.buttonStore = true
        const result = await this.$api('request', 'store', this.input).finally(
          (response) => {
            this.loading.buttonStore = false
            return response
          }
        )
        if (result.status === 201) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.formRequest.success',
            'capitalize'
          )}`
          this.alert = true
          this.$refs.form.reset()
        } else {
          this.success = false
          this.messages = `${this.$translate(
            'alert.formRequest.failed',
            'capitalize'
          )}`
          this.alert = true
        }
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.buttonStore = true
      }
    },
    async getBudgetList() {
      try {
        this.loading.detailBudget = true
        this.data.budgetList = await this.$api('budget', 'index', null).finally(
          () => (this.loading.detailBudget = false)
        )
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.detailBudget = true
      }
    },
    checkIfBudgetNominalBelowBudgeBalance(budget) {
      if (Number(budget.nominal) > Number(budget.code.balance)) {
        this.success = false
        this.messages = `${this.$translate(
          'alert.formRequest.overBalance',
          'capitalize'
        )}`
        this.alert = true
      }
    }
  }
}
</script>
<style scoped></style>
