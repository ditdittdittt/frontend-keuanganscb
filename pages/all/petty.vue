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
            <v-list-item @click.stop="$export('pdf', 'petty', null)">
              <v-list-item-title class="text-capitalize">
                {{ $translate('export.pdf') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click.stop="$export('excel', 'petty', null)">
              <v-list-item-title class="text-capitalize">
                {{ $translate('export.excel') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click.stop="rawData = true">
              <v-list-item-title class="text-capitalize">
                {{ $translate('text.rawData') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-subtitle class="overline">
        {{ $translate('components.table.subtitle.petty_cash') }}
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
          <template v-slot:item.amount="{ item }">{{
            item.amount | currency
          }}</template>
          <template v-slot:item.id="{ item }">
            <v-btn color="secondary" small text :to="'/detail/petty/' + item.id"
              >Detail</v-btn
            >
            <!-- <v-btn
              v-if="isAdmin && isAllowedToDelete(item.status.status)"
              color="red"
              small
              text
              @click.stop="deletePetty(item.id)"
              >{{ $translate('components.button.delete') }}</v-btn
            > -->
            <v-btn
              v-if="isAdmin && isAllowedToDelete(item.status.status)"
              color="red"
              small
              text
              @click.stop="popupDialogDelete(item.id)"
              >{{ $translate('components.button.delete') }}</v-btn
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
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
    <snackbar-alert
      v-model="alert"
      :success="success"
      :messages="messages"
    ></snackbar-alert>
    <dialog-alert
      v-model="dialogDelete"
      :title="$translate('text.sure_delete_head')"
      :message="$translate('text.sure_delete_body')"
      :load="loading.onDelete"
      @no="dialogDelete = false"
      @yes="deletePetty"
    >
      <circular-loading></circular-loading>
    </dialog-alert>
  </v-container>
</template>
<script>
import {
  Terbayarkan,
  MenungguSubmisi,
  VerifikasiSubmisi
} from '~/plugins/constant'
export default {
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
    }
  },
  data() {
    return {
      alert: false,
      success: false,
      rawData: false,
      messages: '',
      search: '',
      dialogDelete: false,
      currentId: null,
      loading: {
        onDelete: false
      },
      headers: [
        {
          text: `${this.$translate('text.created_at', 'capitalize')}`,
          value: 'created_at'
        },
        {
          text: `${this.$translate('text.allocation', 'capitalize')}`,
          value: 'allocation'
        },
        {
          text: `${this.$translate('text.pic', 'capitalize')}`,
          value: 'pic.name'
        },
        {
          text: `${this.$translate('text.status', 'capitalize')}`,
          value: 'status.status'
        },
        {
          text: `${this.$translate('text.amount', 'capitalize')}`,
          value: 'amount'
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
  computed: {
    isAdmin() {
      return this.$auth.user.roles_list
        .map((role) => role.toLowerCase())
        .includes('admin')
    }
  },
  mounted() {
    this.getAllPettyCashForms()
  },
  methods: {
    popupDialogDelete(id) {
      this.dialogDelete = true
      this.currentId = id
    },
    isAllowedToDelete(status) {
      const prohibitedStatus = [Terbayarkan, MenungguSubmisi, VerifikasiSubmisi]
      return !prohibitedStatus.includes(status)
    },
    async getAllPettyCashForms() {
      try {
        this.items = await this.$api('petty', 'index', null)
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    deletePetty() {
      try {
        this.loading.onDelete = true
        this.$api('petty', 'delete', this.currentId).finally(() => {
          this.getAllPettyCashForms()
          this.dialogDelete = false
          this.loading.onDelete = false
        })
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
        this.loading.onDelete = true
      }
    }
  }
}
</script>
<style scoped></style>
