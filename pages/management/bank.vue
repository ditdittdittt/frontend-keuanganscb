<template>
  <v-container>
    <v-row>
      <!-- New Budget -->
      <v-col cols="12" sm="6" md="4">
        <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
          <v-card-title class="text-uppercase">{{
            $translate('components.form.title.bank')
          }}</v-card-title>
          <v-card-subtitle class="overline">{{
            $translate('components.form.subtitle.bank')
          }}</v-card-subtitle>
        </v-card>
        <v-card raised class="back-card px-md-5">
          <v-card-text>
            <div class="spacing-medium"></div>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
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
                <v-col cols="12">
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
                <v-col cols="12">
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
                <v-col cols="12">
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
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-5">
            <v-btn
              block
              x-large
              dark
              color="secondary"
              elevation="8"
              @click.stop="storeBudgetCode"
              >{{ $translate('components.button.add') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- All budget list -->
      <v-col cols="12" md="8">
        <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
          <v-card-title class="text-uppercase">
            <span>{{ $translate('components.table.title.bank') }}</span>
          </v-card-title>
          <v-card-subtitle class="overline">{{
            $translate('components.table.subtitle.bank')
          }}</v-card-subtitle>
          <v-card-text class="px-5">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$translate('text.search', 'capitalize')"
              solo
              single-line
              :light="!$vuetify.theme.dark"
              hide-details
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card raised class="back-card px-md-5">
          <v-card-text>
            <div class="spacing-medium"></div>
            <v-data-table :headers="headers" :items="items" :search="search">
              <template v-slot:item.balance="{ item }">{{
                item.balance | currency
              }}</template>
              <template v-slot:item.id="{ item }">
                <v-btn
                  color="secondary"
                  small
                  text
                  @click.stop="deleteBudgetCode(item.id)"
                  >Delete</v-btn
                >
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <snackbar-alert
          v-model="alert"
          :success="success"
          :messages="messages"
        ></snackbar-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  filters: {
    currency(value) {
      if (value === null || value === '') return 'Rp 0'
      const result = Number(value)
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
  data() {
    return {
      alert: false,
      success: false,
      messages: '',
      search: '',
      today: null,
      valid: true,
      input: {
        code: null,
        name: null,
        balance: null
      },
      modal: {
        date: false
      },
      headers: [
        {
          text: `${this.$translate('text.bank_code', 'capitalize')}`,
          value: 'bank_code'
        },
        {
          text: `${this.$translate('text.bank_name', 'capitalize')}`,
          value: 'bank_name'
        },
        {
          text: `${this.$translate('text.account_number', 'capitalize')}`,
          value: 'account_number'
        },
        {
          text: `${this.$translate('text.account_owner', 'capitalize')}`,
          value: 'account_owner'
        },
        {
          text: `${this.$translate('text.action', 'capitalize')}`,
          value: 'id',
          sortable: false,
          align: 'center'
        }
      ],
      items: [],
      rules: {
        positive: (value) =>
          value >= 0 || `${this.$translate('text.positive', 'capitalize')}`,
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  mounted() {
    this.getAllBudgetCode()
  },
  methods: {
    async getAllBudgetCode() {
      try {
        this.items = await this.$api('rekening', 'index', null)
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async storeBudgetCode() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = 'Form belum valid'
        this.alert = true
        return
      }
      try {
        const result = await this.$api('rekening', 'store', this.input)
        if (result.status === 201) {
          this.success = true
          this.messages = 'Rekening berhasil di simpan'
          this.alert = true
          this.$refs.form.reset()
        }
        this.getAllBudgetCode()
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async deleteBudgetCode(id) {
      try {
        const result = await this.$api('rekening', 'delete', id)
        if (result.status === 200) {
          this.success = true
          this.messages = 'Rekening berhasil di hapus'
          this.alert = true
        }
        this.getAllBudgetCode()
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
