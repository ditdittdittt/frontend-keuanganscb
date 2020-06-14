<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">
        {{ $translate('components.form.title.petty_cash') }}
      </v-card-title>
      <v-card-subtitle class="overline">
        {{ $translate('components.form.subtitle.petty_cash') }}
      </v-card-subtitle>
    </v-card>
    <v-card raised class="back-card px-md-5">
      <v-card-text>
        <div class="spacing-medium"></div>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="12">
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
          </v-row>
          <template v-for="(budget, i) in input.budgets">
            <v-row :key="'budget-' + i">
              <v-col cols="12" md="6" sm="6">
                <div class="caption primary--text text-capitalize">
                  [{{ i + 1 }}] {{ $translate('text.budget_code') }}
                </div>
                <v-combobox
                  v-model="input.budgets[i].code"
                  prepend-inner-icon="mdi-newspaper-plus"
                  :items="data.budgetList"
                  item-text="code"
                  solo
                  :rules="[rules.required]"
                  :label="$translate('text.budget_code', 'capitalize')"
                  clearable
                  auto-select-first
                  cache-items
                  :loading="loading.detailBudget"
                >
                  <template v-slot:selection="{ item }">
                    <span>{{ item.code + ' - ' + item.name }}</span>
                  </template>
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
            @click.stop="storePetty"
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
      data: {
        budgetList: []
      },
      loading: {
        buttonStore: false,
        detailBudget: false
      },
      valid: true,
      input: {
        allocation: null,
        budgets: [
          {
            code: null,
            nominal: null
          }
        ]
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
    addBudget() {
      this.input.budgets.push({ code: null, name: null, nominal: null })
    },
    deleteBudget() {
      if (this.input.budgets.length > 1) {
        this.input.budgets.pop()
      }
    },
    async storePetty() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = `${this.$translate('alert.error', 'capitalize')}`
        this.alert = true
        return
      }
      try {
        this.loading.buttonStore = true
        const result = await this.$api('petty', 'store', this.input).finally(
          (response) => {
            this.loading.buttonStore = false
            return response
          }
        )
        if (result.status === 201) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.formPetty.success',
            'capitalize'
          )}`
          this.alert = true
          this.$refs.form.reset()
        } else {
          this.success = false
          this.messages = `${this.$translate(
            'alert.formPetty.failed',
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
      }
    }
  }
}
</script>
<style scoped></style>
