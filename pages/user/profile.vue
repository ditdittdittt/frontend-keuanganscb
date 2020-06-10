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
                      counter
                      :rules="[rules.toolong]"
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

              <!-- Role -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overline font-weight-bold">
                    {{ $translate('text.role') }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-uppercase">
                    {{ roleList }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <div class="spacing-small"></div>
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
      messages: '',
      user: {
        name: '',
        username: '',
        email: '',
        division: '',
        roles_list: []
      },
      edit: {
        name: false,
        username: false,
        email: false,
        division: false
      },
      input: {
        name: '',
        username: '',
        email: '',
        division: '',
        roles_list: []
      },
      rules: {
        required: (value) => !!value || `${this.$translate('text.required')}`,
        toolong: (value) =>
          value.length <= 20 ||
          `${this.$translate('alert.validation.textTooLong')} maximum 20`
      }
    }
  },
  computed: {
    roleList() {
      if (this.input.roles_list) return this.input.roles_list.join(', ')
      else return null
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
      this.user = this.$copy(this.$auth.$state.user)
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
        this.messages =
          `${this.$translate('alert.error')}` + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async updateUser() {
      try {
        const result = await this.$api('user', 'update', this.input)
        if (result.status === 200) {
          this.user = this.$copy(result.data.user)
          this.success = true
          this.messages = `${this.$translate('alert.update.success')}`
          this.alert = true
          this.getUser()
        } else {
          this.success = false
          this.messages = `${this.$translate('alert.update.error')}`
          this.alert = true
        }
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error')}` + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async logOut() {
      try {
        await this.$api('user', 'logout')
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error')}` + e.toString().slice(0, 10)
        this.alert = true
      }
    }
  }
}
</script>
<style scoped></style>
