<template>
  <v-container>
    <v-row>
      <!-- New Budget -->
      <v-col cols="12" sm="6" md="4">
        <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
          <v-card-title class="text-uppercase">
            {{ $translate('components.form.title.budget_code') }}
          </v-card-title>
          <v-card-subtitle class="overline">
            {{ $translate('components.form.subtitle.budget_code') }}
          </v-card-subtitle>
        </v-card>
        <v-card raised class="back-card px-md-5">
          <v-card-text>
            <div class="spacing-medium"></div>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.code') }}
                  </div>
                  <v-text-field
                    v-model="input.code"
                    prepend-inner-icon="mdi-code-brackets"
                    clearable
                    counter
                    solo
                    :rules="[rules.required]"
                    :label="$translate('text.code', 'capitalize')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.name') }}
                  </div>
                  <v-text-field
                    v-model="input.name"
                    prepend-inner-icon="mdi-alphabetical"
                    clearable
                    counter
                    solo
                    :rules="[rules.required]"
                    :label="$translate('text.name', 'capitalize')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.balance') }}
                  </div>
                  <v-text-field
                    v-model="input.balance"
                    prepend-inner-icon="mdi-cash"
                    prefix="Rp"
                    type="number"
                    clearable
                    solo
                    :rules="[rules.required, rules.positive]"
                    :label="$translate('text.balance', 'capitalize')"
                    :hint="input.balance | currency"
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
      <v-col cols="12" sm="6" md="8">
        <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
          <v-card-title class="text-uppercase">
            <span>{{ $translate('components.table.title.budget_code') }}</span>
          </v-card-title>
          <v-card-subtitle class="overline">
            {{ $translate('components.table.subtitle.budget_code') }}
          </v-card-subtitle>
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
              <template v-slot:item.balance="{ item }">
                {{ item.balance | currency }}
              </template>
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
          text: `${this.$translate('text.code', 'capitalize')}`,
          value: 'code'
        },
        {
          text: `${this.$translate('text.name', 'capitalize')}`,
          value: 'name'
        },
        {
          text: `${this.$translate('text.balance', 'capitalize')}`,
          value: 'balance'
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
        this.items = await this.$api('budget', 'index', null)
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async storeBudgetCode() {
      try {
        const result = await this.$api('budget', 'store', this.input)
        if (result.status === 201) {
          this.success = true
          this.messages = 'Budget code berhasil di simpan'
          this.alert = true
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
        const result = await this.$api('budget', 'delete', id)
        if (result.status === 200) {
          this.success = true
          this.messages = 'Budget code berhasil di hapus'
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
