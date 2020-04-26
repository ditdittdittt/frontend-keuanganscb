/*
  Fungsi => api(target, action, data)
    Penjelasan :
      ~ target : beberntuk string tujuan dari method
        # diantaranya ['request', 'submission', 'petty', 'login', 'logout', ...]
      ~ action : berisi string aksi yang akan dijalankan
        # diarahkan ke controller
      ~ data : data yang akan di kirim
    Contoh :
      translate('hello', 'capitalize') : return => 'HELLO'
      translate('hello') : return => 'Halo'
*/

export default ({ app }, inject) => {
  const api = (target, action, data) => {
    target = target.toLowerCase()
    action = action.toLowerCase()
    switch (target) {
      case 'user':
        switch (action) {
          case 'login':
            User.login(data)
            break
          case 'logout':
            User.logout()
            break
          case 'register':
            User.register()
            break
          case 'show':
            User.show()
            break
          case 'update':
            User.update()
            break
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
        break
      case 'request':
        switch (action) {
          case 'store':
            Request.store()
            break
          case 'show':
            Request.show()
            break
          case 'update':
            Request.update()
            break
          case 'delete':
            Request.delete()
            break
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
        break
      case 'submission':
        switch (action) {
          case 'create':
            Submission.create()
            break
          case 'show':
            Submission.show()
            break
          case 'update':
            Submission.update()
            break
          case 'delete':
            Submission.delete()
            break
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
        break
      case 'petty':
        switch (action) {
          case 'create':
            Petty.create()
            break
          case 'show':
            Petty.show()
            break
          case 'update':
            Petty.update()
            break
          case 'delete':
            Petty.delete()
            break
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
        break
      default:
        console.error(`Unknown target : ${target} in '~/plugins/api.js'`)
        break
    }
  }

  const User = {
    register() {
      console.log('[User] Registering a new user.')
    },
    login(data) {
      console.log('[User] Login into SCB app.')
      app.$auth.loginWith('local', {
        data: data
      })
    },
    logout() {
      console.log('[User] Logout from SCB app.')
      app.$auth.logout()
    },
    show() {
      console.log('[User] Show current user SCB app.')
    },
    update() {
      console.log('[User] Update current user SCB app.')
    }
  }
  const Request = {
    store() {
      console.log('[Request] Creating a new request')
    },
    show() {
      console.log('[Request] Show a request with specified id')
    },
    update() {
      console.log('[Request] Update a request with specified id')
    },
    delete() {
      console.log('[Request] Delete a request with specified id')
    }
  }
  const Submission = {
    create() {
      console.log('[Submission] Creating a new submission')
    },
    show() {
      console.log('[Submission] Show a submission with specified id')
    },
    update() {
      console.log('[Submission] Update a submission with specified id')
    },
    delete() {
      console.log('[Submission] Delete a submission with specified id')
    }
  }
  const Petty = {
    create() {
      console.log('[Petty] Creating a new petty cash')
    },
    show() {
      console.log('[Petty] Show a petty cash with specified id')
    },
    update() {
      console.log('[Petty] Update a petty cash with specified id')
    },
    delete() {
      console.log('[Petty] Delete a petty cash with specified id')
    }
  }

  inject('api', api)
}
