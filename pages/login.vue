<template>
  <v-container style="height: 100%">
    <v-row
      justify="center"
      align="center"
      align-content="center"
      style="height: 100%"
    >
      <v-col cols="12" sm="10" md="8" lg="6" align-self="center">
        <v-card class="pa-5" flat>
          <v-card-title
            class="headline font-weight-bold text-uppercase text-center"
          >
            <v-spacer></v-spacer>
            <span>Login</span>
            <v-divider class="mx-2" vertical></v-divider>
            <span class="green--text">SCB</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-subtitle class="caption text-center">
            <div class="pt-5">
              Masukan akun yang telah terdaftar di sistem ini.
            </div>
          </v-card-subtitle>
          <v-card-text>
            <v-radio-group v-model="way" row hide-details dense>
              <v-radio value="email">
                <template v-slot:label>
                  <span class="caption">Email</span>
                </template>
              </v-radio>
              <v-radio value="username">
                <template v-slot:label>
                  <span class="caption">Username</span>
                </template>
              </v-radio>
            </v-radio-group>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <template v-if="way === 'email'">
                    <div class="caption primary--text text-capitalize py-1">
                      {{ $translate('text.email') }}
                    </div>
                    <v-text-field
                      v-model="input.email"
                      prepend-inner-icon="mdi-email"
                      solo
                      :label="$translate('text.email', 'capitalize')"
                      counter
                      :rules="[rules.required, rules.email]"
                      @keyup.enter="login()"
                    ></v-text-field>
                  </template>
                  <template v-if="way === 'username'">
                    <div class="caption primary--text text-capitalize py-1">
                      {{ $translate('text.username') }}
                    </div>
                    <v-text-field
                      v-model="input.username"
                      prepend-inner-icon="mdi-account"
                      solo
                      :label="$translate('text.username', 'capitalize')"
                      counter
                      :rules="[rules.required, rules.min3, rules.username]"
                      @keyup.enter="login()"
                    ></v-text-field>
                  </template>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize py-1">
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
                    :rules="[rules.required, rules.min]"
                    @click:append="show = !show"
                    @keyup.enter="login()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    Login dengan menggunakan ?
                  </div>
                  <v-radio-group v-model="strategy" row hide-details dense>
                    <!--
                      Code dibawah ini digunakan untuk mengaktifkan
                      Single Sign On dari website SCB. Hanya saja, fitur
                      itu belum bisa diimplementasikan dengan benar karena
                        1. package @nuxt/auth masih belum menjelaskan
                           dengan detail bagaimana cara membuat custom
                           SSO. Sejauh ini, file yg sudah dicoba di buat
                           ada di ~/scheme/ssoStrategy.js
                        2. SSO dari website utama SCB tidak memberikan
                           kemampuan redirect url, sehingga sulit untuk
                           mengontrol session
                    -->
                    <!-- <v-radio value="sso">
                      <template v-slot:label>
                        <span class="caption">Akun Single Sign On SCB</span>
                      </template>
                    </v-radio> -->
                    <v-radio value="local">
                      <template v-slot:label>
                        <span class="caption">Akun Sistem Keuangan SCB</span>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
            <v-alert v-if="numTries > 2" prominent type="warning">
              <span style="color: #fefefe">{{
                $translate('helper.login_keep_fail')
              }}</span>
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <template v-if="loading.logIn">
              <circular-loading></circular-loading>
            </template>
            <template v-else>
              <v-btn
                large
                color="secondary"
                block
                dark
                elevation="8"
                @click.stop="login()"
                >Login</v-btn
              >
            </template>
          </v-card-actions>
          <v-card-text class="text-center">
            <span class="caption">
              Jika belum memiliki akun, silahkan daftar terlebih dahulu dengan
              menekan tombol register di bawah ini.
            </span>
          </v-card-text>
          <v-card-actions>
            <v-btn outlined block color="primary" :to="'/register'"
              >Register</v-btn
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
  data() {
    return {
      alert: false,
      success: false,
      messages: '',
      way: 'email',
      numTries: 0,
      loading: {
        logIn: false
      },
      strategy: 'local',
      show: false,
      input: {
        email: null,
        password: null
      },
      rules: {
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`,
        username: (value) =>
          /^[a-zA-Z0-9_-]+$/.test(value) ||
          `${this.$translate('alert.validation.alphabetic', 'capitalize')}`,
        min: (value) => (!!value && value.length >= 6) || 'Minimum 6',
        min3: (value) => (!!value && value.length >= 3) || 'Minimum 3',
        email: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || `${this.$translate('helper.wrong_email', 'capitalize')}`
      }
    }
  },
  methods: {
    async login() {
      if (this.strategy == null) this.strategy = 'local'
      if (!this.$refs.form.validate()) {
        this.success = false
        this.messages = `${this.$translate(
          'alert.login.warning',
          'capitalize'
        )}`
        this.alert = true
        return
      }
      try {
        this.loading.logIn = true
        this.numTries++
        await this.$api('user', 'login', this.input, this.strategy).finally(
          () => (this.loading.logIn = false)
        )
      } catch (e) {
        this.success = false
        this.messages =
          `${this.$translate('alert.error')}` + e.data.error.toString()
        this.alert = true
        this.loading.logIn = false
      }
    }
  }
}
</script>
<style scoped></style>
