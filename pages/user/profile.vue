<template>
  <v-container>
    <v-card raised>
      <v-row justify="center" class="ma-0">
        <v-col cols="12">
          <v-form ref="form">
            <v-list two-line subheader>
              <v-subheader class="primary--text caption text-capitalize">
                {{ $translate('text.account') }}
                <v-spacer></v-spacer>
                <v-btn small icon color="primary">
                  <v-icon dense>mdi-help-circle-outline</v-icon>
                </v-btn>
              </v-subheader>
              <v-divider></v-divider>
              <!-- Name -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overline font-weight-bold">
                    <v-badge
                      :value="different(user.name, input.name)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.name') }}</v-badge
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-if="!edit.name"
                    class="text-capitalize"
                    >{{ input.name }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.name"
                      dense
                      :type="'text'"
                      autofocus
                      solo
                      :placeholder="$translate('text.name', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.name"
                    text
                    small
                    @click.stop="edit.name = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    dark
                    color="secondary"
                    small
                    @click.stop="edit.name = false"
                    >{{ $translate('components.button.done') }}</v-btn
                  >
                </v-list-item-action>
              </v-list-item>

              <!-- Username -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overline font-weight-bold">
                    <v-badge
                      :value="different(user.username, input.username)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.username') }}</v-badge
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="!edit.username">
                    {{ input.username }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.username"
                      dense
                      :type="'text'"
                      autofocus
                      solo
                      :placeholder="$translate('text.username', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.username"
                    text
                    small
                    @click.stop="edit.username = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    dark
                    color="secondary"
                    small
                    @click.stop="edit.username = false"
                    >{{ $translate('components.button.done') }}</v-btn
                  >
                </v-list-item-action>
              </v-list-item>

              <!-- Email -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overline font-weight-bold">
                    <v-badge
                      :value="different(user.email, input.email)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.email') }}</v-badge
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="!edit.email">
                    {{ input.email }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.email"
                      dense
                      :type="'email'"
                      autofocus
                      solo
                      :placeholder="$translate('text.email', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.email"
                    text
                    small
                    @click.stop="edit.email = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    dark
                    color="secondary"
                    small
                    @click.stop="edit.email = false"
                    >{{ $translate('components.button.done') }}</v-btn
                  >
                </v-list-item-action>
              </v-list-item>

              <div class="spacing-small"></div>
              <v-subheader class="primary--text caption text-capitalize">
                {{ $translate('text.job') }}
                <v-spacer></v-spacer>
                <v-btn small icon color="primary">
                  <v-icon dense>mdi-help-circle-outline</v-icon>
                </v-btn>
              </v-subheader>
              <v-divider></v-divider>

              <!-- Division -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overline font-weight-bold">
                    <v-badge
                      :value="different(user.division, input.division)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.division') }}</v-badge
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-if="!edit.division"
                    class="text-capitalize"
                    >{{ input.division }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.division"
                      dense
                      :type="'text'"
                      autofocus
                      solo
                      :placeholder="$translate('text.division', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.division"
                    text
                    small
                    @click.stop="edit.division = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    dark
                    color="secondary"
                    small
                    @click.stop="edit.division = false"
                    >{{ $translate('components.button.done') }}</v-btn
                  >
                </v-list-item-action>
              </v-list-item>

              <!-- Position -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overline font-weight-bold">
                    <v-badge
                      :value="different(user.position, input.position)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.position') }}</v-badge
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-if="!edit.position"
                    class="text-capitalize"
                    >{{ input.position }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.position"
                      dense
                      :type="'text'"
                      autofocus
                      solo
                      :placeholder="$translate('text.position', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.position"
                    text
                    small
                    @click.stop="edit.position = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    dark
                    color="secondary"
                    small
                    @click.stop="edit.position = false"
                    >{{ $translate('components.button.done') }}</v-btn
                  >
                </v-list-item-action>
              </v-list-item>

              <div class="spacing-small"></div>
              <v-subheader class="primary--text caption text-capitalize">
                {{ $translate('text.additional_information') }}
                <v-spacer></v-spacer>
                <v-btn small icon color="primary">
                  <v-icon dense>mdi-help-circle-outline</v-icon>
                </v-btn>
              </v-subheader>
              <v-divider></v-divider>

              <!-- NIK -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overline font-weight-bold">
                    <v-badge
                      :value="different(user.nik, input.nik)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.nik') }}</v-badge
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="!edit.nik">
                    {{ input.nik }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.nik"
                      dense
                      :type="'number'"
                      autofocus
                      solo
                      :placeholder="$translate('text.nik', 'uppercase')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.nik"
                    text
                    small
                    @click.stop="edit.nik = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    dark
                    color="secondary"
                    small
                    @click.stop="edit.nik = false"
                    >{{ $translate('components.button.done') }}</v-btn
                  >
                </v-list-item-action>
              </v-list-item>

              <!-- Address -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overline font-weight-bold">
                    <v-badge
                      :value="different(user.address, input.address)"
                      dot
                      color="red"
                      :offset-x="-4"
                      :offset-y="8"
                      >{{ $translate('text.address') }}</v-badge
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="!edit.address">
                    {{ input.address }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.address"
                      dense
                      :type="'text'"
                      autofocus
                      solo
                      :placeholder="$translate('text.address', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.address"
                    text
                    small
                    @click.stop="edit.address = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    dark
                    color="secondary"
                    small
                    @click.stop="edit.address = false"
                    >{{ $translate('components.button.done') }}</v-btn
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-form>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col>
              <v-btn color="accent" block @click.stop="reset()">
                {{ $translate('components.button.reset') }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn dark color="secondary" block @click.stop="updateUser()">
                {{ $translate('components.button.save') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <div class="spacing-small"></div>
    <v-card raised>
      <v-card-actions class="pa-0">
        <v-btn block color="accent" x-large @click="logOut()">
          {{ $translate('components.button.logout') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="spacing-medium"></div>
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
      user: {
        name: '',
        username: '',
        email: '',
        division: '',
        position: '',
        nik: '',
        address: ''
      },
      edit: {
        name: false,
        username: false,
        email: false,
        division: false,
        position: false,
        nik: false,
        address: false
      },
      input: {
        name: '',
        username: '',
        email: '',
        division: '',
        position: '',
        nik: '',
        address: ''
      },
      rules: {
        required: (value) => !!value || `${this.$translate('text.required')}`
      }
    }
  },
  mounted() {
    this.initValue()
    this.getUser()
  },
  methods: {
    different(a, b) {
      return a !== b
    },
    initValue() {
      this.user = this.$auth.$state.user
      this.input = this.$copy(this.user)
    },
    reset() {
      this.input = this.$copy(this.user)
    },
    async getUser() {
      try {
        await this.$api('user', 'show')
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async updateUser() {
      try {
        await this.$api('user', 'update')
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async logOut() {
      try {
        await this.$api('user', 'logout')
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
