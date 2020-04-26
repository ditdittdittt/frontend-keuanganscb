/*
  Fungsi => translate(choose, mode)
    Penjelasan :
      ~ choose : dari object, kata apa yang dipilih
      # kamus yang digunakan yaitu dari $vuetify.lang dan $i18n (nuxt-i18n)
      ~ mode : tampilan nilai return string
      # capitalize dan uppercase
    Contoh :
      [en] translate('hello', 'capitalize') : return => 'HELLO'
      [id] translate('hello') : return => 'halo'
 */
export default ({ app }, inject) => {
  inject('translate', (choose, mode) => {
    const selected = choose.split('.')
    let result = app.i18n.messages[app.context.$vuetify.lang.current]
    for (let select of selected) {
      result = result[select]
    }

    if (result == null) {
      return ''
    }

    switch (mode) {
      case 'capitalize':
        return result.charAt(0).toUpperCase() + result.slice(1)
      case 'uppercase':
        return result.toUpperCase()
      default:
        return result
    }
  })
}
