<template>
  <v-container
    fluid fill-height grid-list-md text-xs-center class="bg"
  >
    <v-layout row wrap align-center justify-center>
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-container text-center>
          <img src="~assets/img/Logo-SCB_Hitam.png" style="height:60px" class="mb-4 mt-2">
          <h2 class="mb-1 headline font-weight-medium" style="color:white">Welcome to <span class="font-weight-bold" style="color : #F70032">SCB</span> </h2>
          <p class="mb-5" style="color:white">Please Register</p>
        </v-container>
        <v-form>
          <v-row dense>
            <v-col class="m-0" cols="12">
              <v-text-field
                solo
                prepend-inner-icon="mdi-account"
                v-model="name"
                hide-details
                label="Nama"
                class="mb-3"
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-email"
                v-model="email"
                hide-details
                label="Email"
                class="mb-3"
              ></v-text-field>
              <v-text-field
                v-model="password"
                hide-details
                solo
                prepend-inner-icon="mdi-key"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                label="Kata Sandi"
                @click:append="showpassword = !showpassword"
                v-on:keyup.enter="login()"
                class="mb-3"
              >
              </v-text-field>
              <v-text-field
                v-model="c_password"
                hide-details
                solo
                prepend-inner-icon="mdi-key"
                :append-icon="showcpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showcpassword ? 'text' : 'password'"
                label="Konfirmasi Kata Sandi"
                @click:append="showcpassword = !showcpassword"
                v-on:keyup.enter="login()"
                class="mb-3"
              >
              </v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-account-multiple"
                v-model="division"
                hide-details
                label="Divisi"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col v-show="errorm" cols="12">
              <v-alert type="error">
                Error alert
              </v-alert>
            </v-col>

          </v-row>

          <v-btn height="50px" block big dark @click="register()" class="grad">Daftar</v-btn>
        </v-form>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    layout: 'blank',
    auth: 'guest',
    data(){
      return{
        name:'',
        email:'',
        password:'',
        c_password:'',
        division:'',
        errorm:false,
        showpassword:false,
        showcpassword: false,
      }
    },
    methods: {
      register() {
        const body = new FormData();
        body.append('name', this.name)
        body.append('email', this.email)
        body.append('password', this.password)
        body.append('c_password', this.c_password)
        body.append('division', this.division)
        this.$axios({
          method: 'post',
          url: 'auth/register',
          data: body
        })
        .then( response => {
          console.log(response);
        })
        .catch( function(error) {
          console.log(error)
        })
        .finally(
          () => this.$router.push('/')
        )
      }
    },
    mounted() {
      this.$store.commit('setCurrentPageTitle', 'Register')
    }
  }
</script>
<style>
  .bg{
    /*background: linear-gradient(0deg, rgba(0, 0, 0, 0.425), rgba(0, 0, 0, 0.623)), url(~assets/img/bg.jpg) no-repeat center center;*/
    background-size: cover;
  }
  body{
    overflow: hidden;
  }
</style>
