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
                <v-col cols="12">
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
            <v-spacer></v-spacer>
            <v-switch v-model="edit" hide-details dense class="mt-0">
              <template v-slot:label>
                <span class="overline">edit</span>
              </template>
            </v-switch>
          </v-card-title>
          <v-card-subtitle class="overline pt-1">
            <span>
              {{ $translate('components.table.subtitle.budget_code') }}
            </span>
          </v-card-subtitle>
          <v-card-text class="px-5">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$translate('text.search', 'capitalize')"
              solo
              single-line
              :disabled="edit"
              :light="!$vuetify.theme.dark"
              hide-details
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card raised class="back-card px-md-5">
          <v-card-text>
            <div class="spacing-medium"></div>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              :disable-sort="edit"
            >
              <template v-slot:item.balance="{ item }">
                <span>{{ item.balance | currency }}</span>
              </template>
              <template v-slot:item.id="{ item }">
                <v-btn
                  color="red"
                  small
                  text
                  @click.stop="deleteBudgetCode(item.id)"
                >
                  {{ $translate('components.button.delete') }}
                </v-btn>
              </template>
              <template v-if="edit" v-slot:body="{}">
                <tbody
                  v-if="
                    $vuetify.breakpoint.md ||
                      $vuetify.breakpoint.lg ||
                      $vuetify.breakpoint.xl
                  "
                >
                  <tr v-for="item in items" :key="item.name">
                    <td>{{ item.code }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                      <v-text-field
                        v-model="item.balance"
                        dense
                        hide-details
                        prefix="Rp"
                        type="number"
                      ></v-text-field>
                    </td>
                    <td>
                      <v-btn
                        color="secondary"
                        small
                        text
                        @click.stop="updateBalance(item)"
                      >
                        {{ $translate('components.button.update') }}
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <template v-for="(item, i) in items">
                    <v-container :key="'id-table-' + i" class="px-4 py-0">
                      <v-row>
                        <v-col
                          cols="5"
                          class="py-3 text-left font-weight-bold"
                          >{{ $translate('text.code', 'capitalize') }}</v-col
                        >
                        <v-col class="py-3 text-right">{{ item.code }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="5"
                          class="py-3 text-left font-weight-bold"
                          >{{ $translate('text.name', 'capitalize') }}</v-col
                        >
                        <v-col class="py-3 text-right">{{ item.name }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="5"
                          class="py-3 text-left font-weight-bold"
                          >{{ $translate('text.balance', 'capitalize') }}</v-col
                        >
                        <v-col class="py-3 text-right">
                          <v-text-field
                            v-model="item.balance"
                            dense
                            hide-details
                            prefix="Rp"
                            type="number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="5"
                          class="py-3 text-left font-weight-bold"
                          >{{ $translate('text.action', 'capitalize') }}</v-col
                        >
                        <v-col class="py-3 text-right">
                          <v-btn
                            color="secondary"
                            small
                            text
                            @click.stop="updateBalance(item)"
                          >
                            {{ $translate('components.button.update') }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-divider :key="'id-divider-' + i"></v-divider>
                  </template>
                </tbody>
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
      if (value < 0) {
        const result = Number(value)
          .toString()
          .match(/\d{1,3}(?=(\d{3})*$)/g)
          .join('.')
        return '-' + 'Rp ' + result + ',00'
      }
      try {
        const result = Number(value)
          .toString()
          .match(/\d{1,3}(?=(\d{3})*$)/g)
          .join('.')
        return 'Rp ' + result + ',00'
      } catch (e) {
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
      search: '',
      valid: true,
      edit: false,
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
        console.log(this.$vuetify.breakpoint)
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` +
          e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async storeBudgetCode() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = `${this.$translate(
          'alert.managementBudget.store',
          'capitalize'
        )}`
        this.alert = true
        return
      }
      try {
        const result = await this.$api('budget', 'store', this.input)
        if (result.status === 201) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.managementBudget.save',
            'capitalize'
          )}`
          this.alert = true
          this.$refs.form.reset()
        }
        await this.getAllBudgetCode()
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` +
          e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async deleteBudgetCode(id) {
      try {
        const result = await this.$api('budget', 'delete', id)
        if (result.status === 200) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.managementBudget.delete',
            'capitalize'
          )}`
          this.alert = true
        }
        this.getAllBudgetCode()
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` +
          e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async updateBalance(budgetCode) {
      try {
        const result = await this.$api('budget', 'update', budgetCode)
        console.log(this.$vuetify.breakpoint)
        if (result.status === 200) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.managementBudget.save',
            'capitalize'
          )}`
          this.alert = true
          this.$refs.form.reset()
        }
        await this.getAllBudgetCode()
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` +
          e.toString().slice(0, 10)
        this.alert = true
      }
    }
  }
}
</script>
<style scoped></style>
