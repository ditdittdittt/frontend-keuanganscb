<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">
        {{ $translate('components.form.title.submission') }}
      </v-card-title>
      <v-card-subtitle class="overline">
        {{ $translate('components.form.subtitle.submission') }}
      </v-card-subtitle>
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
                item-text="number"
                solo
                :rules="[rules.required]"
                :label="$translate('text.number', 'capitalize')"
                clearable
                auto-select-first
                cache-items
                return-object
                @click:append-outer="showRequest(input.request)"
              >
                <template v-slot:selection="{ item }">
                  {{ item.number }}
                </template>
              </v-combobox>
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
          <v-row>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.use') }}
              </div>
              <v-text-field
                v-model="input.used"
                prepend-inner-icon="mdi-cash"
                prefix="Rp"
                solo
                :rules="[rules.required, rules.positive]"
                :label="$translate('text.use', 'capitalize')"
                :hint="input.used | currency"
                type="number"
                clearable
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
                :value="$terbilang(input.used) | capitalize"
                :label="
                  $translate('text.amount_in_word', 'capitalize') +
                    ' ' +
                    $translate('text.use')
                "
                :messages="
                  $translate('helper.messages.amount_in_word', 'capitalize')
                "
                readonly
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">
                {{ $translate('text.balance') }}
              </div>
              <v-text-field
                :value="input.balance"
                prepend-inner-icon="mdi-cash-multiple"
                prefix="Rp"
                solo
                :label="$translate('text.balance', 'capitalize')"
                :hint="input.balance | currency"
                type="number"
                readonly
                clearable
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
        <v-btn
          block
          x-large
          dark
          color="secondary"
          elevation="8"
          @click.stop="storeSubmission()"
          >{{ $translate('components.button.submit') }}</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog v-model="modal.request" max-width="600" persistent>
      <v-card>
        <v-card-title class="text-uppercase title">
          {{ $translate('components.form.title.request') }}
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
                  <td class="text-capitalize">
                    {{ currentRequest.allocation }}
                  </td>
                </tr>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    {{ $translate('text.payment_type') }}
                  </td>
                  <td>{{ currentRequest.method }}</td>
                </tr>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    {{ $translate('text.amount') }}
                  </td>
                  <td>{{ currentRequest.amount }}</td>
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
                    <td>{{ detail.budget_code.code }}</td>
                    <td>{{ detail.budget_code.name }}</td>
                    <td>{{ detail.nominal }}</td>
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
      if (value == null || value === '') return 'Rp 0'
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
      valid: true,
      input: {
        budgets: [{ code: null, nominal: null, balance: null }],
        request: null,
        allocation: null,
        used: null,
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
    'input.used'() {
      if (this.input.request) {
        this.input.balance = this.input.request.amount - this.input.used
      } else {
        this.input.balance = this.input.used
      }
    }
  },
  mounted() {
    this.getAllRequestForms()
  },
  methods: {
    showRequest() {
      if (this.input.request != null) {
        this.modal.request = true
        this.currentRequest = this.$copy(this.input.request)
      }
    },
    async storeSubmission() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = 'Terdapat kesalahan saat validasi data'
        this.alert = true
        return
      }
      try {
        const result = await this.$api('submission', 'store', this.input)
        if (result.status === 201) {
          this.success = true
          this.messages = 'Berhasil membuat form submission'
          this.alert = true
          this.$refs.form.reset()
        } else {
          this.success = false
          this.messages = 'Gagal membuat form submission'
          this.alert = true
        }
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async getAllRequestForms() {
      try {
        this.form.request = await this.$api('request', 'index', null)
        this.form.request = this.form.request.filter(function(form) {
          return form.status_id === 4
        })
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
