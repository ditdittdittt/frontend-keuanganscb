<template>
  <v-container>
    <v-row>
      <!-- New Budget -->
      <v-col cols="12" sm="6" md="4">
        <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
          <v-card-title class="text-uppercase">
            <span>{{ $translate('components.form.title.bank') }}</span>
          </v-card-title>
          <v-card-subtitle class="overline">
            {{ $translate('components.form.subtitle.bank') }}
          </v-card-subtitle>
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
                    :rules="[rules.required, rules.alphabetic]"
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
                    :rules="[rules.required, rules.alphabetic]"
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
                    :rules="[rules.required, rules.alphabetic]"
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
                    :rules="[rules.required, rules.alphabetic]"
                    :label="$translate('text.account_owner', 'capitalize')"
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
                @click.stop="storeRekening"
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
            <span>{{ $translate('components.table.title.bank') }}</span>
            <v-spacer></v-spacer>
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn dark icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click.stop="rawData = true">
                  <v-list-item-title class="text-capitalize">
                    {{ $translate('text.rawData') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-subtitle class="overline">
            {{ $translate('components.table.subtitle.bank') }}
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
                  @click.stop="popupDelete(item.id)"
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
    <dialog-alert
      v-model="dialogDelete"
      :title="$translate('text.sure_delete_bank_head')"
      :message="$translate('text.sure_delete_bank_body')"
      :load="loading.onDelete"
      @no="dialogDelete = false"
      @yes="deleteRekening(currentId)"
    >
      <circular-loading></circular-loading>
    </dialog-alert>
    <!-- Raw Data -->
    <v-dialog
      v-model="rawData"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="accent">
          <v-btn icon dark @click="rawData = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $translate('text.rawData') }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <pre>{{ items }}</pre>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  middleware: 'role',
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
      rawData: false,
      messages: '',
      search: '',
      today: null,
      valid: true,
      dialogDelete: false,
      currentId: null,
      input: {
        code: null,
        name: null,
        balance: null
      },
      loading: {
        buttonStore: false,
        onDelete: false
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
        alphabetic: (value) =>
          /^[a-zA-Z0-9\s]+$/.test(value) ||
          `${this.$translate('alert.validation.alphabetic', 'capitalize')}`,
        positive: (value) =>
          value >= 0 || `${this.$translate('text.positive', 'capitalize')}`,
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`
      }
    }
  },
  mounted() {
    this.getAllRekening()
  },
  methods: {
    popupDelete(id) {
      this.dialogDelete = true
      this.currentId = id
    },
    getAllRekening() {
      try {
        this.$api('rekening', 'index', null).then((response) => {
          this.items = response
          this.loading.buttonStore = false
        })
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.buttonStore = false
      }
    },
    async storeRekening() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = `${this.$translate(
          'alert.managementBank.store',
          'capitalize'
        )}`
        this.alert = true
        return
      }
      try {
        this.loading.buttonStore = true
        const result = await this.$api('rekening', 'store', this.input).finally(
          () => {
            this.loading.buttonStore = false
          }
        )
        if (result.status === 201) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.managementBank.save',
            'capitalize'
          )}`
          this.alert = true
          this.$refs.form.reset()
        }
        this.getAllRekening()
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.buttonStore = false
      }
    },
    async deleteRekening(id) {
      try {
        this.loading.onDelete = true
        const result = await this.$api('rekening', 'delete', id).finally(() => {
          this.loading.onDelete = false
          this.dialogDelete = false
        })
        if (result.status === 200) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.managementBank.delete',
            'capitalize'
          )}`
          this.alert = true
        }
        this.getAllRekening()
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.onDelete = false
      }
    }
  }
}
</script>
<style scoped></style>
