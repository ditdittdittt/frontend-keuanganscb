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
          case 'index':
            return Request.index()
          case 'store':
            Request.store(data)
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
          case 'store':
            Submission.store(data)
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
          case 'store':
            Petty.store(data)
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

      case 'table':
        switch (action) {
          case 'budgetlist':
            return Table.getBudgetList()

          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
    }
  }

  const User = {
    register() {
      console.log('[User] Registering a new user.')
    },
    login(data) {
      console.log('[User] Login into SCB app.')
      app.$auth.loginWith('local', {
        data
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
    async index() {
      console.log('[Request] Show all request forms')
      let result = null
      result = await app.$axios.$get('/form/request').then((response) => {
        return response.form_request
      })
      return result
    },
    async store(data) {
      console.log('[Request] Creating a new request')
      const body = new FormData()
      body.append('allocation', data.allocation)
      body.append('date', data.date)
      body.append('method', data.method)
      body.append('amount', data.amount)
      body.append('notes', data.notes)
      if (data.method === 'transfer') {
        body.append('bank_name', data.bank_name)
        body.append('bank_code', data.bank_code)
        body.append('account_number', data.account_number)
        body.append('account_owner', data.account_owner)
      }
      body.append('budget_code_id', data.budget_code.id)
      await app
        .$axios({
          method: 'post',
          url: '/form/request',
          data: body
        })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
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
    async store(data) {
      console.log('[Submission] Creating a new submission')
      const body = new FormData()
      body.append('form_request_id', data.request.id)
      body.append('date', data.date)
      body.append('allocation', data.allocation)
      body.append('used', data.used)
      body.append('balance', data.balance)
      body.append('notes', data.notes)
      await app
        .$axios({
          method: 'post',
          url: '/form/submission',
          data: body
        })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
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
    async store(data) {
      console.log('[Petty] Creating a new petty cash')
      let amount = 0
      const body = new FormData()
      body.append('date', data.date)
      body.append('allocation', data.allocation)
      for (let i = 0; i < data.budgets.length; i++){
        body.append("details["+i+"][budget_code_id]",data.budgets[i].code.id)
        body.append("details["+i+"][nominal]",data.budgets[i].nominal)
        amount += Number(data.budgets[i].nominal)
      }
      body.append('amount', amount)
      await app
        .$axios({
          method: 'post',
          url: '/form/petty-cash',
          data: body
        })
        .then((response) => {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
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

  const Table = {
    async getBudgetList() {
      console.log('[Table] Get all budget list')
      let result = null
      result = await app.$axios.$get('/budget-code').then((response) => {
        return response.budget_code
      })
      return result
    }
  }

  inject('api', api)
}