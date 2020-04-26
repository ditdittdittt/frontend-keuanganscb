<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">
        <span>{{ $translate('components.table.title.petty_cash') }}</span>
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
      <v-card-subtitle class="overline">{{ $translate('components.table.subtitle.petty_cash') }}</v-card-subtitle>
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
          <template v-slot:item.id="{item}">
            <v-btn color="secondary" small text :to="'/detail/petty/' + item.id">Detail</v-btn>
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
        { text: `${this.$translate('text.pic', 'capitalize')}`, value: 'pic' },
        {
          text: `${this.$translate('text.total_item', 'capitalize')}`,
          value: 'budgets.length'
        },
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
          date: '2020-05-05',
          pic: 'Fahreza Ikhsan',
          allocation: 'Pengeluaran harian',
          budgets: [{ code: 1101 }, { code: 1102 }],
          createdAt: '2020-05-01',
          updatedAt: '2020-05-01'
        },
        {
          id: 2,
          date: '2020-02-02',
          pic: 'Naufal',
          allocation: 'DLC Assasin Creed',
          budgets: [{ code: 1101 }],
          createdAt: '2020-01-22',
          updatedAt: '2020-01-22'
        },
        {
          id: 3,
          date: '2020-02-20',
          pic: 'Al Ahmad Banjar',
          allocation: '3 Box Sirup Marjan',
          budgets: [{ code: 1101 }, { code: 1101 }, { code: 1101 }],
          createdAt: '2020-02-19',
          updatedAt: '2020-02-19'
        },
        {
          id: 4,
          date: '2020-11-09',
          pic: 'Intan Aida',
          allocation: 'Minuman Cap Kaki Tiga',
          budgets: [{ code: 1101 }],
          createdAt: '2020-11-06',
          updatedAt: '2020-11-06'
        },
        {
          id: 5,
          date: '2020-10-05',
          pic: 'Kipli Kips Boi',
          allocation: 'Laravel Udemy',
          budgets: [{ code: 1101 }, { code: 1101 }],
          createdAt: '2020-09-30',
          updatedAt: '2020-09-30'
        },
        {
          id: 6,
          date: '2020-06-10',
          pic: 'Yudit Ditditdit',
          allocation: 'DevOps Scholarship',
          budgets: [{ code: 1101 }],
          createdAt: '2020-06-06',
          updatedAt: '2020-06-06'
        }
      ]
    },
    async getPetty() {
      try {
        await this.$api('petty', 'show', null)
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
