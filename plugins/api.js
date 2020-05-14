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
  const api = (target, action, data, user) => {
    target = target.toLowerCase()
    action = action.toLowerCase()
    switch (target) {
      case 'user':
        switch (action) {
          case 'login':
            return User.login(data)
          case 'logout':
            return User.logout()
          case 'register':
            return User.register(data)
          case 'show':
            return User.show()
          case 'update':
            return User.update(data)
          case 'all':
            return User.getAll()
          case 'roles':
            return User.roles()
          case 'delete':
            return User.delete()
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
            return Request.store(data, user)
          case 'show':
            return Request.show(data)
          case 'update':
            return Request.update(data)
          case 'delete':
            return Request.delete(data)
          case 'verifyaspic':
            return Request.verifyAsPic(data)
          case 'verifyascashier':
            return Request.verifyAsCashier(data)
          case 'verifyasheaddept':
            return Request.verifyAsHeadDept(data)
          case 'verifyasverificator':
            return Request.verifyAsVerificator(data)
          case 'verifyalreadypaid':
            return Request.verifyAlreadyPaid(data)
          case 'count':
            return Request.count()
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
        break
      case 'submission':
        switch (action) {
          case 'index':
            return Submission.index()
          case 'store':
            return Submission.store(data)
          case 'show':
            return Submission.show(data)
          case 'update':
            return Submission.update(data)
          case 'delete':
            return Submission.delete(data)
          case 'verifyaspic':
            return Submission.verifyAsPic(data)
          case 'verifyasheadoffice':
            return Submission.verifyAsHeadOffice(data)
          case 'verifyasheaddept':
            return Submission.verifyAsHeadDept(data)
          case 'verifyasverificator':
            return Submission.verifyAsVerificator(data)
          case 'count':
            return Submission.count()
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
        break
      case 'petty':
        switch (action) {
          case 'index':
            return Petty.index()
          case 'store':
            return Petty.store(data)
          case 'show':
            return Petty.show(data)
          case 'update':
            return Petty.update(data)
          case 'delete':
            return Petty.delete(data)
          case 'verifyaspic':
            return Petty.verifyAsPic(data)
          case 'verifyasmanagerops':
            return Petty.verifyAsManagerOps(data)
          case 'verifyascashier':
            return Petty.verifyAsCashier(data)
          case 'verifyalreadypaid':
            return Petty.verifyAlreadyPaid(data)
          case 'count':
            return Petty.count()
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
        break
      case 'budget':
        switch (action) {
          case 'index':
            return Budget.getBudgetList()
          case 'store':
            return Budget.store(data)
          case 'delete':
            return Budget.delete(data)
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

  /**
   * User Interface
   */
  const User = {
    register(data) {
      console.log('[User] Registering a new user.')
      const body = new FormData()
      body.append('name', data.name)
      body.append('username', data.username)
      body.append('email', data.email)
      body.append('password', data.password)
      body.append('c_password', data.confirm)
      body.append('division', data.division)
      body.append('role', data.role)
      body.append('nik', data.nik)
      body.append('address', data.address)
      return app
        .$axios({
          method: 'post',
          url: '/auth/register',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    login(data) {
      console.log('[User] Login into SCB app.')
      return app.$auth
        .loginWith('local', {
          data
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    logout() {
      console.log('[User] Logout from SCB app.')
      return app.$auth
        .logout()
        .then((response) => {
          console.log(response)
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    show() {
      console.log('[User] Show current user SCB app.')
    },
    update(data) {
      console.log('[User] Update current user SCB app.')
      const body = new FormData()
      body.append('name', data.name)
      body.append('username', data.username)
      body.append('email', data.email)
      body.append('division', data.division)
      body.append('nik', data.nik)
      body.append('address', data.address)
      return app
        .$axios({
          method: 'post',
          url: '/users/' + data.id,
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    getAll() {
      console.log('[User] Get all users.')
      return app.$axios
        .$get('/users')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    roles() {
      console.log('[User] Get all user roles.')
      return app.$axios
        .$get('/roles')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    delete(data) {
      console.log('[User] Delete a user')
      return app
        .$axios({
          method: 'delete',
          url: '/users/' + data,
          data: null
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  /**
   * Request Interface
   */
  const Request = {
    index() {
      console.log('[Request] Show all request forms')
      return app.$axios.$get('/form/request').then((response) => {
        return response.form_request
      })
    },
    store(data) {
      console.log('[Request] Creating a new request')
      const body = new FormData()
      body.append('allocation', data.allocation)
      body.append('date', data.date)
      body.append('method', data.method)
      body.append('amount', data.amount)
      body.append('attachment', data.attachment)
      body.append('notes', data.notes)
      if (data.method === 'transfer') {
        body.append('bank_name', data.bank_name)
        body.append('bank_code', data.bank_code)
        body.append('account_number', data.account_number)
        body.append('account_owner', data.account_owner)
      }
      body.append('budget_code_id', data.budget_code.id)
      return app
        .$axios({
          method: 'post',
          url: '/form/request',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    show(data) {
      console.log('[Request] Show a request with specified id')

      return app.$axios.$get('/form/request/' + data).then((response) => {
        console.log(response)
        return response.form_request
      })
    },
    update(data) {
      console.log('[Request] Update a request with specified id')
      const body = new FormData()
      body.append('allocation', data.allocation)
      body.append('date', data.date)
      body.append('method', data.method)
      body.append('amount', data.amount)
      body.append('attachment', data.attachment)
      body.append('notes', data.notes)
      if (data.method === 'transfer') {
        body.append('bank_name', data.bank_name)
        body.append('bank_code', data.bank_code)
        body.append('account_number', data.account_number)
        body.append('account_owner', data.account_owner)
      }
      body.append('budget_code_id', data.budget_code.id)
      return app
        .$axios({
          method: 'post',
          url: '/form/request/' + data.id,
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    delete(data) {
      console.log('[Request] Delete a request with specified id')
      return app
        .$axios({
          method: 'delete',
          url: '/form/request/' + data
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsPic(data) {
      console.log('[Request] Verify as PIC')
      const body = new FormData()
      body.append('is_confirmed_pic', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/request/' + data.id +'/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsVerificator(data) {
      console.log('[Request] Verify as Verificator')
      const body = new FormData()
      body.append('is_confirmed_verificator', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/request/' + data.id +'/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsCashier(data) {
      console.log('[Request] Verify as Cashier')
      const body = new FormData()
      body.append('is_confirmed_cashier', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/request/' + data.id +'/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsHeadDept(data) {
      console.log('[Request] Verify as Head Dept')
      const body = new FormData()
      body.append('is_confirmed_head_dept', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/request/' + data.id +'/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAlreadyPaid(data) {
      console.log('[Request] Verify already paid')
      const body = new FormData()
      body.append('status_id', 3)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/request/' + data.id,
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    count() {
      console.log('[Request] Get count for all request forms')

      return app.$axios
        .$get('/form/request/count')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  /**
   * Submission Interface
   */
  const Submission = {
    index() {
      console.log('[Submission] Show all submission forms')

      return app.$axios.$get('/form/submission').then((response) => {
        return response.form_submission
      })
    },
    store(data) {
      console.log('[Submission] Creating a new submission')
      const body = new FormData()
      body.append('form_request_id', data.request.id)
      body.append('date', data.date)
      body.append('allocation', data.allocation)
      body.append('used', data.used)
      body.append('balance', data.balance)
      body.append('notes', data.notes)
      return app
        .$axios({
          method: 'post',
          url: '/form/submission',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    show(data) {
      console.log('[Submission] Show a submission with specified id')

      return app.$axios.$get('/form/submission/' + data).then((response) => {
        return response.form_submission
      })
    },
    update(data) {
      console.log('[Submission] Update a submission with specified id')
      const body = new FormData()
      body.append('form_request_id', data.form_request.id)
      body.append('date', data.date)
      body.append('allocation', data.allocation)
      body.append('used', data.used)
      body.append('balance', data.balance)
      body.append('notes', data.notes)
      return app
        .$axios({
          method: 'post',
          url: '/form/submission/' + data.id,
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    delete(data) {
      console.log('[Submission] Delete a submission with specified id')
      return app
        .$axios({
          method: 'delete',
          url: '/form/submission/' + data
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsPic(data) {
      console.log('[Submission] Verify as PIC')
      const body = new FormData()
      body.append('is_confirmed_pic', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/submission/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsVerificator(data) {
      console.log('[Submission] Verify as Verificator')
      const body = new FormData()
      body.append('is_confirmed_verificator', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/submission/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsHeadOffice(data) {
      console.log('[Submission] Verify as Head Office')
      const body = new FormData()
      body.append('is_confirmed_head_office', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/submission/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsHeadDept(data) {
      console.log('[Submission] Verify as Head Dept')
      const body = new FormData()
      body.append('is_confirmed_head_dept', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/submission/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    count() {
      console.log('[Submission] Get count for all submission forms')

      return app.$axios
        .$get('/form/submission/count')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  /**
   * Petty Cash Interface
   */
  const Petty = {
    index() {
      console.log('[Petty] Show all petty cash forms')

      return app.$axios.$get('/form/petty-cash').then((response) => {
        return response.form_petty_cash
      })
    },
    store(data) {
      console.log('[Petty] Creating a new petty cash')
      let amount = 0
      const body = new FormData()
      body.append('date', data.date)
      body.append('allocation', data.allocation)
      for (let i = 0; i < data.budgets.length; i++) {
        body.append(
          'details[' + i + '][budget_code_id]',
          data.budgets[i].code.id
        )
        body.append('details[' + i + '][nominal]', data.budgets[i].nominal)
        amount += Number(data.budgets[i].nominal)
      }
      body.append('amount', amount)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    show(data) {
      console.log('[Petty] Show a petty cash with specified id')

      return app.$axios.$get('/form/petty-cash/' + data).then((response) => {
        return response.form_petty_cash
      })
    },
    update(data) {
      console.log('[Petty] Update a petty cash with specified id')
      let amount = 0
      const body = new FormData()
      body.append('date', data.date)
      body.append('allocation', data.allocation)
      for (let i = 0; i < data.details.length; i++) {
        body.append(
          'details[' + i + '][budget_code_id]',
          data.details[i].budget_code_id
        )
        body.append('details[' + i + '][nominal]', data.details[i].nominal)
        amount += Number(data.details[i].nominal)
      }
      body.append('amount', amount)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash/' + data.id,
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    delete(data) {
      console.log('[Petty] Delete a petty cash with specified id')
      return app
        .$axios({
          method: 'delete',
          url: '/form/petty-cash/' + data
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsPic(data) {
      console.log('[Petty] Verify as PIC')
      const body = new FormData()
      body.append('is_confirmed_pic', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsCashier(data) {
      console.log('[Petty] Verify as Cashier')
      const body = new FormData()
      body.append('is_confirmed_cashier', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAsManagerOps(data) {
      console.log('[Petty] Verify as Manager Ops')
      const body = new FormData()
      body.append('is_confirmed_manager_ops', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    verifyAlreadyPaid(data) {
      console.log('[Petty] Verify already paid')
      const body = new FormData()
      body.append('status_id', 3)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    count() {
      console.log('[Petty] Get count for all petty forms')

      return app.$axios
        .$get('/form/petty-cash/count')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  /**
   * Budget Interface
   */
  const Budget = {
    getBudgetList() {
      console.log('[Budget] Get all budget code')
      return app.$axios.$get('/budget-code').then((response) => {
        return response.budget_code
      })
    },
    store(data) {
      console.log('[Budget] store budget code')
      const body = new FormData()
      body.append('code', data.code)
      body.append('name', data.name)
      return app
        .$axios({
          method: 'post',
          url: '/budget-code',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    delete(data) {
      console.log('[Budget] Get all budget code')
      return app
        .$axios({
          method: 'delete',
          url: '/budget-code/' + data,
          data: null
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  inject('api', api)
}
