<template>
  <v-container>
    <v-row>
      <template v-for="(item, i) in statistics.summary">
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
              append-icon="mdi-magnify"
              :label="$translate('text.search', 'capitalize')"
              single-line
              hide-details
              solo
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table :items="items" :headers="headers" :search="search">
              <template v-slot:item.id="{ item }">
                <v-btn
                  color="secondary"
                  text
                  small
                  @click.stop="popupUser(item)"
                  >{{ $translate('text.view') }}</v-btn
                >
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="modal.user" width="600px" persistent>
      <v-card>
        <v-card-title class="text-capitalize headline">{{
          $translate('text.user')
        }}</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="overline">
                    <v-chip label small color="primary" outlined>{{
                      $translate('text.name')
                    }}</v-chip>
                  </td>
                  <td class="text-capitalize">{{ user.name }}</td>
                </tr>
                <tr>
                  <td class="overline">
                    <v-chip label small color="primary" outlined>{{
                      $translate('text.username')
                    }}</v-chip>
                  </td>
                  <td>{{ user.username }}</td>
                </tr>
                <tr>
                  <td class="overline">
                    <v-chip label small color="primary" outlined>{{
                      $translate('text.email')
                    }}</v-chip>
                  </td>
                  <td>{{ user.email }}</td>
                </tr>
                <tr>
                  <td class="overline">
                    <v-chip label small color="primary" outlined>{{
                      $translate('text.division')
                    }}</v-chip>
                  </td>
                  <td class="text-capitalize">{{ user.division }}</td>
                </tr>
                <tr>
                  <td class="overline">
                    <v-chip label small color="primary" outlined>{{
                      $translate('text.position')
                    }}</v-chip>
                  </td>
                  <td class="text-capitalize">{{ user.position }}</td>
                </tr>
                <tr>
                  <td class="overline">
                    <v-chip label small color="primary" outlined>{{
                      $translate('text.nik')
                    }}</v-chip>
                  </td>
                  <td>{{ user.nik }}</td>
                </tr>
                <tr>
                  <td class="overline">
                    <v-chip label small color="primary" outlined>{{
                      $translate('text.address')
                    }}</v-chip>
                  </td>
                  <td>{{ user.address }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            color="secondary"
            block
            @click.stop="modal.user = false"
            >{{ $translate('components.button.close') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      statistics: {
        summary: [
          {
            name: 'request',
            value: 33,
            icon: 'mdi-newspaper'
          },
          {
            name: 'submission',
            value: 5,
            icon: 'mdi-newspaper-variant-multiple'
          },
          {
            name: 'petty_cash',
            value: 150,
            icon: 'mdi-cash-multiple'
          },
          {
            name: 'user',
            value: 13,
            icon: 'mdi-account-circle'
          }
        ]
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
        },
        {
          text: `${this.$translate('text.position', 'capitalize')}`,
          value: 'position'
        },
        {
          text: `${this.$translate('text.nik', 'uppercase')}`,
          value: 'nik'
        },
        {
          text: `${this.$translate('text.action', 'capitalize')}`,
          value: 'id',
          sortable: false,
          align: 'center'
        }
      ],
      items: [],

      modal: {
        user: false
      },

      user: {}
    }
  },
  mounted() {
    this.initValue()
  },
  methods: {
    popupUser(user) {
      this.user = user
      this.modal.user = true
    },
    initValue() {
      this.items = [
        {
          id: 1,
          name: 'Hilmy',
          username: 'hhh',
          email: 'hilmy@mail.com',
          division: 'Keuangan',
          position: 'Direktur',
          nik: '1110111',
          address: 'Jl Bogor Satu Kota'
        },
        {
          id: 2,
          name: 'Haidar',
          username: 'dardar',
          email: 'haidar@mail.com',
          division: 'Asrama',
          position: 'Pembina',
          nik: '1110000001010101',
          address: 'Jl Bekasi Satu Kota 1233455'
        },
        {
          id: 3,
          name: 'Hilmy',
          username: 'hihihi',
          email: 'mhilmyh@mail.co.id',
          division: 'BPH',
          position: 'Kepala Sekolah',
          nik: '11101111010101101010',
          address: 'Jl Singapura'
        }
      ]
    }
  }
}
</script>
