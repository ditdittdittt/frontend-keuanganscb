<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">{{
        $translate('components.form.title.request')
      }}</v-card-title>
      <v-card-subtitle class="overline">{{
        $translate('components.form.subtitle.request')
      }}</v-card-subtitle>
      <v-card-text class="py-0 text-right">
        <v-btn
          small
          color="secondary"
          :to="'/detail/request/' + $route.params.id"
        >
          <v-icon small class="mr-2">mdi-arrow-left</v-icon>
          {{ $translate('text.back') }}
        </v-btn>
      </v-card-text>
    </v-card>
    <v-card raised class="back-card px-md-5">
      <v-card-text>
        <div class="spacing-medium"></div>
        <v-form ref="form" v-model="formRequest">
          <v-row>
            <v-col cols="12" md="3">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.budget_code') }}
              </div>
              <v-combobox
                v-model="input.budget_code"
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
            <v-col cols="12" md="3">
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
            <v-col cols="12" md="3">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.payment_type') }}
              </div>
              <v-radio-group v-model="input.method" dense row>
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
          <v-row v-if="input.method === 'transfer'">
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.bank_name') }}
              </div>
              <v-text-field
                v-model="input.bank_name"
                prepend-inner-icon="mdi-cash"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.bank_name', 'capitalize')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.bank_code') }}
              </div>
              <v-text-field
                v-model="input.bank_code"
                prepend-inner-icon="mdi-cash"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.bank_code', 'capitalize')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.account_number') }}
              </div>
              <v-text-field
                v-model="input.account_number"
                prepend-inner-icon="mdi-cash"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.account_number', 'capitalize')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.account_owner') }}
              </div>
              <v-text-field
                v-model="input.account_owner"
                prepend-inner-icon="mdi-cash"
                clearable
                solo
                :rules="[rules.required]"
                :label="$translate('text.account_owner', 'capitalize')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.amount') }}
              </div>
              <v-text-field
                v-model="input.amount"
                prepend-inner-icon="mdi-cash"
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
          </v-row>
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
              <v-btn v-if="file" :href="file" target="_blank">
                {{ $translate('text.current_file') }}
              </v-btn>
            </v-col>
            <v-col cols="12">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.additional_file') }}
              </div>
              <v-file-input
                v-model="input.attachment"
                show-size
                clearable
                solo
                :label="$translate('text.attachment_file', 'capitalize')"
                :messages="$translate('text.attachment_file', 'capitalize')"
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
          @click.stop="updateRequest()"
          >{{ $translate('components.button.update') }}</v-btn
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
  filters: {
    currency(value) {
      if (value === null || value === '') return 'Rp 0'
      if (value.toString().split('.').length > 1) return 'Rp ~'
      const result = value
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
      messages: '',
      today: null,
      modal: {
        date: false
      },
      formRequest: true,
      data: {
        budgetList: []
      },
      input: {
        budget_code: null,
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
      file: null,
      rules: {
        positive: (value) =>
          value >= 0 || `${this.$translate('text.positive', 'capitalize')}`,
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  mounted() {
    this.initValue()
  },
  methods: {
    initValue() {
      this.today = new Date().toISOString()
      this.getRequest()
      this.getBudgetList()
    },
    async getRequest() {
      try {
        this.input = await this.$api('request', 'show', this.$route.params.id)
        this.input.method = this.input.method.toLowerCase()
        this.file = this.input.attachment
        this.input.attachment = null
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async updateRequest() {
      try {
        const result = await this.$api('request', 'update', this.input).then(
          (response) => {
            this.getRequest()
          }
        )
        if (result.status === 200) {
          this.success = true
          this.messages = 'Data berhasil di update'
          this.alert = true
        } else {
          this.success = false
          this.messages = 'Gagal mengupdate data'
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
        this.data.budgetList = await this.$api('table', 'budgetlist', null)
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
