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
<!--          <img src="~assets/img/logo-putih.png" style="height:60px" class="mb-4 mt-2">-->
          <h2 class="mb-1 headline font-weight-medium" style="color:white">Welcome to <span class="font-weight-bold" style="color : #F70032">SCB</span> </h2>
          <p class="mb-5" style="color:white">Please LogIn with your account</p>
        </v-container>
        <v-form>
          <v-row dense>
            <v-col class="m-0" cols="12">
              <v-text-field
                solo
                prepend-inner-icon="mdi-account"
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
              >
              </v-text-field>
            </v-col>
            <v-col v-show="errorm" cols="12">
              <v-alert type="error">
                Email atau password salah
              </v-alert>
            </v-col>
            <v-layout class="mx-1">
              <v-flex>
                <v-checkbox
                  class="my-0 py-0"
                  label="Ingat saya"
                  dense
                  dark
                  color="primary"
                ></v-checkbox>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex class="text-right">
                <nuxt-link to="/" disable style="color:white !important">Lupa Kata Sandi ?</nuxt-link>
              </v-flex>
            </v-layout>
          </v-row>
          <!-- <p style="color:white">
            Email: kipli@gmail.com
            <br>
            Kata Sandi: password
          </p> -->

          <v-btn height="50px" block big dark @click="login()" class="grad">Masuk</v-btn>
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
        email:'',
        password:'',
        errorm:false,
        showpassword:false
      }
    },
    methods:{
      async login(){
        try{
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
        } catch(e){
          console.log('Ini Error: ' + e)
          this.errorm = true
        }

      }
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
