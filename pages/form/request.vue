<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">{{ $translate('components.form.title.request') }}</v-card-title>
      <v-card-subtitle class="overline">{{ $translate('components.form.subtitle.request') }}</v-card-subtitle>
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
            <v-col cols="12" md="3">
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
            <v-col cols="12" md="3">
              <div
                class="caption primary--text text-capitalize"
              >{{ $translate('text.payment_type') }}</div>
              <v-radio-group v-model="input.method" dense row mandatory>
                <v-radio :label="$translate('text.cash', 'capitalize')" value="cash"></v-radio>
                <v-radio :label="$translate('text.transfer', 'capitalize')" value="transfer"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="input.method === 'transfer'">
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.bank_name') }}</div>
              <v-text-field
                prepend-inner-icon="mdi-cash"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.bank_name', 'capitalize')"
                v-model="input.bank_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.bank_code') }}</div>
              <v-text-field
                prepend-inner-icon="mdi-cash"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.bank_code', 'capitalize')"
                v-model="input.bank_code"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.account_number') }}</div>
              <v-text-field
                prepend-inner-icon="mdi-cash"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.account_number', 'capitalize')"
                v-model="input.account_number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.account_owner') }}</div>
              <v-text-field
                prepend-inner-icon="mdi-cash"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.account_owner', 'capitalize')"
                v-model="input.account_owner"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.amount') }}</div>
              <v-text-field
                prepend-inner-icon="mdi-cash"
                v-model="input.amount"
                prefix="Rp"
                type="number"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.amount', 'capitalize')"
                :hint="input.amount | currency"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div
                class="caption primary--text text-capitalize"
              >{{ $translate('text.amount_in_word') }}</div>
              <v-text-field
                :value="$terbilang(input.amount) | capitalize"
                :label="$translate('text.amount_in_word', 'capitalize')"
                :messages="$translate('helper.messages.amount_in_word', 'capitalize')"
                readonly
                solo
              ></v-text-field>
            </v-col>
          </v-row>
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
                show-size
                v-model="input.attachment"
                clearable
                solo
                :label="$translate('text.attachment_file', 'capitalize')"
                :messages="$translate('helper.messages.attachment_file', 'capitalize')"
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
        >{{ $translate('components.button.submit')}}</v-btn>
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
      modal: {
        date: false
      },
      input: {
        allocation: null,
        date: null,
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
        required: value =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  filters: {
    currency: function(value) {
      if (value == null || value == '') return 'Rp 0'
      if (value.toString().split('.').length > 1) return 'Rp ~'
      let result = value
        .toString()
        .match(/\d{1,3}(?=(\d{3})*$)/g)
        .join('.')
      return 'Rp ' + result
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
    initValue() {
      this.today = new Date().toISOString()
    },
    async storeRequest() {
      try {
        console.log(this.input)
        if (this.input.method === 'cash') {
          this.input.bank_code = null
          this.input.bank_name = null
          this.input.account_owner = null
          this.input.account_number = null
        }
        await this.$api('request', 'store', this.input)
      } catch (e) {
        console.error(e)
      }
    }
  },
  mounted() {
    this.initValue()
  }
}
</script>
<style scoped>
</style>
