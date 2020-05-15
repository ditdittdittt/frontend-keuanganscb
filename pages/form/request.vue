<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">{{ $translate('components.form.title.request') }}</v-card-title>
      <v-card-subtitle class="overline">{{ $translate('components.form.subtitle.request') }}</v-card-subtitle>
    </v-card>
    <v-card raised class="back-card px-md-5">
      <v-card-text>
        <div class="spacing-medium"></div>
        <v-form ref="form" v-model="valid">
          <template v-for="(budget, i) in input.budgets">
            <v-row :key="'budget-' + i">
              <v-col cols="12" md="6" sm="6">
                <div
                  class="caption primary--text text-capitalize"
                >[{{ i + 1 }}] {{ $translate('text.budget') }}</div>
                <v-combobox
                  v-model="input.budgets[i].code"
                  prepend-inner-icon="mdi-newspaper-plus"
                  :items="data.budgetList"
                  solo
                  :rules="[rules.required]"
                  :label="$translate('text.budget', 'capitalize')"
                  clearable
                  auto-select-first
                  cache-items
                >
                  <template v-slot:item="{ item }">
                    {{
                    item.code + ' - ' + item.name
                    }}
                  </template>
                  <template v-slot:selection="{ item }">
                    {{
                    item.code + ' - ' + item.name
                    }}
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <div
                  class="caption primary--text text-capitalize"
                >[{{ i + 1 }}] {{ $translate('text.budget_nominal') }}</div>
                <v-text-field
                  v-model="input.budgets[i].nominal"
                  solo
                  type="number"
                  prepend-inner-icon="mdi-cash"
                  :rules="[rules.required]"
                  :label="$translate('text.budget_nominal', 'capitalize')"
                  :hint="input.budgets[i].nominal | currency"
                  clearable
                  @change="calculateSum()"
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
              >{{ $translate('components.button.delete') + ' item' }}</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn
                small
                elevation="8"
                dark
                color="secondary"
                @click.stop="addBudget()"
              >{{ $translate('components.button.add') + ' item' }}</v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.amount') }}</div>
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
              <div
                class="caption primary--text text-capitalize"
              >{{ $translate('text.amount_in_word') }}</div>
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
              <div class="caption primary--text text-capitalize">{{ $translate('text.allocation') }}</div>
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
              <div
                class="caption primary--text text-capitalize"
              >{{ $translate('text.payment_type') }}</div>
              <v-radio-group v-model="input.method" dense row mandatory>
                <v-radio :label="$translate('text.cash', 'capitalize')" value="cash"></v-radio>
                <v-radio :label="$translate('text.transfer', 'capitalize')" value="transfer"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <template v-if="input.method === 'transfer'">
            <v-row>
              <v-col cols="12" sm="6">
                <div
                  class="caption primary--text text-capitalize"
                >{{ $translate('text.bank_name') }}</div>
                <v-text-field
                  v-model="input.bank_name"
                  prepend-inner-icon="mdi-cash"
                  clearable
                  solo
                  :rules="[rules.required]"
                  persistent-hint
                  :hint="$translate('helper.multiple_bank')"
                  :label="$translate('text.bank_name', 'capitalize')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div
                  class="caption primary--text text-capitalize"
                >{{ $translate('text.bank_code') }}</div>
                <v-text-field
                  v-model="input.bank_code"
                  prepend-inner-icon="mdi-cash"
                  clearable
                  solo
                  :rules="[rules.required]"
                  persistent-hint
                  :hint="$translate('helper.multiple_bank')"
                  :label="$translate('text.bank_code', 'capitalize')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div
                  class="caption primary--text text-capitalize"
                >{{ $translate('text.account_number') }}</div>
                <v-text-field
                  v-model="input.account_number"
                  prepend-inner-icon="mdi-cash"
                  clearable
                  solo
                  :rules="[rules.required]"
                  persistent-hint
                  :hint="$translate('helper.multiple_bank')"
                  :label="$translate('text.account_number', 'capitalize')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div
                  class="caption primary--text text-capitalize"
                >{{ $translate('text.account_owner') }}</div>
                <v-text-field
                  v-model="input.account_owner"
                  prepend-inner-icon="mdi-cash"
                  clearable
                  solo
                  :rules="[rules.required]"
                  persistent-hint
                  :hint="$translate('helper.multiple_bank')"
                  :label="$translate('text.account_owner', 'capitalize')"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <v-row>
            <v-col cols="12">
              <div class="caption primary--text text-capitalize">{{ $translate('text.note') }}</div>
              <v-textarea
                v-model="input.notes"
                clearable
                counter
                solo
                :label="$translate('text.note', 'capitalize')"
              ></v-textarea>
              <div
                class="caption primary--text text-capitalize"
              >{{ $translate('text.additional_file') }}</div>
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
        <v-btn
          block
          x-large
          dark
          color="secondary"
          elevation="8"
          @click.stop="storeRequest()"
        >{{ $translate('components.button.submit') }}</v-btn>
      </v-card-actions>
    </v-card>
    <snackbar-alert v-model="alert" :success="success" :messages="messages"></snackbar-alert>
  </v-container>
</template>
<script>
export default {
  filters: {
    currency(value) {
      if (value == null || value === '') return 'Rp 0'
      if (value.toString().split('.').length > 1) return 'Rp ~'
      try {
        const result = value
          .toString()
          .match(/\d{1,3}(?=(\d{3})*$)/g)
          .join('.')
        return 'Rp ' + result
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
        bank_code: null,
        bank_name: null,
        account_number: null,
        account_owner: null
      },
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
  },
  methods: {
    calculateSum() {
      let sum = 0
      for (let i = 0; i < this.input.budgets.length; i++) {
        sum += parseInt(this.input.budgets[i].nominal)
      }
      this.input.amount = sum
      return sum
    },
    addBudget() {
      this.input.budgets.push({ code: null, nominal: null })
    },
    deleteBudget() {
      if (this.input.budgets.length > 1) {
        this.input.budgets.pop()
      }
    },
    async storeRequest() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = 'Terdapat kesalahan saat validasi data'
        this.alert = true
        return
      }
      try {
        const result = await this.$api('request', 'store', this.input)
        if (result.status === 201) {
          this.success = true
          this.messages = 'Berhasil membuat form request'
          this.alert = true
          this.$refs.form.reset()
        } else {
          this.success = false
          this.messages = 'Gagal membuat form request'
          this.alert = true
        }
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async getBudgetList() {
      try {
        this.data.budgetList = await this.$api('budget', 'index', null)
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    }
  }
}
</script>
<style scoped></style>
