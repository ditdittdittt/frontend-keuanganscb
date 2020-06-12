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
  const api = (target, action, data, other) => {
    target = target.toLowerCase()
    action = action.toLowerCase()
    switch (target) {
      case 'user':
        switch (action) {
          case 'login':
            return User.login(data, other)
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
          case 'changeroles':
            return User.changeRoles(data)
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
            return Request.store(data)
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
          case 'log':
            return Budget.log(data)
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
          throw error.response
        })
    },
    login(data, strategy) {
      return app.$auth
        .loginWith(strategy, {
          data
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    logout() {
      return app.$auth
        .logout()
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    show() {},
    update(data) {
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
          throw error.response
        })
    },
    getAll() {
      return app.$axios
        .$get('/users')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    roles() {
      return app.$axios
        .$get('/roles')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    async changeRoles(data) {
      const listRoles = {
        admin: false,
        head_office: false,
        head_dept: false,
        manager_ops: false,
        pic: false,
        verificator: false
      }
      if (data.roles) {
        for (let i = 0; i < data.roles.length; i++) {
          const body = new FormData()
          body.append('user_id', data.id)
          body.append('role_name', data.roles[i].name)
          listRoles[data.roles[i].name] = true
          await app
            .$axios({
              method: 'post',
              url: '/users/assign-role',
              data: body
            })
            .then((response) => {
              return response
            })
            .catch((error) => {
              throw error.response
            })
        }

        for (const role in listRoles) {
          const body = new FormData()
          body.append('user_id', data.id)
          body.append('role_name', role)
          if (!listRoles[role]) {
            await app
              .$axios({
                method: 'post',
                url: '/users/remove-role',
                data: body
              })
              .then((response) => {
                return response
              })
              .catch((error) => {
                throw error.response
              })
          }
        }
      }
      return true
    },
    delete(data) {
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
          throw error.response
        })
    }
  }

  /**
   * Request Interface
   */
  const Request = {
    index() {
      return app.$axios.$get('/form/request').then((response) => {
        return response.form_request
      })
    },
    store(data) {
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
          throw error.response
        })
    },
    show(data) {
      return app.$axios.$get('/form/request/' + data).then((response) => {
        return response.form_request
      })
    },
    update(data) {
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
          throw error.response
        })
    },
    delete(data) {
      return app
        .$axios({
          method: 'delete',
          url: '/form/request/' + data
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    verifyAsPic(data) {
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
          throw error.response
        })
    },
    verifyAsVerificator(data) {
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
          throw error.response
        })
    },
    verifyAsCashier(data) {
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
          throw error.response
        })
    },
    verifyAsHeadDept(data) {
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
          throw error.response
        })
    },
    verifyAsHeadOffice(data) {
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
          console.log('Yay')
          return response
        })
        .catch((error) => {
          console.log('Nay')
          throw error.response
        })
    },
    confirmNeedSubmission(data) {
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
          throw error.response
        })
    },
    confirmNoNeedSubmission(data) {
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
          throw error.response
        })
    },
    reject(data) {
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
          throw error.response
        })
    },
    count() {
      return app.$axios
        .$get('/form/request/count')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    cancel(data) {
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
          throw error.response
        })
    }
  }

  /**
   * Submission Interface
   */
  const Submission = {
    index() {
      return app.$axios.$get('/form/submission').then((response) => {
        return response.form_submission
      })
    },
    store(data) {
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
          throw error.response
        })
    },
    show(data) {
      return app.$axios.$get('/form/submission/' + data).then((response) => {
        return response.form_submission
      })
    },
    update(data) {
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
          throw error.response
        })
    },
    delete(data) {
      return app
        .$axios({
          method: 'delete',
          url: '/form/submission/' + data
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    verifyAsPic(data) {
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
          throw error.response
        })
    },
    verifyAsVerificator(data) {
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
          throw error.response
        })
    },
    verifyAsHeadOffice(data) {
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
          throw error.response
        })
    },
    verifyAsHeadDept(data) {
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
          throw error.response
        })
    },
    verifyAsCashier(data) {
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
          throw error.response
        })
    },
    verifyAlreadyPaid(data) {
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
          throw error.response
        })
    },
    reject(data) {
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
          throw error.response
        })
    },
    count() {
      return app.$axios
        .$get('/form/submission/count')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    cancel(data) {
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
          throw error.response
        })
    }
  }

  /**
   * Petty Cash Interface
   */
  const Petty = {
    index() {
      return app.$axios.$get('/form/petty-cash').then((response) => {
        return response.form_petty_cash
      })
    },
    store(data) {
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
          throw error.response
        })
    },
    show(data) {
      return app.$axios.$get('/form/petty-cash/' + data).then((response) => {
        return response.form_petty_cash
      })
    },
    update(data) {
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
          throw error.response
        })
    },
    delete(data) {
      return app
        .$axios({
          method: 'delete',
          url: '/form/petty-cash/' + data
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    verifyAsPic(data) {
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
          throw error.response
        })
    },
    verifyAsCashier(data) {
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
          throw error.response
        })
    },
    verifyAsManagerOps(data) {
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
          throw error.response
        })
    },
    count() {
      return app.$axios
        .$get('/form/petty-cash/count')
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error.response
        })
    },
    reject(data) {
      const body = new FormData()
      body.append('status_id', 7)
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
          throw error.response
        })
    },
    alreadyPaid(data) {
      const body = new FormData()
      body.append('status_id', 6)
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
          throw error.response
        })
    },
    cancel(data) {
      const body = new FormData()
      body.append('status_id', 8)
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
          throw error.response
        })
    }
  }

  /**
   * Budget Interface
   */
  const Budget = {
    getBudgetList() {
      return app.$axios
        .$get('/budget-code')
        .then((response) => {
          return response.budget_code
        })
        .catch((error) => {
          throw error.response
        })
    },
    log(id) {
      return app.$axios
        .$get('/budget-code/' + id + '/logs')
        .then((response) => {
          return response.budget_code_log
        })
        .catch((error) => {
          throw error.response
        })
    },
    store(data) {
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
          throw error.response
        })
    },
    update(data) {
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
          throw error.response
        })
    },
    delete(data) {
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
          throw error.response
        })
    },
    topUp(data) {
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
          throw error.response
        })
    }
  }

  /**
   * Rekening Interface
   */
  const Rekening = {
    getAllRekening() {
      return app.$axios.$get('/rekening').then((response) => {
        return response.rekening
      })
    },
    store(data) {
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
          throw error.response
        })
    },
    delete(data) {
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
          throw error.response
        })
    }
  }

  inject('api', api)
}
