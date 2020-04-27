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
        <v-form ref="form" v-model="formPettyCash">
          <v-row>
            <v-col cols="12" md="6">
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
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.date') }}
              </div>
              <v-dialog
                ref="date"
                v-model="modal.date"
                :return-value.sync="input.date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.date"
                    prepend-inner-icon="mdi-calendar-clock"
                    :rules="[rules.required]"
                    :label="$translate('text.date', 'capitalize')"
                    readonly
                    solo
                    clearable
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="input.date" scrollable :min="today">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal.date = false">{{
                    $translate('components.button.cancel')
                  }}</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.date.save(input.date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <template v-for="(budget, i) in input.budgets">
            <v-row :key="'budget-' + i">
              <v-col cols="12" md="4" sm="6">
                <div class="caption primary--text text-capitalize">
                  [{{ i + 1 }}] {{ $translate('text.budget_code') }}
                </div>
                <v-combobox
                  v-model="input.budgets[i].code"
                  prepend-inner-icon="mdi-newspaper-plus"
                  :items="data.budgetList"
                  solo
                  :rules="[rules.required]"
                  :label="$translate('text.budget_code', 'capitalize')"
                  clearable
                  auto-select-first
                  cache-items
                >
                  <template v-slot:item="{ item }">{{
                    item.code + ' - ' + item.name
                  }}</template>
                  <template v-slot:selection="{ item }">{{
                    item.code + ' - ' + item.name
                  }}</template>
                </v-combobox>
              </v-col>
              <v-col cols="12" md="4" sm="6">
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
                @click.stop="addBuget()"
                >{{ $translate('components.button.add') + ' item' }}</v-btn
              >
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.note') }}
              </div>
              <v-textarea
                v-model="input.note"
                solo
                :rules="[rules.required]"
                :label="$translate('text.note', 'capitalize')"
                clearable
                counter
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn
          v-if="petty === null"
          block
          x-large
          dark
          color="secondary"
          elevation="8"
          @click.stop="storePetty"
          >{{ $translate('components.button.submit') }}</v-btn
        >
        <v-btn
          v-else
          block
          x-large
          dark
          color="secondary"
          elevation="8"
          @click.stop="updatePetty"
          >{{ $translate('components.button.update', 'capitalize') }}</v-btn
        >
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
  name: 'FormPetty',
  filters: {
    currency(value) {
      if (value === null || value === '') return 'Rp 0'
      const result = value
        .toString()
        .match(/\d{1,3}(?=(\d{3})*$)/g)
        .join('.')
      return 'Rp ' + result + ',00'
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
  props: {
    petty: {
      type: Object,
      default: null
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
      formPettyCash: true,
      input: {
        allocation: null,
        date: null,
        note: null,
        budgets: [
          {
            code: null,
            nominal: null
          }
        ]
      },
      modal: {
        date: false
      },
      rules: {
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  mounted() {
    this.initValue()
    this.getBudgetList()
  },
  methods: {
    addBuget() {
      this.input.budgets.push({ code: null, name: null, nominal: null })
    },
    deleteBudget() {
      if (this.input.budgets.length > 1) {
        this.input.budgets.pop()
      }
    },
    initValue() {
      this.today = new Date().toISOString()
      if (this.$props.petty !== null) {
        this.input = this.$copy(this.$props.petty)
      }
    },
    async storePetty() {
      try {
        await this.$api('petty', 'store', this.input)
        this.$refs.form.reset()
      } catch (e) {}
    },
    async updatePetty() {
      try {
        await this.$api('petty', 'update', this.input)
        this.$refs.form.reset()
      } catch (e) {}
    },
    async getBudgetList() {
      try {
        this.data.budgetList = await this.$api('table', 'budgetlist', null)
      } catch (e) {}
    }
  }
}
</script>
<style scoped></style>
