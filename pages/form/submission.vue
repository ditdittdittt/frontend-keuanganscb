<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">{{ $translate('components.form.title.submission') }}</v-card-title>
      <v-card-subtitle class="overline">{{ $translate('components.form.subtitle.submission') }}</v-card-subtitle>
    </v-card>
    <v-card raised class="back-card px-md-5">
      <v-card-text>
        <div class="spacing-medium"></div>
        <v-form ref="createFormSubmission" v-model="formSubmission">
          <v-row>
            <v-col cols="12" md="3">
              <div
                class="caption primary--text text-capitalize"
              >{{ $translate('text.form') + ' ' + $translate('text.request') }}</div>
              <v-combobox
                v-model="input.request"
                prepend-inner-icon="mdi-newspaper-plus"
                :items="form.request"
                solo
                :rules="[rules.required]"
                :label="
                  $translate('text.form', 'capitalize') +
                    ' ' +
                    $translate('text.request', 'capitalize')
                "
                clearable
                auto-select-first
                cache-items
              >
                <template v-slot:item="{ item }">{{ item.id + ' - ' + item.allocation }}</template>
                <template v-slot:selection="{ item }">{{ item.id + ' - ' + item.allocation }}</template>
              </v-combobox>
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
                  <v-btn
                    text
                    color="primary"
                    @click="modal.date = false"
                  >{{ $translate('components.button.cancel') }}</v-btn>
                  <v-btn text color="primary" @click="$refs.date.save(input.date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" md="6">
              <div class="caption primary--text text-capitalize">{{ $translate('text.allocation') }}</div>
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
              <div class="caption primary--text text-capitalize">{{ $translate('text.use') }}</div>
              <v-text-field
                v-model="input.used"
                prepend-inner-icon="mdi-cash"
                prefix="Rp"
                solo
                :rules="[rules.required]"
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
              <div class="caption primary--text text-capitalize">{{ $translate('text.balance') }}</div>
              <v-text-field
                v-model="input.balance"
                prepend-inner-icon="mdi-cash-multiple"
                prefix="Rp"
                solo
                :rules="[rules.required]"
                :label="$translate('text.balance', 'capitalize')"
                :hint="input.balance | currency"
                type="number"
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
              <div class="caption primary--text text-capitalize">{{ $translate('text.note') }}</div>
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
      formSubmission: true,
      modal: {
        date: false
      },
      input: {
        request: null,
        date: null,
        allocation: null,
        used: null,
        balance: null,
        notes: null
      },
      form: {
        request: []
      },
      rules: {
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  mounted() {
    this.initValue()
    this.getAllRequestForms()
  },
  methods: {
    initValue() {
      this.today = new Date().toISOString()
    },
    async storeSubmission() {
      try {
        await this.$api('submission', 'store', this.input)
        this.$refs.createFormSubmission.reset()
      } catch (e) {}
    },
    async getAllRequestForms() {
      try {
        this.form.request = await this.$api('request', 'index', null)
      } catch (e) {}
    }
  }
}
</script>
<style scoped></style>
