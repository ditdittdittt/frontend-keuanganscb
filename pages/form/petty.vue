<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">
        {{
        $translate('components.form.title.petty_cash')
        }}
      </v-card-title>
      <v-card-subtitle class="overline">
        {{
        $translate('components.form.subtitle.petty_cash')
        }}
      </v-card-subtitle>
    </v-card>
    <v-card raised class="back-card px-md-5">
      <v-card-text>
        <div class="spacing-medium"></div>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.allocation') }}</div>
              <v-text-field
                prepend-inner-icon="mdi-basket"
                v-model="input.allocation"
                clearable
                counter
                solo
                :rules="[rules.required]"
                :label="$translate('text.allocation', 'capitalize')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.date') }}</div>
              <v-dialog
                ref="date"
                v-model="modal.date"
                :return-value.sync="input.date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    prepend-inner-icon="mdi-calendar-clock"
                    v-model="input.date"
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
                  <v-btn
                    text
                    color="primary"
                    @click="modal.date = false"
                  >{{ $translate('components.button.cancel') }}</v-btn>
                  <v-btn text color="primary" @click="$refs.date.save(input.date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <template v-for="(item, i) in input.budgets">
            <v-row :key="'budget-' + i">
              <v-col cols="12" md="4" sm="6">
                <div
                  class="caption primary--text text-capitalize"
                >[{{ i + 1 }}] {{ $translate('text.budget_code') }}</div>
                <v-text-field
                  solo
                  prepend-inner-icon="mdi-text"
                  v-model="input.budgets[i].code"
                  :rules="[rules.required]"
                  :label="$translate('text.budget_code', 'capitalize')"
                  clearable
                  counter
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <div
                  class="caption primary--text text-capitalize"
                >[{{ i + 1 }}] {{ $translate('text.budget_name') }}</div>
                <v-text-field
                  solo
                  prepend-inner-icon="mdi-text"
                  v-model="input.budgets[i].name"
                  :rules="[rules.required]"
                  :label="$translate('text.budget_name', 'capitalize')"
                  clearable
                  counter
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <div
                  class="caption primary--text text-capitalize"
                >[{{ i + 1 }}] {{ $translate('text.budget_nominal') }}</div>
                <v-text-field
                  solo
                  type="number"
                  prepend-inner-icon="mdi-cash"
                  v-model="input.budgets[i].nominal"
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
                @click.stop="deleteBudget()"
                dark
                color="error"
              >{{ $translate('components.button.delete') + ' item' }}</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn
                small
                elevation="8"
                @click.stop="addBuget()"
                dark
                color="secondary"
              >{{ $translate('components.button.add') + ' item' }}</v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="caption primary--text text-capitalize">{{ $translate('text.note') }}</div>
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
        <v-btn block x-large dark color="secondary" elevation="8">Submit</v-btn>
      </v-card-actions>
    </v-card>
    <snackbar-alert v-model="alert" :success="success" :messages="messages"></snackbar-alert>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      alert: false,
      success: false,
      messages: '',
      today: null,
      input: {
        allocation: null,
        date: null,
        note: null,
        budgets: [
          {
            code: null,
            name: null,
            nominal: null
          }
        ]
      },
      modal: {
        date: false
      },
      rules: {
        required: value =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  filters: {
    currency: function(value) {
      if (value == null || value == '') return 'Rp 0'
      let result = value
        .toString()
        .match(/\d{1,3}(?=(\d{3})*$)/g)
        .join('.')
      return 'Rp ' + result + ',00'
    },
    capitalize: function(value) {
      if (!value) return ''
      value = value
        .toString()
        .split(' ')
        .map(element => element.charAt(0).toUpperCase() + element.slice(1))
      return value.join(' ')
    }
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
    assignPIC() {
      this.input.pic = null // auth user
    },
    initValue() {
      this.today = new Date().toISOString()
    }
  }
}
</script>
<style scoped></style>
