<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>{{ $translate('components.form.title.request') }}</span>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="text-capitalize">{{ $translate('export.pdf') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-capitalize">{{ $translate('export.excel') }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.allocation')}}</div>
                    <span>{{ input.allocation || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.payment_type')}}</div>
                    <v-chip
                      label
                      small
                      class="overline"
                    >{{ input.method || $vuetify.lang.t('$vuetify.noDataText') }}</v-chip>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.amount')}}</div>
                    <div>{{ input.amount | currency }}</div>
                    <span
                      class="caption"
                    >{{ $terbilang(input.amount) || $vuetify.lang.t('$vuetify.noDataText') | capitalize }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.attachment">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.file')}}</div>
                    <span class="text-capitalize">{{ $translate('text.view') }}</span>
                    <v-btn color="accent" icon x-small :href="input.attachment" target="_blank">
                      <v-icon small>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.note')}}</div>
                    <span>{{ input.notes || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.method==='Transfer'">
                    <div class="caption primary--text text-capitalize"
                    >{{ $translate('text.bank_code')}}</div>
                    <span>{{ input.bank_code || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.method==='Transfer'">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.bank_name')}}</div>
                    <span>{{ input.bank_name || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.method==='Transfer'">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.account_number')}}</div>
                    <span>{{ input.account_number || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.method==='Transfer'">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.account_owner')}}</div>
                    <span>{{ input.account_owner || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.status')}}</div>
                    <span>{{ input.status.status || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div
                  class="caption primary--text text-capitalize"
                >{{ $translate('text.verification')}}</div>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-col cols="12" md="6">
                    <v-btn large elevation="8" block color="secondary">{{ $translate('text.pic')}}</v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                    >{{ $translate('text.verificator')}}</v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                    >{{ $translate('text.head_dept')}}</v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                    >{{ $translate('text.cashier')}}</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">{{ $translate('text.pic') }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.name')}}</div>
                    <span>{{ input.user.name }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.division')}}</div>
                    <span>{{ input.user.division }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.email')}}</div>
                    <span>{{ input.user.email }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-date-picker :value="input.date"></v-date-picker>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="spacing-small"></div>
    <v-row>
      <v-col>
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="deleteRequest()"
        >{{$translate('components.button.delete')}}</v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="secondary"
        >{{$translate('components.button.done')}}</v-btn>
      </v-col>
    </v-row>
    <snackbar-alert v-model="alert" :success="success" :messages="messages"></snackbar-alert>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      alert: false,
      success: false,
      messages: '',
      input: {
        user: {},
        status: {},
        budget_code: {}
      }
    }
  },
  filters: {
    currency: function(value) {
      if (value == null || value == '') return 'Rp 0'
      const result = Number(value)
        .toString()
        .match(/\d{1,3}(?=(\d{3})*$)/g)
        .join('.')
      return 'Rp ' + result + ',00'
    },
    capitalize: function(value) {
      if (!value) return ''
      value = value
        .toString()
        .split(' ')
        .map(element => element.charAt(0).toUpperCase() + element.slice(1))
      return value.join(' ')
    }
  },
  methods: {
    async getRequestForm() {
      try {
        this.input = await this.$api('request', 'show', this.$route.params.id)
        console.log(this.input)
      } catch (e) {
        console.error(e)
      }
    },
    async deleteRequest() {
      try {
        await this.$api('request', 'delete', this.input)
      } catch (e) {
        console.error(e)
      }
    }
  },
  mounted() {
    this.getRequestForm()
  }
}
</script>
<style scoped></style>
