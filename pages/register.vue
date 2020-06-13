<template>
  <v-container style="height: 100%">
    <v-row justify="center" align="center" align-content="center">
      <v-col cols="12" sm="10" md="8" lg="6" align-self="center">
        <v-card class="pa-5" flat>
          <v-card-title
            class="headline font-weight-bold text-uppercase text-center"
          >
            <v-spacer></v-spacer>
            <span>Register</span>
            <v-divider class="mx-2" vertical></v-divider>
            <span class="green--text">SCB</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-subtitle class="caption text-center"
            >Isi data dengan sebenar-benarnya</v-card-subtitle
          >
          <v-card-text>
            <v-form ref="form" aria-autocomplete="on">
              <v-row>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.name') }}
                  </div>
                  <v-text-field
                    v-model="input.name"
                    prepend-inner-icon="mdi-face"
                    solo
                    :label="preffix + generatedName"
                    type="text"
                    counter
                    :rules="[rules.required, rules.alphabetic, rules.min3]"
                    :hint="$translate('helper.name', 'capitalize')"
                    autofocus
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.username') }}
                  </div>
                  <v-text-field
                    v-model="input.username"
                    prepend-inner-icon="mdi-account"
                    solo
                    :label="preffix + generatedUsername"
                    type="text"
                    counter
                    :rules="[rules.required, rules.alphabetic, rules.min3]"
                    :hint="$translate('helper.username', 'capitalize')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.email') }}
                  </div>
                  <v-text-field
                    v-model="input.email"
                    prepend-inner-icon="mdi-email"
                    solo
                    :label="preffix + generatedEmail"
                    type="email"
                    counter
                    :rules="[rules.required, rules.min3, rules.email]"
                    :hint="$translate('helper.email', 'capitalize')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.password') }}
                  </div>
                  <v-text-field
                    v-model="input.password"
                    prepend-inner-icon="mdi-lock"
                    solo
                    :label="$translate('text.password', 'capitalize')"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    counter
                    :rules="[rules.required, rules.min6]"
                    :hint="$translate('helper.password', 'capitalize')"
                    @click:append="show = !show"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.confirm_password') }}
                  </div>
                  <v-text-field
                    v-model="input.confirm"
                    prepend-inner-icon="mdi-lock"
                    solo
                    :label="$translate('text.confirm_password', 'capitalize')"
                    :type="'password'"
                    counter
                    :rules="[rules.required, rules.confirm]"
                    :hint="$translate('helper.confirm_password', 'capitalize')"
                    @click:append="show = !show"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.division') }}
                  </div>
                  <v-text-field
                    v-model="input.division"
                    prepend-inner-icon="mdi-office-building"
                    solo
                    :label="preffix + generatedDivision"
                    type="text"
                    counter
                    :rules="[rules.required, rules.toolong, rules.min3]"
                    :hint="$translate('helper.division', 'capitalize')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <template v-if="errors != null">
              <template v-if="errors.data != null">
                <template v-if="errors.data.errors != null">
                  <template v-for="(value, key, i) in errors.data.errors">
                    <v-alert :key="'err' + i" prominent type="error" dense>
                      {{ key + ': ' + value.join(', ') }}
                    </v-alert>
                  </template>
                </template>
              </template>
            </template>
          </v-card-text>
          <v-card-actions>
            <template v-if="loading.registerUser">
              <circular-loading></circular-loading>
            </template>
            <template v-else>
              <v-btn
                large
                color="secondary"
                block
                dark
                elevation="8"
                type="submit"
                @click.stop="register()"
                >Register</v-btn
              >
            </template>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              outlined
              block
              color="primary"
              @click.stop="$router.replace('/login')"
              >Kembali Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <snackbar-alert
      v-model="alert"
      :success="success"
      :messages="messages"
    ></snackbar-alert>
  </v-container>
</template>
<script>
export default {
  layout: 'blank',
  auth: 'guest',
  filters: {
    beauty(value) {
      if (value == null || value === '') return ''
      return value.replace(/[\W_]+/g, ' ').toUpperCase()
    }
  },
  data() {
    return {
      show: false,
      alert: false,
      success: false,
      messages: '',
      loading: {
        registerUser: false
      },
      input: {
        name: null,
        username: null,
        password: null,
        confirm: null,
        email: null,
        division: null
      },
      fake: {
        name: null,
        username: null,
        email: null,
        password: null,
        division: null
      },
      user: {},
      rules: {
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`,
        confirm: (value) =>
          value === this.input.password ||
          `${this.$translate('helper.different_password', 'capitalize')}`,
        min6: (value) => (!!value && value.length >= 6) || 'Minimum 6',
        min3: (value) => (!!value && value.length >= 3) || 'Minimum 3',
        alphabetic: (value) =>
          /^[a-zA-Z0-9]+$/.test(value) ||
          `${this.$translate('alert.validation.alphabetic', 'capitalize')}`,
        email: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || `${this.$translate('helper.wrong_email', 'capitalize')}`,
        toolong: (value) =>
          value.length <= 20 ||
          `${this.$translate('alert.validation.textTooLong')} maximum 20`
      },
      errors: {
        data: {
          errors: {}
        }
      }
    }
  },
  computed: {
    preffix() {
      switch (this.$vuetify.lang.current) {
        case 'en':
          return 'ex. '
        case 'id':
          return 'contoh. '
      }
      return ''
    },
    generatedName() {
      return this.fake.name
        ? this.fake.name
        : this.$translate('text.name', 'capitalize')
    },
    generatedUsername() {
      return this.fake.username
        ? this.fake.username
        : this.$translate('text.username', 'capitalize')
    },
    generatedEmail() {
      return this.fake.email
        ? this.fake.email
        : this.$translate('text.email', 'capitalize')
    },
    generatedDivision() {
      return this.fake.division
        ? this.fake.division
        : this.$translate('text.division', 'capitalize')
    }
  },
  mounted() {
    const chance = require('chance').Chance()
    this.fake.name = chance.name({ middle: true, nationality: 'en' })
    const prohibited = ['jesus', 'allah']
    while (prohibited.some((value) => this.fake.name.includes(value))) {
      this.fake.name = chance.name({ middle: true, nationality: 'en' })
    }
    this.fake.username =
      chance.string({
        length: 4,
        casing: 'lower',
        alpha: true
      }) +
      chance.string({
        length: 2,
        numeric: true
      })
    this.fake.email = chance.email({ domain: 'example.com' })
  },
  methods: {
    async register() {
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = 'Periksa kembali data yang diinput'
        this.alert = true
        return
      }
      try {
        this.loading.registerUser = true
        const result = await this.$api('user', 'register', this.input).finally(
          () => {
            this.loading.registerUser = false
          }
        )
        if (result.status === 201) {
          this.errors.data.errors = {}
          this.success = true
          this.messages = 'User berhasil dibuat'
          this.alert = true
          this.user = this.$copy(result.data.user)
          this.user.password = this.input.password
          this.loading.registerUser = true
          this.$api('user', 'login', this.user, 'local').finally(
            () => (this.loading.registerUser = false)
          )
        }
      } catch (e) {
        this.success = false
        this.messages = 'Gagal register user'
        this.alert = true
        this.errors = e
        console.log(e)
        this.loading.registerUser = false
      }
    }
  }
}
</script>
<style scoped></style>
