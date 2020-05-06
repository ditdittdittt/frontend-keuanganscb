<template>
  <v-container>
    <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
      <v-card-title class="text-uppercase">
        <span>{{ $translate('components.table.title.submission') }}</span>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click.stop="$export('pdf', 'submission', null)">
              <v-list-item-title class="text-capitalize">{{
                $translate('export.pdf')
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click.stop="$export('excel', 'submission', null)">
              <v-list-item-title class="text-capitalize">{{
                $translate('export.excel')
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-subtitle class="overline">{{
        $translate('components.table.subtitle.submission')
      }}</v-card-subtitle>
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
          <template v-slot:item.use="{ item }">{{
            item.use | currency
          }}</template>
          <template v-slot:item.balance="{ item }">{{
            item.balance | currency
          }}</template>
          <template v-slot:item.id="{ item }">
            <v-btn
              color="secondary"
              small
              text
              :to="'/detail/submission/' + item.id"
              >Detail</v-btn
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
    }
  },
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
        { text: `${this.$translate('text.use', 'capitalize')}`, value: 'used' },
        {
          text: `${this.$translate('text.balance', 'capitalize')}`,
          value: 'balance'
        },
        {
          text: `${this.$translate('text.pic', 'capitalize')}`,
          value: 'user.name'
        },
        {
          text: `${this.$translate('text.status', 'capitalize')}`,
          value: 'status.status'
        },
        {
          text: `${this.$translate('text.number', 'capitalize')}`,
          value: 'number'
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
  mounted() {
    this.getAllSubmissionForms()
  },
  methods: {
    async getAllSubmissionForms() {
      try {
        this.items = await this.$api('submission', 'index', null)
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
