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
          <v-card-subtitle class="caption text-center"
            >Masukan akun yang telah terdaftar</v-card-subtitle
          >
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.email') }}
                  </div>
                  <v-text-field
                    v-model="input.email"
                    prepend-inner-icon="mdi-account"
                    solo
                    :label="$translate('text.email', 'capitalize')"
                    counter
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
                    @click:append="show = !show"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              large
              color="secondary"
              block
              dark
              elevation="8"
              @click.stop="login()"
              >Login</v-btn
            >
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
      show: false,
      input: {
        email: null,
        password: null
      }
    }
  },
  mounted() {},
  methods: {
    async login() {
      try {
        await this.$api('user', 'login', this.input)
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
