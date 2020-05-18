<template>
  <v-theme-provider>
    <v-app>
      <v-navigation-drawer v-model="drawer" temporary app color="accent">
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="3">
              <logo />
            </v-col>
            <v-col cols="7" class="white--text">
              <span class="font-weight-bold overline"
                >Sekolah Cendekia Baznas</span
              >
            </v-col>
          </v-row>
        </v-container>
        <v-divider class="grey lighten-1 mx-4"></v-divider>
        <v-list dense nav dark flat>
          <v-list-item
            v-for="(item, i) in menu"
            :key="i"
            active-class="primary"
            color="white"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-light">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-navigation-drawer v-model="theme" temporary app right>
        <v-container>
          <v-list dense>
            <v-list-item>
              <v-list-item-title
                class="caption font-weight-black text-capitalize"
                >{{ $translate('text.setting') }}</v-list-item-title
              >
              <v-btn class="mx-1" icon x-small @click.stop="$router.go(0)">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
              <v-btn class="mx-1" icon x-small @click.stop="theme = !theme">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title class="caption pa-0 text-capitalize">
                {{ $translate('text.theme') }}
              </v-list-item-title>
            </v-list-item>
            <v-container class="py-0">
              <v-switch
                v-model="preferences.theme.darkMode"
                color="primary"
                inset
                dense
                class="ma-0"
              >
                <template v-slot:label>
                  <div class="caption">
                    {{
                      preferences.theme.darkMode
                        ? $translate('text.dark', 'capitalize')
                        : $translate('text.light', 'capitalize')
                    }}
                  </div>
                </template>
              </v-switch>
            </v-container>
            <v-list-item>
              <v-list-item-title class="caption pa-0 text-capitalize">
                {{ $translate('text.language') }}
              </v-list-item-title>
            </v-list-item>
            <v-container class="py-0">
              <v-radio-group v-model="preferences.lang" row class="ma-0">
                <v-radio value="en">
                  <template v-slot:label>
                    <div class="caption">English</div>
                  </template>
                </v-radio>
                <v-radio value="id">
                  <template v-slot:label>
                    <div class="caption">Indonesia</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-container>
            <v-list-item>
              <v-list-item-title
                class="caption font-weight-black text-capitalize"
                >{{ $translate('text.color') }}</v-list-item-title
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title class="caption pa-0 text-capitalize">
                {{ $translate('text.primary') }}
              </v-list-item-title>
            </v-list-item>
            <v-container class="px-5">
              <v-item-group v-model="preferences.theme.color.primary" mandatory>
                <v-row>
                  <v-col
                    v-for="color in colors"
                    :key="color"
                    cols="3"
                    class="pa-0 my-2"
                  >
                    <v-item v-slot:default="{ active, toggle }" :value="color">
                      <v-card
                        class="mx-1"
                        :style="{
                          border: '2px solid',
                          borderColor: active ? 'black' : 'transparent'
                        }"
                        height="30"
                        :color="color"
                        @click.native="toggle"
                      ></v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>
            </v-container>
            <v-list-item>
              <v-list-item-title class="caption pa-0 text-capitalize">
                {{ $translate('text.secondary') }}
              </v-list-item-title>
            </v-list-item>
            <v-container class="px-5">
              <v-item-group
                v-model="preferences.theme.color.secondary"
                mandatory
              >
                <v-row>
                  <v-col
                    v-for="color in colors"
                    :key="color"
                    cols="3"
                    class="pa-0 my-2"
                  >
                    <v-item v-slot:default="{ active, toggle }" :value="color">
                      <v-card
                        class="mx-1"
                        :style="{
                          border: '2px solid',
                          borderColor: active ? 'black' : 'transparent'
                        }"
                        height="30"
                        :color="color"
                        @click.native="toggle"
                      ></v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>
            </v-container>
            <v-list-item>
              <v-list-item-title class="caption pa-0 text-capitalize">
                {{ $translate('text.accent') }}
              </v-list-item-title>
            </v-list-item>
            <v-container class="px-5">
              <v-item-group v-model="preferences.theme.color.accent" mandatory>
                <v-row>
                  <v-col
                    v-for="color in colors"
                    :key="color"
                    cols="3"
                    class="pa-0 my-2"
                  >
                    <v-item v-slot:default="{ active, toggle }" :value="color">
                      <v-card
                        class="mx-1"
                        :style="{
                          border: '2px solid',
                          borderColor: active ? 'black' : 'transparent'
                        }"
                        height="30"
                        :color="color"
                        @click.native="toggle"
                      ></v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>
            </v-container>
          </v-list>
        </v-container>
      </v-navigation-drawer>
      <v-app-bar dark color="primary" class="px-1" fixed>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-spacer></v-spacer>
        <span class="caption">{{ pageName }}</span>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="secondary"
          :to="'/user/profile'"
          class="mx-2"
          active-class="accent"
        >
          <v-icon small>mdi-account</v-icon>
        </v-btn>
        <v-btn small color="secondary" @click.stop="theme = !theme">
          <v-icon small>mdi-cog</v-icon>
        </v-btn>
      </v-app-bar>
      <v-content>
        <div class="spacing-medium"></div>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </v-app>
  </v-theme-provider>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      title: 'Keuangan',

      // Sidebar controller
      drawer: false,
      theme: false,

      // Preferences theme
      preferences: {
        // Language choosen
        lang: 'en',
        theme: {
          // Theme mode
          darkMode: false,

          // Color handler
          color: {
            primary: '#3f51b5',
            secondary: '#3f51b5',
            accent: '#3f51b5',
            error: '#f44336',
            warning: '#ffc107',
            info: '#2196f3',
            success: '#4caf50'
          }
        }
      },

      // List color for theme
      colors: [
        '#3f51b5',
        '#4caf50',
        '#8bc34a',
        '#009688',
        '#e91e63',
        '#673ab7',
        '#ff9800',
        '#607d8b',
        '#795548',
        '#00bcd4'
      ],

      // Drawer menu
      menu: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-newspaper-plus',
          title: 'Form Request',
          to: '/form/request'
        },
        {
          icon: 'mdi-newspaper-variant',
          title: 'Form Submission',
          to: '/form/submission'
        },
        {
          icon: 'mdi-cash',
          title: 'Form Petty Cash',
          to: '/form/petty'
        },
        {
          icon: 'mdi-newspaper',
          title: 'All Request',
          to: '/all/request'
        },
        {
          icon: 'mdi-newspaper-variant-multiple',
          title: 'All Submission',
          to: '/all/submission'
        },
        {
          icon: 'mdi-cash-multiple',
          title: 'All Petty',
          to: '/all/petty'
        },
        {
          icon: 'mdi-cash-usd',
          title: 'Management Budget',
          to: '/management/budget'
        },
        {
          icon: 'mdi-account-details',
          title: 'Management User',
          to: '/management/user'
        },
        {
          icon: 'mdi-bank',
          title: 'Management Bank',
          to: '/management/bank'
        }
      ]
    }
  },
  computed: {
    lang() {
      return this.preferences.lang
    },
    pageName() {
      if (!this.$route.name) return ''
      return this.$route.name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .splice(0, 2)
        .join(' ')
    }
  },
  watch: {
    'preferences.lang'(value) {
      this.$vuetify.lang.current = value
      this.savePreferences()
    },
    // watch changes in dark theme mode
    'preferences.theme.darkMode'(value) {
      this.$vuetify.theme.dark = value
      this.savePreferences()
    },

    // watch changes in primary color
    'preferences.theme.color.primary'(value) {
      this.$vuetify.theme.themes.dark.primary = value
      this.$vuetify.theme.themes.light.primary = value
      this.savePreferences()
    },

    // watch changes in secondary color
    'preferences.theme.color.secondary'(value) {
      this.$vuetify.theme.themes.dark.secondary = value
      this.$vuetify.theme.themes.light.secondary = value
      this.savePreferences()
    },

    // watch changes in accent color
    'preferences.theme.color.accent'(value) {
      this.$vuetify.theme.themes.dark.accent = value
      this.$vuetify.theme.themes.light.accent = value
      this.savePreferences()
    }
  },
  mounted() {
    this.loadPreferences()
  },
  methods: {
    async savePreferences() {
      await this.$store.dispatch('language/change', this.preferences.lang)
      await localStorage.setItem(
        'preferences',
        JSON.stringify(this.preferences)
      )
    },
    async loadPreferences() {
      if (localStorage.getItem('preferences')) {
        try {
          this.preferences = await JSON.parse(
            localStorage.getItem('preferences')
          )
          this.$vuetify.theme.themes.dark.primary = this.preferences.theme.color.primary
          this.$vuetify.theme.themes.dark.secondary = this.preferences.theme.color.secondary
          this.$vuetify.theme.themes.dark.accent = this.preferences.theme.color.accent
          this.$vuetify.theme.themes.light.primary = this.preferences.theme.color.primary
          this.$vuetify.theme.themes.light.secondary = this.preferences.theme.color.secondary
          this.$vuetify.theme.themes.light.accent = this.preferences.theme.color.accent
          this.$vuetify.theme.dark = this.preferences.theme.darkMode
        } catch (e) {
          localStorage.removeItem('preferences')
        }
      }
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>
<style scoped></style>
