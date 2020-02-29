export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      },
      // Authorization: `Bearer ${this.$auth.getToken('local')}`

    }
  })

  // Set baseURL to something different
  api.setBaseURL('/api/')

  // Inject to context as $api
  inject('api', api)
}
