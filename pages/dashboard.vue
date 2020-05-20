<template>
  <v-container>
    <v-row>
      <template v-for="(item, i) in summary">
        <v-col :key="item.name + i" cols="12" sm="6" md="3">
          <v-card color="accent" dark class="pa-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline font-weight-black">{{
                  item.value
                }}</v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle class="body-2 text-capitalize">{{
                  $translate('text.' + item.name)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon large>{{ item.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="title">
            <span class="text-uppercase primary--text font-weight-black"
              >Divisi Keuangan</span
            >
            <v-divider vertical class="mx-2"></v-divider>
            <span class="text-uppercase font-weight-black">{{
              $translate('text.user')
            }}</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              push-icon="mdi-magnify"
              :label="$translate('text.search', 'capitalize')"
              single-line
              hide-details
              solo
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table :items="items" :headers="headers" :search="search">
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <snackbar-alert
      v-model="alert"
      :success="success"
      :messages="messages"
    ></snackbar-alert>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      success: false,
      messages: '',
      search: '',
      summary: [],
      headers: [
        {
          text: `${this.$translate('text.name', 'capitalize')}`,
          value: 'name'
        },
        {
          text: `${this.$translate('text.username', 'capitalize')}`,
          value: 'username'
        },
        {
          text: `${this.$translate('text.email', 'capitalize')}`,
          value: 'email'
        },
        {
          text: `${this.$translate('text.division', 'capitalize')}`,
          value: 'division'
        }
      ],
      items: []
    }
  },
  mounted() {
    this.getFormRequestCount()
    this.getFormSubmissionCount()
    this.getFormPettyCashCount()
    this.getAllUsers()
  },
  methods: {
    async getAllUsers() {
      try {
        const { users } = await this.$api('user', 'all')
        this.items = users
        this.summary.push({
          name: 'user',
          value: users.length,
          icon: 'mdi-account-circle'
        })
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    },
    async getFormRequestCount() {
      try {
        const response = await this.$api('request', 'count')
        this.summary.push({
          name: 'request',
          value: response.form_request_count,
          icon: 'mdi-newspaper'
        })
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    },
    async getFormSubmissionCount() {
      try {
        const response = await this.$api('submission', 'count')
        this.summary.push({
          name: 'submission',
          value: response.form_submission_count,
          icon: 'mdi-newspaper-variant-multiple'
        })
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    },
    async getFormPettyCashCount() {
      try {
        const response = await this.$api('petty', 'count')
        this.summary.push({
          name: 'petty_cash',
          value: response.form_petty_cash_count,
          icon: 'mdi-cash-multiple'
        })
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    }
  }
}
</script>
