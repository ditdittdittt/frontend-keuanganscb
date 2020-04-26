<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>{{ $translate('components.form.title.petty_cash') }}</span>
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
                    <div class="caption primary--text text-capitalize">{{ $translate('text.note')}}</div>
                    <span>{{ input.note || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div class="caption primary--text text-capitalize">{{ $translate('text.budget')}}</div>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-data-table :items="input.budgets" :headers="headers"></v-data-table>
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
                    <span>{{ input.pic.name }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.division')}}</div>
                    <span>{{ input.pic.division }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.position')}}</div>
                    <span>{{ input.pic.position }}</span>
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
          @click.stop="deletePetty()"
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
      headers: [
        {
          text: `${this.$translate('text.budget_code', 'capitalize')}`,
          value: 'code'
        },
        {
          text: `${this.$translate('text.budget_name', 'capitalize')}`,
          value: 'name'
        },
        {
          text: `${this.$translate('text.budget_nominal', 'capitalize')}`,
          value: 'nominal'
        }
      ],
      input: {
        pic: {
          name: null,
          username: null,
          email: null,
          division: null,
          position: null,
          nik: null,
          address: null
        },
        allocation: null,
        budgets: [],
        note: null
      }
    }
  },
  filters: {
    currency: function(value) {
      if (value == null || value == '') return 'Rp 0'
      const result = value
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
    initValue() {
      this.input = {
        pic: {
          name: 'Muhamad Hilmy',
          username: 'hilmy_021',
          email: 'hilmy@mail.com',
          division: 'Keuangan',
          position: 'Direktur',
          nik: '11010101010',
          address: 'jalan salak'
        },
        allocation: 'Beli baju',
        date: '2020-08-17',
        budgets: [
          { code: '112A', name: 'Baju Koko', nominal: 120000 },
          { code: '112M', name: 'Motor Baru', nominal: 5000000 }
        ],
        note: 'Belanja keperluan lebaran'
      }
    },
    async deletePetty() {
      try {
        await this.$api('petty', 'delete', this.input)
      } catch (e) {
        console.error(e)
      }
    }
  },
  mounted() {
    this.initValue()
  }
}
</script>
<style scoped></style>
