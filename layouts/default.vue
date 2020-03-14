<template>
  <v-app>
    <!-- Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <template v-slot:prepend>
        <v-list-item class="pt-2">
          <v-container text-center>
            <img src="~assets/img/Logo-SCB_Hitam.png" style="height:40px">
          </v-container>
        </v-list-item>
      </template>
      <v-list
        rounded
      >
        <nested-list :nodes="items" :parent="''" :level="0"/>
      </v-list>

    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar
      fixed
      app
      elevate-on-scroll
    >
      <v-app-bar-nav-icon color="#008080" @click.stop="drawer = !drawer" />
      <v-spacer/>

      <v-toolbar-title class="pa-0 font-weight-light">{{title}}</v-toolbar-title>
      <img src="~assets/img/logo.png" style="height:30px">
      <v-spacer/>
      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            height="40px"
            width="40px"
            fab
          >
            <v-avatar height="40px" width="40px">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-avatar>
          </v-btn>

          <!-- <v-btn
            text
            fab
            v-on="on"
          >
          </v-btn> -->
        </template>

        <v-card
          max-width="300px"
        >
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{this.$auth.user.name}}</v-list-item-title>
                <v-list-item-subtitle>{{this.$auth.user.role}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-card-text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, pariatur.
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="menu = false" disabled small>Edit Profile</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" small text @click="$auth.logout()">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- Konten -->
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
  import NestedList from '~/components/NestedList.vue'

  export default {
    components : {
      NestedList,
    },
    data () {
      return {
        items: [
          {
            icon: 'mdi-view-dashboard',
            title: 'Dashboard',
            to: '/',
          },
          {
            icon: 'mdi-folder',
            title: 'Request Form',
            to: '/requestform',
          },
          {
            icon: 'mdi-clipboard-check',
            title: 'Submission Form',
            to: '/submissionform',
          },
          {
            icon: 'mdi-school',
            title: 'Petty Cash Form',
            to: '/pettycashform',
          },
        ],
      }
    },
    computed:{
      title:{
        get(){
          return this.$store.state.currentPageTitle
        },
        set(value){
          this.$store.commit('setCurrentPageTitle', value)
        }
      },
      drawer:{
        get(){
          return this.$store.state.drawer
        },
        set(value){
          this.$store.commit('setDrawer', value)
        }
      }

    },
    watch: {
      $route() {
        this.title = this.$store.state.currentPageTitle
        this.single = this.$store.state.singlePage
      }
    },
  }
</script>
<style scoped>
  .bg{
    /*background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url( ~assets/img/bg.jpg) no-repeat center center;*/
    background-size: cover;
  }
</style>
