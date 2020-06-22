import en from 'vuetify/es5/locale/en.js'
import id from 'vuetify/es5/locale/id.js'
import eng from './lang/en.js'
import idn from './lang/id.js'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s',
    title: 'SCB Keuangan',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      {
        name: 'msapplication-TileImage',
        content: '/favicon/ms-icon-144x144.png'
      },
      { name: 'theme-color', content: '#ffffff' },
      {
        hid: 'description',
        name: 'description',
        content: 'Aplikasi Divisi Keuangan di Sekolah Cendekia Baznas'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/terbilang',
    '~/plugins/translate',
    '~/plugins/api',
    '~/plugins/global.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    'nuxt-i18n'
  ],
  /**
   * Nuxt.js PWA config
   */
  pwa: {
    meta: {
      title: 'Keuangan SCB',
      author: 'Kelompok Divisi Keuangan Ilmu Komputer IPB',
      description: 'Website Aplikasi dari Divisi Keuangan SCB'
    },
    manifest: {
      name: 'Webapp Divisi Keuangan  SCB',
      short_name: 'Keuangan Webapp',
      lang: 'en'
    },
    workbox: {
      /* workbox options uses all default */
    }
  },

  /*
   ** Nuxt i18n configuration
   ** See https://nuxt-community.github.io/nuxt-i18n/
   */
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'english',
        file: 'en.js'
      },
      {
        code: 'id',
        name: 'indonesia',
        file: 'id.js'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: eng,
        id: idn
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    prefix: '/api/v1',
    port: process.env.PORT || 443,
    host: process.env.HOST || 'keuangan-api.cendekiabaznas.sch.id',
    https: true
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { en, id },
      current: 'en'
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#3f51b5',
          accent: '#3f51b5',
          error: '#f44336',
          warning: '#ffc107',
          info: '#2196f3',
          success: '#4caf50'
        },
        dark: {
          primary: '#3f51b5',
          secondary: '#3f51b5',
          accent: '#3f51b5',
          error: '#f44336',
          warning: '#ffc107',
          info: '#2196f3',
          success: '#4caf50'
        }
      }
    }
  },

  router: {
    middleware: 'auth'
  },
  /*
   ** Auth modulte configuration
   ** See https://auth.nuxtjs.org/#getting-started
   */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/dashboard'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'success.token'
          },
          logout: { url: '/auth/logout', method: 'post' },
          user: {
            url: '/auth/getUser',
            method: 'post',
            propertyName: 'success'
          }
        }
      },
      sso: {
        scheme: '~/schemes/ssoScheme.js',
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: { url: '/auth/logout', method: 'post' },
          user: {
            url: '/auth/getUser',
            method: 'post',
            propertyName: 'success'
          }
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
