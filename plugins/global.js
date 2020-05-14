import Vue from 'vue'
/*
  Plugin untuk register component secara global
  serta fungsi-fungsi helper lainnya
*/

// ===================== Resgiter Component =====================
import SnackbarAlert from '~/components/SnackbarAlert.vue'
Vue.component('snackbar-alert', SnackbarAlert)
// ==============================================================

// ===================== Helper Functions =====================
const copyValue = (object) => {
  if (typeof object !== 'object' || object === null) {
    return object
  }
  let value, key
  const result = Array.isArray(object) ? [] : {}
  for (key in object) {
    value = object[key]
    result[key] = copyValue(value)
  }
  return result
}

const exportPDF = (form, id) => {
  switch (form) {
    case 'request':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/export/form-request/pdf')
      else
        window.open(
          'http://54.169.75.0/api/v1/export/form-request/' + id + '/pdf'
        )
      break
    case 'submission':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/export/form-submission/pdf')
      else
        window.open(
          'http://54.169.75.0/api/v1/export/form-submission/' + id + '/pdf'
        )
      break
    case 'petty':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/export/form-petty-cash/pdf')
      else
        window.open(
          'http://54.169.75.0/api/v1/export/form-petty-cash/' + id + '/pdf'
        )
      break
  }
}

const exportExcel = (form, id) => {
  switch (form) {
    case 'request':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/export/form-request/excel')
      else
        window.open(
          'http://54.169.75.0/api/v1/export/form-request' + id + '/excel'
        )
      break
    case 'submission':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/export/form-submission/excel')
      else
        window.open(
          'http://54.169.75.0/api/v1/export/form-submission/' + id + '/excel'
        )
      break
    case 'petty':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/export/form-petty-cash/excel')
      else
        window.open(
          'http://54.169.75.0/api/v1/export/form-petty-cash/' + id + '/excel'
        )
      break
  }
}
// ============================================================

// ===================== Register Helper =====================

// Helper : $copy
// Usage : something = $copy(other)
// Function :
//  [ Deep Copy Value ]
//  Untuk membuat variable baru yang memiliki nilai yang sama
//  dengan nilai yang di copy. Karena biasanya jika hanya
//  melakukan `something = other` variabel something akan
//  berbentuk reference (bukan variabel baru)
Vue.prototype.$copy = (object) => {
  return copyValue(object)
}

// Helper : $export
// Usage : $export('pdf','request', data)
// Function :
//  Untuk mengekspor pdf, excel atau mungkin yang lainnya
//  dengan memanggil fungsi global
Vue.prototype.$export = (type, form, id) => {
  switch (type) {
    case 'pdf':
      exportPDF(form, id)
      break
    case 'excel':
      exportExcel(form, id)
      break
    default:
      break
  }
}
// ===========================================================
