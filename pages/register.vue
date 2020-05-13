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
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
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
                    :rules="[rules.required, rules.email]"
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
                    :rules="[rules.required, rules.min]"
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
                    :rules="[rules.required]"
                    :hint="$translate('helper.division', 'capitalize')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.role') }}
                  </div>
                  <v-select
                    v-model="input.role"
                    prepend-inner-icon="mdi-briefcase"
                    solo
                    :label="$translate('text.role', 'capitalize')"
                    cache-items
                    item-text="name"
                    item-value="name"
                    :items="roles"
                    counter
                    :rules="[rules.required]"
                    :hint="$translate('helper.role', 'capitalize')"
                    @keyup.enter="register()"
                  >
                    <template v-slot:selection="{ item }">
                      <span>{{ item.name | beauty }}</span>
                    </template>
                    <template v-slot:item="{ item }">
                      <span>{{ item.name | beauty }}</span>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-uppercase">
                    {{ $translate('text.nik') }}
                  </div>
                  <v-text-field
                    v-model="input.nik"
                    prepend-inner-icon="mdi-card-account-details"
                    solo
                    :label="preffix + generatedNIK"
                    type="number"
                    counter
                    :rules="[]"
                    :hint="$translate('helper.nik', 'capitalize')"
                    @keyup.enter="register()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.address') }}
                  </div>
                  <v-textarea
                    v-model="input.address"
                    solo
                    type="text"
                    :label="preffix + generatedAddress"
                    counter
                    :rules="[]"
                    :hint="$translate('helper.address', 'capitalize')"
                    @keyup.enter="register()"
                  ></v-textarea>
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
              type="submit"
              @click.stop="register()"
              >Register</v-btn
            >
          </v-card-actions>
          <v-card-actions>
            <v-btn outlined block color="primary" @click.stop="$router.go(-1)"
              >Kembali</v-btn
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
      input: {
        name: null,
        username: null,
        password: null,
        confirm: null,
        email: null,
        division: null,
        role: null,
        nik: null,
        address: null
      },
      fake: {
        name: null,
        username: null,
        email: null,
        password: null,
        division: null,
        role: null,
        nik: null,
        address: null
      },
      roles: [],
      rules: {
        required: (value) =>
          !!value || `${this.$translate('text.required', 'capitalize')}`,
        confirm: (value) =>
          value === this.input.password ||
          `${this.$translate('helper.different_password', 'capitalize')}`,
        min: (value) => (!!value && value.length >= 6) || 'Minimum 6',
        email: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || `${this.$translate('helper.wrong_email', 'capitalize')}`
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
    },
    generatedNIK() {
      return this.fake.nik
        ? this.fake.nik
        : this.$translate('text.nik', 'uppercase')
    },
    generatedAddress() {
      return this.fake.address
        ? this.fake.address
        : this.$translate('text.address', 'capitalize')
    }
  },
  mounted() {
    const chance = require('chance').Chance()
    this.fake.name = chance.name({ middle: true, nationality: 'en' })
    // Change the name if contains prohibited word
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
    this.fake.nik = chance.string({ length: 16, numeric: true })
    this.fake.address = chance.address() + ' ' + chance.province({ full: true })

    // Get all available roles
    this.getRoles()
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
        await this.$api('user', 'register', this.input)
      } catch (e) {
        this.success = false
        this.messages = 'Gagal register user'
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
        this.messages = 'Gagal menampilkan daftar peran user'
        this.alert = true
      }
    }
  }
}
</script>
<style scoped></style>
