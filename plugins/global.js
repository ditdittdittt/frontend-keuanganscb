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
  const result = {}
  for (const element in object) {
    // Filter sesuai type
    switch (typeof object[element]) {
      case 'object':
        result[element] = copyValue(object[element])
        break
      default:
        // Filter sesuai nama key
        switch (element) {
          default:
            break
        }
        result[element] = object[element]
        break
    }
  }
  return result
}

const exportPDF = (form, id) => {
  switch (form) {
    case 'request':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/form/request/export/pdf')
      else window.open('http://54.169.75.0/api/v1/form/request/' + id + '/pdf')
      break
    case 'submission':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/form/submission/export/pdf')
      else
        window.open('http://54.169.75.0/api/v1/form/submission/' + id + '/pdf')
      break
    case 'petty':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/form/petty/export/pdf')
      else window.open('http://54.169.75.0/api/v1/form/petty/' + id + '/pdf')
      break
  }
}

const exportExcel = (form, id) => {
  switch (form) {
    case 'request':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/form/request/export/excel')
      else
        window.open('http://54.169.75.0/api/v1/form/request/' + id + '/excel')
      break
    case 'submission':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/form/submission/export/excel')
      else
        window.open(
          'http://54.169.75.0/api/v1/form/submission/' + id + '/excel'
        )
      break
    case 'petty':
      if (id === null)
        window.open('http://54.169.75.0/api/v1/form/petty/export/excel')
      else window.open('http://54.169.75.0/api/v1/form/petty/' + id + '/excel')
      break
  }
}
// ============================================================

// ===================== Register Helper =====================

// Helper : $copy
// Usage : something = $copy(other)
// Function :
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
