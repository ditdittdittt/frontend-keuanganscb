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
            return User.delete(data)
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
          case 'verifyasheaddept':
            return Request.verifyAsHeadDept(data)
          case 'verifyasverificator':
            return Request.verifyAsVerificator(data)
          case 'verifyasheadoffice':
            return Request.verifyAsHeadOffice(data)
          case 'verifyascashier':
            return Request.verifyAsCashier(data)
          case 'confirmneedsubmission':
            return Request.confirmNeedSubmission(data)
          case 'confirmnoneedsubmission':
            return Request.confirmNoNeedSubmission(data)
          case 'reject':
            return Request.reject(data)
          case 'count':
            return Request.count()
          case 'cancel':
            return Request.cancel(data)
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
          case 'verifyascashier':
            return Submission.verifyAsCashier(data)
          case 'alreadypaid':
            return Submission.verifyAlreadyPaid(data)
          case 'reject':
            return Submission.reject(data)
          case 'count':
            return Submission.count()
          case 'cancel':
            return Submission.cancel(data)
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
          case 'count':
            return Petty.count()
          case 'reject':
            return Petty.reject(data)
          case 'alreadypaid':
            return Petty.alreadyPaid(data)
          case 'cancel':
            return Petty.cancel(data)
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
          case 'update':
            return Budget.update(data)
          case 'delete':
            return Budget.delete(data)
          case 'topup':
            return Budget.topUp(data)
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            )
            break
        }
        break
      case 'rekening':
        switch (action) {
          case 'index':
            return Rekening.getAllRekening()
          case 'store':
            return Rekening.store(data)
          case 'delete':
            return Rekening.delete(data)
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
      console.log(data)
      const body = new FormData()
      body.append('name', data.name)
      body.append('username', data.username)
      body.append('email', data.email)
      body.append('password', data.password)
      body.append('c_password', data.confirm)
      body.append('division', data.division)
      body.append('role', 'pic')
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
      if (data.name) body.append('name', data.name)
      if (data.username) body.append('username', data.username)
      if (data.email) body.append('email', data.email)
      if (data.division) body.append('division', data.division)
      if (data.nik) body.append('nik', data.nik)
      if (data.address) body.append('address', data.address)
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
      body.append('method', data.method)
      body.append('amount', data.amount)
      body.append('attachment', data.attachment)
      body.append('notes', data.notes)
      for (let i = 0; i < data.budgets.length; i++) {
        body.append(
          'details[' + i + '][budget_code_id]',
          data.budgets[i].code.id
        )
        body.append('details[' + i + '][nominal]', data.budgets[i].nominal)
      }
      if (data.method === 'transfer') {
        let bankCode = ''
        let bankName = ''
        let accountNumber = ''
        let accountOwner = ''
        for (let i = 0; i < data.rekening.length - 1; i++) {
          bankCode += data.rekening[i].bank_code + ','
          bankName += data.rekening[i].bank_name + ','
          accountNumber += data.rekening[i].account_number + ','
          accountOwner += data.rekening[i].account_owner + ','
        }
        bankCode += data.rekening[data.rekening.length - 1].bank_code
        bankName += data.rekening[data.rekening.length - 1].bank_name
        accountNumber += data.rekening[data.rekening.length - 1].account_number
        accountOwner += data.rekening[data.rekening.length - 1].account_owner
        body.append('bank_name', bankName)
        body.append('bank_code', bankCode)
        body.append('account_number', accountNumber)
        body.append('account_owner', accountOwner)
      }
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
        return response.form_request
      })
    },
    update(data) {
      console.log('[Request] Update a request with specified id')
      const body = new FormData()
      if (data.name) body.append('allocation', data.allocation)
      if (data.date) body.append('date', data.date)
      if (data.method) body.append('method', data.method)
      if (data.amount) body.append('amount', data.amount)
      if (data.attachment) body.append('attachment', data.attachment)
      if (data.notes) body.append('notes', data.notes)
      if (data.method === 'transfer') {
        body.append('bank_name', data.bank_name)
        body.append('bank_code', data.bank_code)
        body.append('account_number', data.account_number)
        body.append('account_owner', data.account_owner)
      }
      if (data.budget_code.id)
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
          url: '/form/request/' + data.id + '/confirm',
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
          url: '/form/request/' + data.id + '/confirm',
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
          url: '/form/request/' + data.id + '/confirm',
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
          url: '/form/request/' + data.id + '/confirm',
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
      console.log('[Request] Verify as Head Office')
      const body = new FormData()
      body.append('is_confirmed_head_office', 1)
      body.append('signature', data.signature.data)
      return app
        .$axios({
          method: 'post',
          url: '/form/request/' + data.id + '/confirm',
          data: body
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    confirmNeedSubmission(data) {
      console.log('[Request] Confirm need submission')
      const body = new FormData()
      body.append('status_id', 4)
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
    confirmNoNeedSubmission(data) {
      console.log('[Request] Confirm no need submission')
      const body = new FormData()
      body.append('status_id', 6)
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
    reject(data) {
      console.log('[Request] Reject Form Request')
      const body = new FormData()
      body.append('status_id', 7)
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
    },
    cancel(data) {
      console.log('[Request] Cancel Form Request')
      const body = new FormData()
      body.append('status_id', 8)
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
      console.log(data)
      const body = new FormData()
      body.append('form_request_id', data.request.id)
      body.append('allocation', data.allocation)
      body.append('used', data.use)
      body.append('balance', data.balance)
      body.append('notes', data.notes)
      for (let i = 0; i < data.budgets.length; i++) {
        body.append('details[' + i + '][budget_code_id]', data.budgets[i].id)
        body.append('details[' + i + '][used]', data.budgets[i].nominal)
        body.append('details[' + i + '][balance]', data.budgets[i].balance)
      }
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
      if (data.form_request.id)
        body.append('form_request_id', data.form_request.id)
      if (data.date) body.append('date', data.date)
      if (data.allocation) body.append('allocation', data.allocation)
      if (data.used) body.append('used', data.used)
      if (data.balance) body.append('balance', data.balance)
      if (data.notes) body.append('notes', data.notes)
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
    verifyAsCashier(data) {
      console.log('[Submission] Verify as Cashier')
      const body = new FormData()
      body.append('is_confirmed_cashier', 1)
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
    verifyAlreadyPaid(data) {
      console.log('[Submission] Verify already paid')
      const body = new FormData()
      body.append('status_id', 6)
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
    reject(data) {
      console.log('[Submission] Reject Form Submission')
      const body = new FormData()
      body.append('status_id', 7)
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
    },
    cancel(data) {
      console.log('[Submission] Cancel Form Submission')
      const body = new FormData()
      body.append('status_id', 8)
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
      if (data.date) body.append('date', data.date)
      if (data.allocation) body.append('allocation', data.allocation)
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
    },
    reject(data) {
      console.log('[Petty] Reject this petty form')
      const body = new FormData()
      body.append('status_id', 7)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash/' + data.id,
          data: body
        })
        .then((response) => {
          console.log(response)
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    alreadyPaid(data) {
      console.log('[Petty] Reject this petty form')
      const body = new FormData()
      body.append('status_id', 6)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash/' + data.id,
          data: body
        })
        .then((response) => {
          console.log(response)
          return response
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    cancel(data) {
      console.log('[Petty] Cancel this petty form')
      const body = new FormData()
      body.append('status_id', 8)
      return app
        .$axios({
          method: 'post',
          url: '/form/petty-cash/' + data.id,
          data: body
        })
        .then((response) => {
          console.log(response)
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
      body.append('balance', data.balance)
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
    update(data) {
      console.log('[Budget] Update balance')
      const body = new FormData()
      body.append('balance', data.balance)
      return app
        .$axios({
          method: 'post',
          url: '/budget-code/' + data.id,
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
    },
    topUp(data) {
      console.log('[Budget] Top Up Budget Code')
      const body = new FormData()
      body.append('nominal', data.nominal)
      return app
        .$axios({
          method: 'post',
          url: '/budget-code/' + data.id + '/topUp',
          data: body
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
   * Rekening Interface
   */
  const Rekening = {
    getAllRekening() {
      console.log('[Rekening] Get all Rekening code')
      return app.$axios.$get('/rekening').then((response) => {
        console.log(response)
        return response.rekening
      })
    },
    store(data) {
      console.log('[Rekening] store Rekening code')
      const body = new FormData()
      body.append('bank_code', data.bank_code)
      body.append('bank_name', data.bank_name)
      body.append('account_number', data.account_number)
      body.append('account_owner', data.account_owner)
      return app
        .$axios({
          method: 'post',
          url: '/rekening',
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
      console.log('[Rekening] Get all Rekening code')
      return app
        .$axios({
          method: 'delete',
          url: '/rekening/' + data,
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
