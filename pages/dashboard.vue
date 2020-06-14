<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <template v-if="loading.summaryUser">
          <circular-loading></circular-loading>
        </template>
        <template v-else>
          <v-card color="accent" dark>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="body-1 font-weight-black">{{
                  summary.user.value
                }}</v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle class="overline text-capitalize">{{
                  $translate('text.' + summary.user.name)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ summary.user.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="12" sm="3">
        <template v-if="loading.summaryRequest">
          <circular-loading></circular-loading>
        </template>
        <template v-else>
          <v-card color="accent" dark>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="body-1 font-weight-black">{{
                  summary.request.value
                }}</v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle class="overline text-capitalize">{{
                  $translate('text.' + summary.request.name)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ summary.request.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="12" sm="3">
        <template v-if="loading.summarySubmission">
          <circular-loading></circular-loading>
        </template>
        <template v-else>
          <v-card color="accent" dark>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="body-1 font-weight-black">{{
                  summary.submission.value
                }}</v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle class="overline text-capitalize">{{
                  $translate('text.' + summary.submission.name)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ summary.submission.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="12" sm="3">
        <template v-if="loading.summaryPetty">
          <circular-loading></circular-loading>
        </template>
        <template v-else>
          <v-card color="accent" dark>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="body-1 font-weight-black">{{
                  summary.petty.value
                }}</v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle class="overline text-capitalize">{{
                  $translate('text.' + summary.petty.name)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ summary.petty.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
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
              dense
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :items="items"
              :headers="headers"
              :search="search"
              :items-per-page="5"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card>
          <v-card-title class="text-uppercase font-weight-black">{{
            $translate('text.budget')
          }}</v-card-title>
          <v-card-text>
            <doughnut-chart
              ref="dchart"
              :chartdata="budgets"
              :options="chartoptions"
            ></doughnut-chart>
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
import DoughnutChart from '~/components/DoughnutChart.vue'
export default {
  components: {
    DoughnutChart
  },
  data() {
    return {
      alert: false,
      success: false,
      messages: '',
      search: '',
      loading: {
        summaryUser: false,
        summaryRequest: false,
        summarySubmission: false,
        summaryPetty: false,
        chartData: false
      },
      summary: {
        user: {
          name: 'user',
          value: null,
          icon: 'mdi-account'
        },
        request: {
          name: 'request',
          value: null,
          icon: 'mdi-newspaper'
        },
        submission: {
          name: 'submission',
          value: null,
          icon: 'mdi-newspaper-variant-multiple'
        },
        petty: {
          name: 'petty_cash',
          value: null,
          icon: 'mdi-cash-multiple'
        }
      },
      headers: [
        {
          text: `${this.$translate('text.name', 'capitalize')}`,
          value: 'name'
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
      items: [],
      budgets: {
        labels: [],
        name: [],
        datasets: [
          {
            backgroundColor: [],
            borderColor: [],
            data: []
          }
        ]
      },
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            label: ({ index }, data) => {
              return data.labels[index]
            },
            footer: (tooltipsItem, data) => {
              return data.name[tooltipsItem[0].index]
            }
          }
        }
      }
    }
  },
  mounted() {
    this.getBudgets()
    this.getFormRequestCount()
    this.getFormSubmissionCount()
    this.getFormPettyCashCount()
    this.getAllUsers()
  },
  methods: {
    randomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    async getBudgets() {
      try {
        this.loading.chartData = true
        const response = await this.$api('budget', 'index').finally(() => {
          this.loading.chartData = false
        })
        for (let i = 0; i < response.length; i++) {
          this.budgets.labels.push(response[i].code)
          this.budgets.name.push(response[i].name)
          this.budgets.datasets[0].backgroundColor.push(this.randomColor())
          this.budgets.datasets[0].borderColor.push('rgba(0, 0, 0, 0.0)')
          this.budgets.datasets[0].data.push(response[i].balance)
        }
        this.$refs.dchart.update()
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    },
    async getAllUsers() {
      try {
        this.loading.summaryUser = true
        const response = await this.$api('user', 'all').finally(() => {
          this.loading.summaryUser = false
        })
        this.items = response.users
        this.summary.user.value = response.users.length
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    },
    async getFormRequestCount() {
      try {
        this.loading.summaryRequest = true
        const response = await this.$api('request', 'count').finally(() => {
          this.loading.summaryRequest = false
        })
        this.summary.request.value = response.form_request_count
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    },
    async getFormSubmissionCount() {
      try {
        this.loading.summarySubmission = true
        const response = await this.$api('submission', 'count').finally(() => {
          this.loading.summarySubmission = false
        })
        this.summary.submission.value = response.form_submission_count
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    },
    async getFormPettyCashCount() {
      try {
        this.loading.summaryPetty = true
        const response = await this.$api('petty', 'count').finally(() => {
          this.loading.summaryPetty = false
        })
        this.summary.petty.value = response.form_petty_cash_count
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
      }
    }
  }
}
</script>
