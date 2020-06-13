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
                @click.stop="storeBudgetCode"
                >{{ $translate('components.button.add') }}</v-btn
              >
            </template>
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
              class="text-capitalize"
            >
              <template v-slot:item.balance="{ item }">
                <span>{{ item.balance | currency }}</span>
              </template>
              <template v-if="edit" v-slot:body="{}">
                <tbody
                  v-if="
                    $vuetify.breakpoint.md ||
                      $vuetify.breakpoint.lg ||
                      $vuetify.breakpoint.xl
                  "
                >
                  <tr v-for="(item, i) in copyOfItems" :key="item.name">
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
                        @click.stop="updateBalance(item, i)"
                      >
                        {{ $translate('components.button.update') }}
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <template v-for="(item, i) in copyOfItems">
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
                            @click.stop="updateBalance(item, i)"
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
              <template v-slot:item.id="{ item }">
                <v-btn color="secondary" small text @click.stop="viewLog(item)">
                  {{ $translate('text.history_log') }}
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <!-- Alert -->
        <snackbar-alert
          v-model="alert"
          :success="success"
          :messages="messages"
        ></snackbar-alert>

        <!-- Dialog Log -->
        <v-dialog v-model="modal.log" persistent max-width="600">
          <v-card>
            <v-card-title class="text-capitalize">
              <span>Detail</span>
              <v-spacer></v-spacer>
              <v-btn icon small @click.stop="modal.log = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-card-title>
            <v-card-text>
              <v-divider></v-divider>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td class="caption font-weight-bold text-capitalize">
                        {{ $translate('text.code') }}
                      </td>
                      <td class="caption">{{ currentLogItem.code }}</td>
                    </tr>
                    <tr>
                      <td class="caption font-weight-bold text-capitalize">
                        {{ $translate('text.name') }}
                      </td>
                      <td class="caption">{{ currentLogItem.name }}</td>
                    </tr>
                    <tr>
                      <td class="caption font-weight-bold text-capitalize">
                        {{ $translate('text.created_at') }}
                      </td>
                      <td class="caption">{{ currentLogItem.created_at }}</td>
                    </tr>
                    <tr>
                      <td class="caption font-weight-bold text-capitalize">
                        {{ $translate('text.updated_at') }}
                      </td>
                      <td class="caption">{{ currentLogItem.updated_at }}</td>
                    </tr>
                    <tr>
                      <td class="caption font-weight-bold text-capitalize">
                        {{ $translate('text.balance') }}
                      </td>
                      <td class="caption">
                        {{ currentLogItem.balance | currency }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-divider></v-divider>
              <div class="spacing-xsmall"></div>
              <template v-if="currentBudgetLog.length">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      class="caption font-weight-bold text-capitalize"
                      >{{
                        $translate('text.history_log')
                      }}</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-text-field
                        v-model="searchLog"
                        append-icon="mdi-magnify"
                        :label="$translate('text.search', 'capitalize')"
                        solo
                        single-line
                        :light="!$vuetify.theme.dark"
                        hide-details
                        dense
                      ></v-text-field>
                      <v-data-table
                        :headers="headersBudgetLog"
                        :items="currentBudgetLog"
                        :search="searchLog"
                        class="text-capitalize"
                      >
                        <template v-slot:item.number="{ item }">
                          <span class="overline">
                            {{ item.number }}
                          </span>
                        </template>
                        <template v-slot:item.type="{ item }">
                          <span class="overline">
                            <span
                              :class="
                                item.type.toString().toUpperCase() === 'KREDIT'
                                  ? 'red--text'
                                  : 'green--text'
                              "
                            >
                              {{ item.type }}
                            </span>
                          </span>
                        </template>
                        <template v-slot:item.nominal="{ item }">
                          <span class="overline">
                            {{ item.nominal | currency }}
                          </span>
                        </template>
                        <template v-slot:item.created_at="{ item }">
                          <span class="overline">
                            {{ item.created_at }}
                          </span>
                        </template>
                      </v-data-table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template v-else>
                <div class="text-center caption text-secondary text-capitalize">
                  {{ $translate('text.no_log') }}
                </div>
                <div class="spacing-small"></div>
                <div class="text-center">
                  <template v-if="loading.budgetLog">
                    <v-progress-circular
                      indeterminate
                      color="secondary"
                    ></v-progress-circular>
                  </template>
                  <template v-else>
                    <v-btn
                      color="red"
                      dark
                      block
                      @click="deleteBudgetCode(currentLogItem.id)"
                    >
                      {{
                        $translate('components.button.delete') +
                          ' ' +
                          $translate('text.budget')
                      }}
                    </v-btn>
                  </template>
                </div>
              </template>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  middleware: 'role',
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
      search: '',
      searchLog: '',
      valid: true,
      edit: false,
      input: {
        code: null,
        name: null,
        balance: null
      },
      loading: {
        buttonStore: false,
        budgetLog: false
      },
      modal: {
        date: false,
        log: false
      },
      currentLogItem: {},
      currentBudgetLog: [],
      headers: [
        {
          text: `${this.$translate('text.code')}`,
          value: 'code'
        },
        {
          text: `${this.$translate('text.name')}`,
          value: 'name'
        },
        {
          text: `${this.$translate('text.balance')}`,
          value: 'balance'
        },
        {
          text: `${this.$translate('text.action')}`,
          value: 'id',
          sortable: false,
          align: 'center'
        }
      ],
      items: [],
      headersBudgetLog: [
        {
          text: `${this.$translate('text.number')}`,
          value: 'number'
        },
        {
          text: `${this.$translate('text.payment_type')}`,
          value: 'type'
        },
        {
          text: `${this.$translate('text.nominal')}`,
          value: 'nominal'
        },
        {
          text: `${this.$translate('text.created_at')}`,
          value: 'created_at'
        }
      ],
      copyOfItems: [],
      rules: {
        positive: (value) =>
          value >= 0 || `${this.$translate('text.positive', 'capitalize')}`,
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  watch: {
    edit() {
      this.copyOfItems = this.$copy(this.items)
    }
  },
  mounted() {
    this.getAllBudgetCode()
  },
  methods: {
    async getAllBudgetCode() {
      try {
        this.items = await this.$api('budget', 'index', null).then(
          (budgetCodes) => {
            return Array.isArray(budgetCodes) ? budgetCodes : []
          }
        )
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error', 'capitalize')}` + e
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
        this.loading.buttonStore = true
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
        this.getAllBudgetCode().then(() => (this.loading.buttonStore = false))
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error', 'capitalize')}` + e
        this.alert = true
        this.loading.buttonStore = false
      }
    },
    async deleteBudgetCode(id) {
      try {
        this.loading.budgetLog = true
        const result = await this.$api('budget', 'delete', id).finally(() => {
          this.loading.budgetLog = false
        })
        if (result.status === 200) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.managementBudget.delete',
            'capitalize'
          )}`
          this.alert = true
          this.modal.log = false
        }
        this.getAllBudgetCode()
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error', 'capitalize')}` + e
        this.alert = true
      }
    },
    async updateBalance(budgetCode, index = null) {
      if (
        index !== null &&
        parseInt(budgetCode.balance, 10) ===
          parseInt(this.items[index].balance, 10)
      ) {
        return
      }
      try {
        const result = await this.$api('budget', 'update', budgetCode)
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
        this.messages = `${this.$translate('alert.error', 'capitalize')}` + e
        this.alert = true
      }
    },
    viewLog(item) {
      this.loading.budgetLog = true
      this.modal.log = true
      this.currentLogItem = this.$copy(item)
      this.currentBudgetLog = []
      this.getLogBudget(item.id).then(() => (this.loading.budgetLog = false))
    },
    async getLogBudget(id) {
      try {
        const result = await this.$api('budget', 'log', id)
        if (result) {
          this.currentBudgetLog = this.$copy(
            Array.isArray(result) ? result.reverse() : result
          )
        }
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error', 'capitalize')}` + e
        this.alert = true
      }
    }
  }
}
</script>
<style scoped></style>
