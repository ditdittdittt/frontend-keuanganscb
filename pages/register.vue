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
            <v-form>
              <v-row>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.name') }}
                  </div>
                  <v-text-field
                    v-model="input.name"
                    prepend-inner-icon="mdi-face"
                    solo
                    :label="$translate('text.name', 'capitalize')"
                    counter
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
                    :label="$translate('text.username', 'capitalize')"
                    counter
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
                    :label="$translate('text.name', 'capitalize')"
                    type="email"
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
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.division') }}
                  </div>
                  <v-text-field
                    v-model="input.division"
                    prepend-inner-icon="mdi-office-building"
                    solo
                    :label="$translate('text.division', 'capitalize')"
                    type="text"
                    counter
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-capitalize">
                    {{ $translate('text.position') }}
                  </div>
                  <v-text-field
                    v-model="input.position"
                    prepend-inner-icon="mdi-briefcase"
                    solo
                    :label="$translate('text.position', 'capitalize')"
                    type="text"
                    counter
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="caption primary--text text-uppercase">
                    {{ $translate('text.nik') }}
                  </div>
                  <v-text-field
                    v-model="input.nik"
                    prepend-inner-icon="mdi-card-account-details"
                    solo
                    :label="$translate('text.nik', 'uppercase')"
                    type="number"
                    counter
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
                    counter
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn large color="secondary" block dark elevation="8"
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
  </v-container>
</template>
<script>
export default {
  layout: 'blank',
  data() {
    return {
      show: false,
      input: {
        name: null,
        username: null,
        email: null,
        division: null,
        position: null,
        nik: null,
        address: null
      }
    }
  },
  methods: {
    async register() {
      try {
        await this.$api('user', 'register', this.input)
      } catch (e) {}
    }
  }
}
</script>
<style scoped></style>
