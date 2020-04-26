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
const copyValue = object => {
  const result = {}
  for (let element in object) {
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

const exportPDF = (form, data) => {
  switch (form) {
    case 'request':
      break
    case 'submission':
      break
    case 'petty':
      break
  }
}

const exportExcel = (form, data) => {
  switch (form) {
    case 'request':
      break
    case 'submission':
      break
    case 'petty':
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
Vue.prototype.$copy = object => {
  return copyValue(object)
}

// Helper : $export
// Usage : $export('pdf','request', data)
// Function :
//  Untuk mengekspor pdf, excel atau mungkin yang lainnya
//  dengan memanggil fungsi global
Vue.prototype.$export = (type, form, data) => {
  switch (type) {
    case 'pdf':
      exportPDF(form, data)
      break
    case 'excel':
      exportExcel(form, data)
      break
    default:
      console.error(`Unknown type of : ${type} in ~plugins/global.js`)
      break
  }
}
// ===========================================================
