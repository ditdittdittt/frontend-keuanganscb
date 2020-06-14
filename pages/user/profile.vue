<template>
  <v-container>
    <v-card raised>
      <v-row justify="center" class="ma-0">
        <v-col cols="12">
          <v-form ref="form" v-model="valid">
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
                  <v-list-item-subtitle v-if="!edit.name" class="py-2">{{
                    input.name
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.name"
                      dense
                      :type="'text'"
                      autofocus
                      :rules="[rules.required, rules.min3, rules.alphabetic]"
                      :placeholder="$translate('text.name', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.name"
                    text
                    small
                    :disabled="!valid"
                    @click.stop="edit.name = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    color="secondary"
                    small
                    :disabled="!valid"
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
                  <v-list-item-subtitle v-if="!edit.username" class="py-2">
                    {{ input.username }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.username"
                      dense
                      :type="'text'"
                      autofocus
                      :rules="[rules.required, rules.min3, rules.username]"
                      :placeholder="$translate('text.username', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.username"
                    text
                    small
                    :disabled="!valid"
                    @click.stop="edit.username = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    color="secondary"
                    small
                    :disabled="!valid"
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
                  <v-list-item-subtitle v-if="!edit.email" class="py-2">
                    {{ input.email }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.email"
                      dense
                      :type="'email'"
                      autofocus
                      :rules="[rules.required, rules.min3, rules.email]"
                      :placeholder="$translate('text.email', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.email"
                    text
                    small
                    :disabled="!valid"
                    @click.stop="edit.email = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    color="secondary"
                    small
                    :disabled="!valid"
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
                  <v-list-item-subtitle v-if="!edit.division" class="py-2">{{
                    input.division
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    <v-text-field
                      v-model="input.division"
                      dense
                      :type="'text'"
                      autofocus
                      counter
                      :rules="[rules.required, rules.toolong, rules.min3]"
                      :placeholder="$translate('text.division', 'capitalize')"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!edit.division"
                    text
                    small
                    :disabled="!valid"
                    @click.stop="edit.division = true"
                    >Edit</v-btn
                  >
                  <v-btn
                    v-else
                    color="secondary"
                    small
                    :disabled="!valid"
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
                  <v-list-item-subtitle class="text-uppercase py-2">
                    {{ roleList }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <div class="spacing-small"></div>
            </v-list>
          </v-form>
        </v-col>
        <v-col cols="12">
          <template v-if="loading.updateProfile">
            <circular-loading></circular-loading>
          </template>
          <template v-else>
            <v-row>
              <v-col>
                <v-btn color="accent" block @click.stop="reset()">
                  {{ $translate('components.button.reset') }}
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  color="secondary"
                  block
                  :disabled="notInEdit"
                  @click.stop="updateUser()"
                >
                  {{ $translate('components.button.save') }}
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>
    </v-card>
    <div class="spacing-small"></div>
    <template v-if="loading.logOut">
      <circular-loading></circular-loading>
    </template>
    <template v-else>
      <v-card raised>
        <v-card-actions class="pa-0">
          <v-btn block color="accent" x-large @click="logOut()">
            {{ $translate('components.button.logout') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
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
      loading: {
        logOut: false,
        updateProfile: false
      },
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
      valid: false,
      rules: {
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`,
        confirm: (value) =>
          value === this.input.password ||
          `${this.$translate('helper.different_password', 'capitalize')}`,
        min6: (value) => (!!value && value.length >= 6) || 'Minimum 6',
        min3: (value) => (!!value && value.length >= 3) || 'Minimum 3',
        alphabetic: (value) =>
          /^[a-zA-Z0-9\s]+$/.test(value) ||
          `${this.$translate('alert.validation.alphabetic', 'capitalize')}`,
        username: (value) =>
          /^[a-zA-Z0-9_-]+$/.test(value) ||
          `${this.$translate('alert.validation.alphabetic', 'capitalize')}`,
        email: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || `${this.$translate('helper.wrong_email', 'capitalize')}`,
        toolong: (value) =>
          (!!value && value.length <= 20) ||
          `${this.$translate('alert.validation.textTooLong')} maximum 20`
      }
    }
  },
  computed: {
    roleList() {
      if (this.input.roles_list) return this.input.roles_list.join(', ')
      else return null
    },
    notInEdit() {
      return (
        this.edit.name ||
        this.edit.username ||
        this.edit.email ||
        this.edit.division
      )
    }
  },
  mounted() {
    this.initValue()
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
    async updateUser() {
      try {
        this.loading.updateProfile = true
        const result = await this.$api(
          'user',
          'update',
          this.input,
          this.user
        ).finally(() => {
          this.loading.updateProfile = false
        })
        if (result.status === 200) {
          const tmpRoles = this.$copy(this.user.roles_list)
          this.user = this.$copy(result.data.user)
          this.user.roles_list = this.$copy(tmpRoles)
          this.success = true
          this.messages = `${this.$translate('alert.update.success')}`
          this.alert = true
        } else {
          this.success = false
          this.messages = `${this.$translate('alert.update.error')}`
          this.alert = true
        }
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
        this.loading.updateProfile = false
      }
    },
    logOut() {
      try {
        this.loading.logOut = true
        this.$api('user', 'logout').finally(() => (this.loading.logOut = false))
      } catch (e) {
        this.success = false
        this.messages = `${this.$translate('alert.error')}` + e.toString()
        this.alert = true
        this.loading.logOut = true
      }
    }
  }
}
</script>
<style scoped></style>
