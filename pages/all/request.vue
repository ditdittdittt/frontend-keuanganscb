<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">
        <span>{{ $translate('components.table.title.request') }}</span>
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
      <v-card-subtitle class="overline">{{ $translate('components.table.subtitle.request') }}</v-card-subtitle>
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
          <template v-slot:item.amount="{item}">{{ item.amount | currency }}</template>
          <template v-slot:item.id="{item}">
            <v-btn color="secondary" small text :to="'/detail/request/' + item.id">Detail</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
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
      search: '',
      headers: [
        {
          text: `${this.$translate('text.date', 'capitalize')}`,
          value: 'date'
        },
        {
          text: `${this.$translate('text.allocation', 'capitalize')}`,
          value: 'allocation'
        },
        {
          text: `${this.$translate('text.amount', 'capitalize')}`,
          value: 'amount'
        },
        { text: `${this.$translate('text.pic', 'capitalize')}`, value: 'pic' },
        {
          text: `${this.$translate('text.created_at', 'capitalize')}`,
          value: 'createdAt'
        },
        {
          text: `${this.$translate('text.action', 'capitalize')}`,
          value: 'id',
          sortable: false,
          align: 'center'
        }
      ],
      items: []
    }
  },
  filters: {
    currency: function(value) {
      if (value == null || value == '') return 'Rp 0'
      let result = value
        .toString()
        .match(/\d{1,3}(?=(\d{3})*$)/g)
        .join('.')
      return 'Rp ' + result + ',00'
    }
  },
  methods: {
    initValue() {
      this.items = [
        {
          id: 1,
          date: '2020-09-28',
          pic: 'Fahreza Ikhsan',
          allocation: 'Pengeluaran harian',
          amount: 1500000,
          createdAt: '2020-09-21',
          updatedAt: '2020-09-21'
        },
        {
          id: 2,
          date: '2020-08-29',
          pic: 'Naufal',
          allocation: 'DLC Assasin Creed',
          amount: 100000,
          createdAt: '2020-08-11',
          updatedAt: '2020-08-11'
        },
        {
          id: 3,
          date: '2020-06-01',
          pic: 'Al Ahmad Banjar',
          allocation: '3 Box Sirup Marjan',
          amount: 2560000,
          createdAt: '2020-05-30',
          updatedAt: '2020-05-30'
        },
        {
          id: 4,
          date: '2020-05-15',
          pic: 'Intan Aida',
          allocation: 'Minuman Cap Kaki Tiga',
          amount: 5000,
          createdAt: '2020-04-01',
          updatedAt: '2020-04-01'
        },
        {
          id: 5,
          date: '2020-03-20',
          pic: 'Kipli Kips Boi',
          allocation: 'Laravel Udemy',
          amount: 50000,
          createdAt: '2020-03-25',
          updatedAt: '2020-03-25'
        },
        {
          id: 6,
          date: '2020-08-17',
          pic: 'Yudit Ditditdit',
          allocation: 'DevOps Scholarship',
          amount: 33000,
          createdAt: '2020-08-17',
          updatedAt: '2020-08-17'
        }
      ]
    },
    async getRequest() {
      try {
        await this.$api('request', 'show', null)
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
<style scoped>
</style>
