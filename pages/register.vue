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
          <h2 class="mb-1 headline font-weight-medium" style="color:black">Welcome to <span class="font-weight-bold" style="color : #008080">SCB</span> </h2>
          <p class="mb-5" style="color:black">Please Register</p>
        </v-container>
        <v-form
          lazy-validation
          ref="registerForm"
          v-model="registerFormModel"
        >
          <v-row dense>
            <v-col class="m-0" cols="12">
              <v-text-field
                solo
                prepend-inner-icon="mdi-account"
                v-model="name"
                :rules="nameRules"
                label="Nama"
                class="mb-3"
                required
              ></v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-email"
                v-model="email"
                label="Email"
                class="mb-3"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                solo
                prepend-inner-icon="mdi-key"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                label="Kata Sandi"
                @click:append="showpassword = !showpassword"
                v-on:keyup.enter="login()"
                class="mb-3"
                required
                :rules="passwordRules"
              >
              </v-text-field>
              <v-text-field
                v-model="c_password"
                solo
                prepend-inner-icon="mdi-key"
                :append-icon="showcpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showcpassword ? 'text' : 'password'"
                label="Konfirmasi Kata Sandi"
                @click:append="showcpassword = !showcpassword"
                v-on:keyup.enter="login()"
                class="mb-3"
                :rules="c_passwordRules"
                required
              >
              </v-text-field>
              <v-text-field
                solo
                prepend-inner-icon="mdi-account-multiple"
                v-model="division"
                label="Divisi"
                class="mb-3"
                :rules="divisionRules"
                required
              ></v-text-field>
            </v-col>

            <v-col v-show="errorm" cols="12">
              <v-alert type="error">
                {{ errorMessage }}
              </v-alert>
            </v-col>

          </v-row>

          <v-btn height="50px" block big dark @click="register()" class="grad" color="#008080">Daftar</v-btn>
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
        registerFormModel: true,
        name:'',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email:'',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password:'',
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Password must be more than 8 characters',
        ],
        c_password:'',
        c_passwordRules: [
          v => !!v || 'Confirm Password is required',
          v => (v && v.length >= 8) || 'Confirm Password must be more than 8 characters',
          v => (v && v === this.password) || 'Confirm Password wrong'
        ],
        errorMessage: '',
        division:'',
        divisionRules: [
          v => !!v || 'Division is required'
        ],
        errorm:false,
        showpassword:false,
        showcpassword: false,
      }
    },
    methods: {
      register() {
        if(this.$refs.registerForm.validate()){
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
            .catch( error => {
              console.log(error.response)
              if(error.response.status === 422){
                if(error.response.data.errors.email) {
                  this.errorMessage = error.response.data.errors.email[0]
                }
              }
              this.errorm = true
            })
          .finally(() => {
            if (this.errorm === false) {
              this.$router.push('/')
            }
          })
        }
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
