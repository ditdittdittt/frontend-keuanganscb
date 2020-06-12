<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="primary" dark class="mx-5 py-5 front-card" raised>
          <v-card-title class="text-uppercase">
            <span>{{ $translate('components.table.title.user') }}</span>
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
            {{ $translate('components.table.subtitle.user') }}
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
    <!-- Dialog Modal -->
    <v-dialog v-model="modal.user" width="600px" persistent>
      <v-card>
        <v-card-title class="text-capitalize headline">
          <span>{{ $translate('text.user') }}</span>
          <v-spacer></v-spacer>
          <span class="mx-1 overline">edit</span>
          <v-switch v-model="state.edit"></v-switch>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <colgroup>
                <col span="1" style="width: 30%;" />
                <col span="1" style="width: 70%;" />
              </colgroup>
              <tbody>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    <v-badge
                      :value="different(user.name, input.name)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.name') }}</v-badge
                    >
                  </td>
                  <td v-if="state.edit">
                    <v-text-field v-model="input.name" dense></v-text-field>
                  </td>
                  <td v-else>{{ user.name }}</td>
                </tr>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    <v-badge
                      :value="different(user.username, input.username)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.username') }}</v-badge
                    >
                  </td>
                  <td v-if="state.edit">
                    <v-text-field v-model="input.username" dense></v-text-field>
                  </td>
                  <td v-else>{{ user.username }}</td>
                </tr>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    <v-badge
                      :value="different(user.email, input.email)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.email') }}</v-badge
                    >
                  </td>
                  <td v-if="state.edit">
                    <v-text-field v-model="input.email" dense></v-text-field>
                  </td>
                  <td v-else>{{ user.email }}</td>
                </tr>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    <v-badge
                      :value="different(user.division, input.division)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.division') }}</v-badge
                    >
                  </td>
                  <td v-if="state.edit">
                    <v-text-field v-model="input.division" dense></v-text-field>
                  </td>
                  <td v-else>{{ user.division }}</td>
                </tr>
                <tr>
                  <td class="caption font-weight-bold text-capitalize">
                    <v-badge
                      :value="different(user.role, input.role)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.role') }}</v-badge
                    >
                  </td>
                  <td v-if="state.edit">
                    <v-select
                      v-model="input.roles"
                      cache-items
                      item-text="name"
                      item-value="name"
                      :items="roles"
                      multiple
                      class="caption"
                      dense
                      return-object
                    ></v-select>
                  </td>
                  <td v-else class="overline">
                    <template v-for="(role, i) in user.roles">
                      <span :key="'role' + i">{{ role.name }}</span>
                      <br :key="'br' + i" />
                    </template>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-row v-if="state.edit" class="ma-0">
            <template v-if="loading.editUser">
              <circular-loading></circular-loading>
            </template>
            <template v-else>
              <v-col>
                <v-btn
                  dark
                  color="red"
                  block
                  @click.stop="deleteUser(input.id)"
                  >{{ $translate('components.button.delete') }}</v-btn
                >
              </v-col>
              <v-col>
                <v-btn dark color="secondary" block @click.stop="updateUser">{{
                  $translate('components.button.update')
                }}</v-btn>
              </v-col>
            </template>
          </v-row>
          <v-row v-else class="ma-0">
            <v-col>
              <v-btn
                dark
                color="accent"
                block
                @click.stop="modal.user = false"
                >{{ $translate('components.button.close') }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </v-container>
</template>

<script>
export default {
  middleware: 'role',
  filters: {
    beauty(value) {
      if (value == null || value === '') return ''
      return value.replace(/[\W_]+/g, ' ').toUpperCase()
    }
  },
  data() {
    return {
      alert: false,
      success: false,
      rawData: false,
      messages: '',
      search: '',
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
        },
        {
          text: `${this.$translate('text.action', 'capitalize')}`,
          value: 'id',
          sortable: false,
          align: 'center'
        }
      ],
      items: [],
      roles: [],
      loading: {
        editUser: false
      },
      modal: {
        user: false
      },
      state: {
        edit: false
      },
      user: {
        name: null,
        username: null,
        email: null,
        division: null,
        role: null
      },
      input: {
        name: null,
        username: null,
        email: null,
        division: null,
        role: null
      }
    }
  },
  mounted() {
    this.getAllUsers()
    this.getRoles()
  },
  methods: {
    different(a, b) {
      return a !== b
    },
    popupUser(user) {
      this.user = user
      this.input = this.$copy(this.user)
      this.modal.user = true
      this.state.edit = false
    },
    async updateUser() {
      try {
        this.loading.editUser = true
        const result = await this.$api('user', 'update', this.input)
        this.$api('user', 'changeroles', this.input).then(() => {
          this.loading.editUser = false
          this.modal.user = false
        })
        if (result.status === 200) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.managementUser.update',
            'capitalize'
          )}`
          this.alert = true
        }
        this.getAllUsers()
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    async deleteUser(id) {
      try {
        this.loading.editUser = true
        const result = await this.$api('user', 'delete', id).finally(
          async () => {
            await this.getAllUsers()
            this.loading.editUser = false
            this.modal.user = false
          }
        )
        if (result.status === 200) {
          this.success = true
          this.messages = `${this.$translate(
            'alert.delete.success',
            'capitalize'
          )}`
          this.alert = true
        } else {
          this.success = false
          this.messages = `${this.$translate(
            'alert.delete.error',
            'capitalize'
          )}`
          this.alert = true
        }
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    getAllUsers() {
      try {
        this.$api('user', 'all').then(({ users }) => {
          this.items = users
        })
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error', 'capitalize')}` + e.toString()
        this.alert = true
      }
    },
    async getRoles() {
      try {
        const result = await this.$api('user', 'roles', null)
        if (result) {
          this.roles = result.role
        }
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate(
          'alert.managementUser.show',
          'capitalize'
        )}`
        this.alert = true
      }
    }
  }
}
</script>
